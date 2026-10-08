"""Apply owner custom extensions to an assembled site output."""
import argparse
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUSTOM = ROOT / 'custom'


def load_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def validate_manifest(manifest):
    if manifest.get('schema') != '3d-print-rig-custom-extensions-v1':
        raise ValueError('Invalid custom extension manifest schema.')
    if manifest.get('enabled') is False:
        return False
    for row in manifest.get('json_overlays', []):
        if not row.get('target') or not row.get('source'):
            raise ValueError('Invalid custom overlay record.')
    for row in manifest.get('generated_files', []):
        if not row.get('target') or not row.get('source'):
            raise ValueError('Invalid custom generated-file record.')
    return True


def append_unique(target, field, rows):
    target.setdefault(field, [])
    seen = {entry.get('id') for entry in target[field] if isinstance(entry, dict)}
    for row in rows:
        if not isinstance(row, dict) or not row.get('id'):
            raise ValueError(f'Overlay append_unique {field} requires object rows with id.')
        if row['id'] in seen:
            continue
        seen.add(row['id'])
        target[field].append(row)


def apply_overlay(target_file, overlay_file):
    target = load_json(target_file)
    overlay = load_json(overlay_file)
    if overlay.get('schema') != '3d-print-rig-json-overlay-v1':
        raise ValueError(f'Invalid overlay schema: {overlay_file.name}')
    for field, rows in overlay.get('append_unique', {}).items():
        if not isinstance(rows, list):
            raise ValueError(f'append_unique[{field}] must be a list.')
        append_unique(target, field, rows)
    target_file.write_text(json.dumps(target, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def copy_generated_file(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)


def apply_custom_extensions(output):
    manifest_file = CUSTOM / 'manifest.json'
    if not manifest_file.is_file():
        return {'enabled': False, 'overlays': 0, 'generated': 0}
    manifest = load_json(manifest_file)
    if not validate_manifest(manifest):
        return {'enabled': False, 'overlays': 0, 'generated': 0}
    output = Path(output)
    overlays = 0
    generated = 0
    for row in manifest.get('json_overlays', []):
        source = CUSTOM / row['source']
        target = output / row['target']
        if not source.is_file() or not target.is_file():
            raise ValueError('Custom overlay path is missing: ' + row['source'])
        apply_overlay(target, source)
        overlays += 1
    for row in manifest.get('generated_files', []):
        source = CUSTOM / row['source']
        target = output / row['target']
        if not source.is_file():
            raise ValueError('Custom generated source is missing: ' + row['source'])
        copy_generated_file(source, target)
        generated += 1
    return {'enabled': True, 'overlays': overlays, 'generated': generated}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = apply_custom_extensions(args.output)
    print(json.dumps(result))


if __name__ == '__main__':
    main()
