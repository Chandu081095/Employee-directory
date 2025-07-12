// Global state
let currentPage = 1;
let itemsPerPage = 10;
let filteredEmployees = [...mockEmployees];

const listContainer = document.getElementById('employee-list-container');

// Render paginated, filtered, sorted employee list
function renderDashboard(employees) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = employees.slice(start, end);

  listContainer.innerHTML = '';
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
    listContainer.appendChild(div);
  });

  attachButtonListeners();
  updatePaginationControls(employees.length);
}

// Attach event listeners to buttons
function attachButtonListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute("data-id"));
      if (confirm("Are you sure you want to delete this employee?")) {
        const index = mockEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEmployees.splice(index, 1);
          filteredEmployees = [...mockEmployees];
          renderDashboard(filteredEmployees);
        }
      }
    };
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      window.location.href = `add-edit-form.ftlh?editId=${id}`;
    };
  });
}

// Search, filter, sort
function applySearchFilterSort() {
  const searchVal = document.getElementById("search-input").value.toLowerCase();
  const fName = document.getElementById("filter-firstName").value.toLowerCase();
  const dept = document.getElementById("filter-department").value.toLowerCase();
  const role = document.getElementById("filter-role").value.toLowerCase();
  const sortBy = document.getElementById("sort-by").value;

  let data = [...mockEmployees].filter(e => {
    return (
      (`${e.firstName} ${e.lastName}`.toLowerCase().includes(searchVal) ||
       e.email.toLowerCase().includes(searchVal)) &&
      (fName ? e.firstName.toLowerCase().includes(fName) : true) &&
      (dept ? e.department.toLowerCase().includes(dept) : true) &&
      (role ? e.role.toLowerCase().includes(role) : true)
    );
  });

  if (sortBy === 'firstName') {
    data.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortBy === 'department') {
    data.sort((a, b) => a.department.localeCompare(b.department));
  }

  filteredEmployees = data;
  currentPage = 1;
  renderDashboard(filteredEmployees);
}

// Pagination Controls
function updatePaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  document.getElementById('pageDisplay').innerText = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Event listeners
document.getElementById('search-input').addEventListener('input', applySearchFilterSort);
document.getElementById('sort-by').addEventListener('change', applySearchFilterSort);
document.getElementById('apply-filter').addEventListener('click', applySearchFilterSort);
document.getElementById('filter-toggle').addEventListener('click', () => {
  const panel = document.getElementById('filter-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('itemsPerPage').addEventListener('change', (e) => {
  itemsPerPage = parseInt(e.target.value);
  currentPage = 1;
  renderDashboard(filteredEmployees);
});
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderDashboard(filteredEmployees);
  }
});
document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderDashboard(filteredEmployees);
  }
});

// Initial load
renderDashboard(filteredEmployees);
