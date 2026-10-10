"""Validate owner custom extension manifests and component definitions."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CUSTOM = ROOT / 'custom'
MANIFEST = CUSTOM / 'manifest.json'
COMPONENTS = CUSTOM / 'components' / 'custom-components.json'
SITE_COMPONENTS = ROOT / 'site' / 'CUSTOM_COMPONENTS.json'

ALLOWED_PATHS = {
    './toolheads.html',
    './trident.html',
    './v24.html',
    './v0.html',
    './components.html',
    './e3ng.html',
}
ALLOWED_TYPES = {'probe', 'extruder', 'electronics-board', 'accessory'}
ALLOWED_STATUS = {'planned', 'implemented', 'deprecated'}


def load_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def fail(message):
    raise SystemExit(message)


def validate_manifest(data):
    if data.get('schema') != '3d-print-rig-custom-extensions-v1':
        fail('Invalid custom manifest schema.')
    for row in data.get('json_overlays', []):
        if not isinstance(row, dict) or not row.get('target') or not row.get('source'):
            fail('Invalid custom json_overlays record.')
        if '..' in row['target'] or '..' in row['source']:
            fail('Path traversal is not allowed in custom manifest.')
    for row in data.get('generated_files', []):
        if not isinstance(row, dict) or not row.get('target') or not row.get('source'):
            fail('Invalid custom generated_files record.')
        if '..' in row['target'] or '..' in row['source']:
            fail('Path traversal is not allowed in custom generated_files.')


def validate_components(data):
    if data.get('schema') != '3d-print-rig-custom-components-v1':
        fail('Invalid custom component schema.')
    rows = data.get('components')
    if not isinstance(rows, list) or not rows:
        fail('custom-components.json requires a non-empty components list.')
    ids = set()
    for row in rows:
        if not isinstance(row, dict):
            fail('Each custom component must be an object.')
        cid = row.get('id')
        if not cid or cid in ids:
            fail('Custom component IDs must be unique and non-empty.')
        ids.add(cid)
        if row.get('type') not in ALLOWED_TYPES:
            fail(f'Unsupported component type: {cid}')
        if row.get('status') not in ALLOWED_STATUS:
            fail(f'Unsupported component status: {cid}')
        compat = row.get('compatibility', {})
        if not isinstance(compat.get('machine_families', []), list):
            fail(f'Invalid machine_families for component {cid}')
        if not isinstance(compat.get('toolheads', []), list):
            fail(f'Invalid toolheads for component {cid}')
        targets = row.get('render_targets', [])
        if not isinstance(targets, list) or not targets:
            fail(f'Component {cid} must define at least one render target.')
        for target in targets:
            if target.get('path') not in ALLOWED_PATHS:
                fail(f'Component {cid} has unsupported render path: {target.get("path")}')
        if not isinstance(row.get('component_catalog_ids', []), list):
            fail(f'Invalid component_catalog_ids for component {cid}')


def main():
    if not MANIFEST.is_file():
        fail('Missing custom/manifest.json')
    if not COMPONENTS.is_file():
        fail('Missing custom/components/custom-components.json')
    manifest = load_json(MANIFEST)
    validate_manifest(manifest)
    if not SITE_COMPONENTS.is_file():
        fail('Missing site/CUSTOM_COMPONENTS.json')
    components = load_json(COMPONENTS)
    validate_components(components)
    site_components = load_json(SITE_COMPONENTS)
    if site_components != components:
        fail('site/CUSTOM_COMPONENTS.json must mirror custom/components/custom-components.json')
    for row in manifest.get('generated_files', []):
        source = CUSTOM / row['source']
        target = ROOT / 'site' / row['target']
        if not source.is_file():
            fail('Missing custom generated file source: ' + row['source'])
        if not target.is_file():
            fail('Missing generated file in site/: ' + row['target'])
        if source.read_text(encoding='utf-8') != target.read_text(encoding='utf-8'):
            fail(f'site/{row["target"]} must mirror custom/{row["source"]}')
    print('Custom extension validation passed.')


if __name__ == '__main__':
    main()
