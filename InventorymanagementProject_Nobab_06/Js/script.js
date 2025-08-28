// Shared API helper and page wiring
const API_BASE = 'InventorymanagementProject_Nobab_06/backend/api.php';

async function apiRequest(entity, method = 'GET', data = null, id = null) {
  const url = new URL(API_BASE, window.location.href);
  url.searchParams.set('entity', entity);
  if (id) url.searchParams.set('id', id);
  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : null,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Request failed');
  }
  return res.json();
}

function serializeForm(modalEl) {
  const inputs = modalEl.querySelectorAll('input');
  const payload = {};
  inputs.forEach(input => {
    const key = (input.getAttribute('name') || input.getAttribute('placeholder') || '').toLowerCase()
      .replace(/\s+/g, '_');
    if (key) payload[key] = input.value;
  });
  return payload;
}

function fillTable(tbody, rows, columns) {
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    columns.forEach(c => {
      const td = document.createElement('td');
      td.textContent = r[c] ?? '';
      tr.appendChild(td);
    });
    const actions = document.createElement('td');
    actions.innerHTML = '<button class="btn btn-warning btn-sm me-1 btn-edit">Edit</button><button class="btn btn-danger btn-sm btn-delete">Delete</button>';
    tr.appendChild(actions);
    tr.dataset.id = r.id;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname;

  if (path.endsWith('inventory.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');

    const columns = ['product_id','product_name','category','stock_level','usage_rate','quantity','procurement_schedule'];

    apiRequest('inventory').then(rows => fillTable(tbody, rows, columns));

    // Save new
    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('inventory', 'POST', payload);
      const rows = await apiRequest('inventory');
      fillTable(tbody, rows, columns);
    });

    // Update existing
    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('inventory', 'PUT', payload, id);
      const rows = await apiRequest('inventory');
      fillTable(tbody, rows, columns);
    });

    // Row actions
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('inventory', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('inventory');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        // map in order
        inputs[0].value = cells[0].innerText;
        inputs[1].value = cells[1].innerText;
        inputs[2].value = cells[2].innerText;
        inputs[3].value = cells[3].innerText;
        inputs[4].value = cells[4].innerText;
        inputs[5].value = cells[5].innerText;
        inputs[6].value = cells[6].innerText;
      }
    });
  }

  if (path.endsWith('agricultural_products.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    const columns = ['product_id','product_name','category','seed_type','sowing_date','expected_harvest','storage','shelf_life','packaging'];
    apiRequest('agricultural_products').then(rows => fillTable(tbody, rows, columns));

    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('agricultural_products', 'POST', payload);
      const rows = await apiRequest('agricultural_products');
      fillTable(tbody, rows, columns);
    });

    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('agricultural_products', 'PUT', payload, id);
      const rows = await apiRequest('agricultural_products');
      fillTable(tbody, rows, columns);
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('agricultural_products', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('agricultural_products');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        for (let i = 0; i < columns.length; i++) {
          inputs[i].value = cells[i].innerText;
        }
      }
    });
  }

  if (path.endsWith('harvested_crops.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    const columns = ['crop_id','temperature','humidity','category','harvest_date','crop_name','quantity','storage','processing_unit'];
    apiRequest('harvested_crops').then(rows => fillTable(tbody, rows, columns));

    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('harvested_crops', 'POST', payload);
      const rows = await apiRequest('harvested_crops');
      fillTable(tbody, rows, columns);
    });

    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('harvested_crops', 'PUT', payload, id);
      const rows = await apiRequest('harvested_crops');
      fillTable(tbody, rows, columns);
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('harvested_crops', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('harvested_crops');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        for (let i = 0; i < columns.length; i++) {
          inputs[i].value = cells[i].innerText;
        }
      }
    });
  }

  if (path.endsWith('perishable_products.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    const columns = ['product_id','product_name','storage','product_type','category','expiry_date'];
    apiRequest('perishable_products').then(rows => fillTable(tbody, rows, columns));

    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('perishable_products', 'POST', payload);
      const rows = await apiRequest('perishable_products');
      fillTable(tbody, rows, columns);
    });

    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('perishable_products', 'PUT', payload, id);
      const rows = await apiRequest('perishable_products');
      fillTable(tbody, rows, columns);
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('perishable_products', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('perishable_products');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        for (let i = 0; i < columns.length; i++) {
          inputs[i].value = cells[i].innerText;
        }
      }
    });
  }

  if (path.endsWith('post_harvest.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    const columns = ['product_id','product_name','category','batch_number','expiry_date','storage_condition','location','quantity','stock_level_status'];
    apiRequest('post_harvest').then(rows => fillTable(tbody, rows, columns));

    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('post_harvest', 'POST', payload);
      const rows = await apiRequest('post_harvest');
      fillTable(tbody, rows, columns);
    });

    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('post_harvest', 'PUT', payload, id);
      const rows = await apiRequest('post_harvest');
      fillTable(tbody, rows, columns);
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('post_harvest', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('post_harvest');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        for (let i = 0; i < columns.length; i++) {
          inputs[i].value = cells[i].innerText;
        }
      }
    });
  }

  if (path.endsWith('storage_condition.html')) {
    const tbody = document.querySelector('tbody');
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    const columns = ['warehouse_id','location','temperature','humidity'];
    apiRequest('storage_conditions').then(rows => fillTable(tbody, rows, columns));

    addModal?.querySelector('.btn.btn-success')?.addEventListener('click', async () => {
      const payload = serializeForm(addModal);
      await apiRequest('storage_conditions', 'POST', payload);
      const rows = await apiRequest('storage_conditions');
      fillTable(tbody, rows, columns);
    });

    editModal?.querySelector('.btn.btn-warning')?.addEventListener('click', async () => {
      const id = editModal.dataset.id;
      const payload = serializeForm(editModal);
      await apiRequest('storage_conditions', 'PUT', payload, id);
      const rows = await apiRequest('storage_conditions');
      fillTable(tbody, rows, columns);
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest('tr');
      if (!row) return;
      const id = row.dataset.id;
      if (target.classList.contains('btn-delete')) {
        apiRequest('storage_conditions', 'DELETE', null, id).then(async () => {
          const rows = await apiRequest('storage_conditions');
          fillTable(tbody, rows, columns);
        });
      }
      if (target.classList.contains('btn-edit')) {
        const cells = row.querySelectorAll('td');
        const inputs = editModal.querySelectorAll('input');
        editModal.dataset.id = id;
        for (let i = 0; i < columns.length; i++) {
          inputs[i].value = cells[i].innerText;
        }
      }
    });
  }
});


