import {ensureWorkspaceEntry} from './workspace-entry.mjs';
ensureWorkspaceEntry(import.meta.url);
import {replaceWorkspaceURL} from './workspace-navigation.mjs?v=424451cc1e036690fee7';
import {loadCustomComponentCatalog,renderTargetURL} from './custom-component-model.mjs?v=owner-custom-2';

const familyOrder = ['trident', 'v24', 'v0', 'micron', 'community'];

function badge(text) {
  const span = document.createElement('span');
  span.className = 'selection-tag';
  span.textContent = text;
  return span;
}

function drawCards(container, rows) {
  container.replaceChildren(...rows.map(row => {
    const card = document.createElement('article');
    card.className = 'source-card';
    const title = document.createElement('h3');
    title.textContent = row.label;
    const body = document.createElement('p');
    body.textContent = row.notes || 'No notes.';
    const meta = document.createElement('p');
    meta.className = 'foot';
    meta.textContent = `${row.type} · ${row.status}`;
    const families = document.createElement('div');
    families.className = 'selection-tags';
    for (const family of row.compatibility.machine_families || []) {
      families.append(badge(family));
    }
    const links = document.createElement('div');
    links.className = 'selection-tags';
    for (const target of row.render_targets || []) {
      const a = document.createElement('a');
      a.className = 'workbench-link';
      a.href = renderTargetURL(target, location.href);
      a.textContent = target.label;
      links.append(a);
    }
    card.append(title, meta, body, families, links);
    return card;
  }));
}

export async function mount() {
  const $ = id => document.getElementById(id);
  const status = $('componentPresetStatus');
  const summary = $('componentPresetSummary');
  const list = $('customComponentCards');
  const familyFilter = $('familyFilter');
  try {
    const data = await loadCustomComponentCatalog();
    const all = [...data.components].sort((a, b) => {
      const aa = familyOrder.findIndex(v => (a.compatibility.machine_families || []).includes(v));
      const bb = familyOrder.findIndex(v => (b.compatibility.machine_families || []).includes(v));
      if (aa !== bb) return aa - bb;
      return a.label.localeCompare(b.label);
    });
    const render = () => {
      const selected = familyFilter.value;
      const rows = selected === 'all' ? all : all.filter(row => (row.compatibility.machine_families || []).includes(selected));
      drawCards(list, rows);
      const scope = selected === 'all'
        ? 'all families'
        : [...familyFilter.options].find(option => option.value === selected)?.textContent || selected;
      status.textContent = `Loaded ${rows.length} of ${all.length} preset${all.length === 1 ? '' : 's'} for ${scope}.`;
      summary.textContent = `Schema ${data.schema} · version ${data.version}`;
      const url = new URL(location.href);
      if (selected === 'all') url.searchParams.delete('family');
      else url.searchParams.set('family', selected);
      replaceWorkspaceURL(null, '', url);
    };
    const requested = new URL(location.href).searchParams.get('family');
    if (requested && [...familyFilter.options].some(o => o.value === requested)) {
      familyFilter.value = requested;
    }
    familyFilter.onchange = render;
    render();
  } catch (error) {
    list.replaceChildren();
    status.textContent = error.message;
    summary.textContent = '';
    console.error(error);
  }
}
