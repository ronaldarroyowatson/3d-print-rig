export function machineFamilyForId(machineId = '') {
  if (/^voron_trident_|^siboor_trident_/.test(machineId)) return 'trident';
  if (/^voron_v24_|^siboor_v24_/.test(machineId)) return 'v24';
  if (/^voron_v0|^micron_/.test(machineId)) return /^micron_/.test(machineId) ? 'micron' : 'v0';
  if (/^micron_/.test(machineId)) return 'micron';
  return 'community';
}

function assertComponentSchema(data) {
  if (data?.schema !== '3d-print-rig-custom-components-v1' || !Array.isArray(data.components)) {
    throw Error('Custom component schema is invalid.');
  }
}

export async function loadCustomComponentCatalog() {
  const response = await fetch('../CUSTOM_COMPONENTS.json', {cache: 'no-cache'});
  if (!response.ok) throw Error('Custom component presets are unavailable.');
  const data = await response.json();
  assertComponentSchema(data);
  return data;
}

export function customComponentMatches(component, {machineId = '', variant = {}} = {}) {
  const compatibility = component.compatibility || {};
  const families = compatibility.machine_families || [];
  const toolheads = compatibility.toolheads || [];
  const family = machineFamilyForId(machineId);
  const familyMatch = !families.length || families.includes(family);
  const toolheadMatch = !toolheads.length || toolheads.includes(variant.toolhead);
  return familyMatch && toolheadMatch;
}

export function compatibleCustomComponents(data, context) {
  assertComponentSchema(data);
  return data.components.filter(row => customComponentMatches(row, context));
}

export function renderTargetURL(target, currentURL = location.href) {
  const url = new URL(target.path, currentURL);
  if (target.machine) url.searchParams.set('machine', target.machine);
  return url.href;
}
