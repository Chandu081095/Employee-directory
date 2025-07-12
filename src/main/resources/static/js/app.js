let currentPage = 1;
let itemsPerPage = 10;
let filteredEmployees = [...mockEmployees];

const container = document.getElementById('employee-list-container');

function renderDashboard(employees) {
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = employees.slice(start, start + itemsPerPage);

  container.innerHTML = '';
  paginated.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>ID: ${emp.id}</p>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    `;
    container.appendChild(div);
  });

  attachListeners();
  updatePagination(employees.length);
}

function attachListeners() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => window.location.href = `form.html?editId=${btn.dataset.id}`;
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      if (confirm("Delete this employee?")) {
        const index = mockEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEmployees.splice(index, 1);
          filteredEmployees = [...mockEmployees];
          renderDashboard(filteredEmployees);
        }
      }
    };
  });
}

function applyFilterSortSearch() {
  const search = document.getElementById("search-input").value.toLowerCase();
  const f = document.getElementById("filter-firstName").value.toLowerCase();
  const d = document.getElementById("filter-department").value.toLowerCase();
  const r = document.getElementById("filter-role").value.toLowerCase();
  const sort = document.getElementById("sort-by").value;

  let data = mockEmployees
