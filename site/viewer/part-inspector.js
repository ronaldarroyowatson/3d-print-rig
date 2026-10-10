import {ensureWorkspaceEntry} from './workspace-entry.mjs';
ensureWorkspaceEntry(import.meta.url);

import * as THREE from 'three';

const hiddenBadge = count => `${count} hidden by Part inspector`;

const labelFor = mesh => (
  mesh?.userData?.partLabel ||
  mesh?.userData?.partKey ||
  mesh?.userData?.originalKey ||
  mesh?.name ||
  'Unknown part'
);

const textFor = value => {
  if (value === undefined || value === null || value === '') return '—';
  return String(value);
};

const defaultProfiles = {
  schema: '3d-print-rig-part-print-profiles-v1',
  version: 'initial',
  parts: {},
  rules: [],
};

function profileRowsFor(profile) {
  if (!profile?.files || !Array.isArray(profile.files) || !profile.files.length) {
    return [];
  }
  return profile.files.map(row => ({
    file: textFor(row.file),
    settings: textFor(row.settings),
    notes: textFor(row.notes),
  }));
}

function includesText(value, expected) {
  if (!value || !expected) return false;
  return String(value).toLowerCase().includes(String(expected).toLowerCase());
}

function matchRule(mesh, rule) {
  const match = rule?.match || {};
  const key = mesh?.userData?.partKey || '';
  const label = mesh?.userData?.partLabel || '';
  const moduleId = mesh?.userData?.moduleId || '';
  const group = mesh?.userData?.partGroup || '';
  const component = mesh?.userData?.partComponent || '';
  const sourcePath = mesh?.userData?.partSourcePath || '';

  if (match.key && key !== match.key) return false;
  if (match.keyPrefix && !key.startsWith(match.keyPrefix)) return false;
  if (match.moduleId && moduleId !== match.moduleId) return false;
  if (match.component && component !== match.component) return false;
  if (match.groupIncludes && !includesText(group, match.groupIncludes)) return false;
  if (match.labelIncludes && !includesText(label, match.labelIncludes)) return false;
  if (match.sourcePathIncludes && !includesText(sourcePath, match.sourcePathIncludes)) return false;
  return true;
}

function resolveProfile(mesh, profiles) {
  const partKey = mesh?.userData?.partKey || mesh?.userData?.originalKey;
  if (!partKey || !profiles?.parts || typeof profiles.parts !== 'object') {
    return {profile: null, matchedBy: null};
  }
  if (profiles.parts[partKey]) {
    return {profile: profiles.parts[partKey], matchedBy: `part key (${partKey})`};
  }
  if (!Array.isArray(profiles.rules)) {
    return {profile: null, matchedBy: null};
  }
  for (const rule of profiles.rules) {
    if (!matchRule(mesh, rule)) continue;
    return {profile: rule, matchedBy: `rule (${rule.id || 'unnamed'})`};
  }
  return {profile: null, matchedBy: null};
}

export function setupPartInspector({
  aside,
  stage,
  renderer,
  camera,
  allMeshes,
  requestRender,
  syncVisibility,
}) {
  if (!aside || !stage || !renderer || !camera || !Array.isArray(allMeshes)) {
    return {applyHiddenVisibility() {}};
  }

  const panel = document.createElement('details');
  panel.className = 'panel-section part-inspector';
  panel.open = false;
  panel.innerHTML = `
    <summary>Part inspector</summary>
    <p class="foot part-inspector-help">
      Click a visible part in 3D to inspect it and hide it temporarily.
    </p>
    <p class="status part-inspector-status" id="partInspectorStatus" aria-live="polite">
      No part selected.
    </p>
    <dl class="part-inspector-grid" id="partInspectorGrid">
      <dt>Part</dt><dd id="partInspectorLabel">—</dd>
      <dt>Key</dt><dd id="partInspectorKey">—</dd>
      <dt>Module</dt><dd id="partInspectorModule">—</dd>
      <dt>Group</dt><dd id="partInspectorGroup">—</dd>
      <dt>Component</dt><dd id="partInspectorComponent">—</dd>
      <dt>Source path</dt><dd id="partInspectorSourcePath">—</dd>
    </dl>
    <p class="foot part-inspector-print-title">Printable files</p>
    <p class="foot part-inspector-print-empty" id="partInspectorPrintEmpty">
      Select a part to see mapped filenames and print notes.
    </p>
    <ul class="part-inspector-print-list" id="partInspectorPrintList"></ul>
    <div class="buttons">
      <button id="partInspectorHideSelected" disabled>Hide selected</button>
      <button id="partInspectorUnhideAll" disabled>Unhide all</button>
    </div>
  `;
  aside.append(panel);

  const $ = selector => panel.querySelector(selector);
  const status = $('#partInspectorStatus');
  const hideSelectedButton = $('#partInspectorHideSelected');
  const unhideAllButton = $('#partInspectorUnhideAll');
  const printList = $('#partInspectorPrintList');
  const printEmpty = $('#partInspectorPrintEmpty');
  const fields = {
    label: $('#partInspectorLabel'),
    key: $('#partInspectorKey'),
    module: $('#partInspectorModule'),
    group: $('#partInspectorGroup'),
    component: $('#partInspectorComponent'),
    sourcePath: $('#partInspectorSourcePath'),
  };

  const pointerDown = {x: 0, y: 0, button: -1};
  const hidden = new Set();
  const highlight = new WeakMap();
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let profiles = defaultProfiles;

  let selected = null;

  fetch('../PART_PRINT_PROFILES.json', {cache: 'no-cache'})
    .then(response => {
      if (!response.ok) return defaultProfiles;
      return response.json();
    })
    .then(data => {
      if (data?.schema === defaultProfiles.schema && data?.parts && typeof data.parts === 'object') {
        profiles = data;
      } else {
        profiles = defaultProfiles;
      }
    })
    .catch(() => {
      profiles = defaultProfiles;
    });

  const renderPrintRows = mesh => {
    printList.replaceChildren();
    const {profile, matchedBy} = resolveProfile(mesh, profiles);
    const rows = profileRowsFor(profile);
    if (!rows.length) {
      printEmpty.textContent = mesh
        ? 'No print-file mapping yet for this part.'
        : 'Select a part to see mapped filenames and print notes.';
      printEmpty.hidden = false;
      return;
    }
    printEmpty.hidden = true;
    for (const row of rows) {
      const item = document.createElement('li');
      item.className = 'part-inspector-print-item';
      const name = document.createElement('strong');
      name.textContent = row.file;
      const settings = document.createElement('span');
      settings.className = 'part-inspector-print-settings';
      settings.textContent = row.settings;
      item.append(name, settings);
      if (row.notes !== '—') {
        const notes = document.createElement('span');
        notes.className = 'part-inspector-print-notes';
        notes.textContent = row.notes;
        item.append(notes);
      }
      printList.append(item);
    }
    if (matchedBy) {
      const hint = document.createElement('li');
      hint.className = 'part-inspector-print-item';
      const meta = document.createElement('span');
      meta.className = 'part-inspector-print-notes';
      meta.textContent = `Matched by ${matchedBy}.`;
      hint.append(meta);
      printList.append(hint);
    }
  };

  const restoreHighlight = mesh => {
    if (!mesh) return;
    const state = highlight.get(mesh);
    if (!state) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      if (!material || !('emissive' in material)) continue;
      material.emissive.setHex(state.color);
      if ('emissiveIntensity' in material) material.emissiveIntensity = state.intensity;
    }
  };

  const applyHighlight = mesh => {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      if (!material || !('emissive' in material)) continue;
      highlight.set(mesh, {
        color: material.emissive.getHex(),
        intensity: 'emissiveIntensity' in material ? material.emissiveIntensity : 1,
      });
      material.emissive.setHex(0x2f7df6);
      if ('emissiveIntensity' in material) material.emissiveIntensity = 0.6;
    }
  };

  const refreshStatus = () => {
    if (!selected) {
      status.textContent = hidden.size ? `No part selected. ${hiddenBadge(hidden.size)}.` : 'No part selected.';
      return;
    }
    status.textContent = hidden.size
      ? `Selected: ${labelFor(selected)}. ${hiddenBadge(hidden.size)}.`
      : `Selected: ${labelFor(selected)}.`;
  };

  const clearSelection = () => {
    restoreHighlight(selected);
    selected = null;
    fields.label.textContent = '—';
    fields.key.textContent = '—';
    fields.module.textContent = '—';
    fields.group.textContent = '—';
    fields.component.textContent = '—';
    fields.sourcePath.textContent = '—';
    renderPrintRows(null);
    hideSelectedButton.disabled = true;
    refreshStatus();
    requestRender();
  };

  const setSelection = mesh => {
    if (!mesh || !mesh.visible) return;
    if (selected === mesh) return;
    restoreHighlight(selected);
    selected = mesh;
    applyHighlight(selected);
    fields.label.textContent = textFor(labelFor(mesh));
    fields.key.textContent = textFor(mesh.userData.partKey || mesh.userData.originalKey || mesh.name);
    fields.module.textContent = textFor(mesh.userData.moduleId);
    fields.group.textContent = textFor(mesh.userData.partGroup);
    fields.component.textContent = textFor(mesh.userData.partComponent);
    fields.sourcePath.textContent = textFor(mesh.userData.partSourcePath);
    renderPrintRows(mesh);
    hideSelectedButton.disabled = false;
    refreshStatus();
    requestRender();
  };

  const applyHiddenVisibility = () => {
    let selectedBecameHidden = false;
    for (const mesh of hidden) {
      mesh.visible = false;
      if (selected === mesh) selectedBecameHidden = true;
    }
    if (selectedBecameHidden) clearSelection();
    unhideAllButton.disabled = hidden.size === 0;
    refreshStatus();
  };

  hideSelectedButton.addEventListener('click', () => {
    if (!selected) return;
    hidden.add(selected);
    selected.visible = false;
    clearSelection();
    applyHiddenVisibility();
    requestRender();
  });

  unhideAllButton.addEventListener('click', () => {
    hidden.clear();
    if (typeof syncVisibility === 'function') {
      syncVisibility();
    }
    unhideAllButton.disabled = true;
    refreshStatus();
    requestRender();
  });

  renderer.domElement.addEventListener('pointerdown', event => {
    pointerDown.x = event.clientX;
    pointerDown.y = event.clientY;
    pointerDown.button = event.button;
  });

  renderer.domElement.addEventListener('pointerup', event => {
    if (pointerDown.button !== 0 || event.button !== 0) return;
    const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
    if (moved > 4) return;
    if (event.target !== renderer.domElement) return;

    const rect = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const visibleMeshes = allMeshes.filter(mesh => mesh.visible);
    const [hit] = raycaster.intersectObjects(visibleMeshes, false);
    if (!hit) return;
    setSelection(hit.object);
  });

  return {applyHiddenVisibility};
}
