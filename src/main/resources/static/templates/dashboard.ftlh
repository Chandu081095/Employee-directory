<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/static/css/style.css" />
</head>
<body>
  <div id="dashboard-controls">
    <input type="text" id="search-input" placeholder="Search name/email" />
    <select id="sort-by">
      <option value="">Sort By</option>
      <option value="firstName">First Name</option>
      <option value="department">Department</option>
    </select>
    <button id="filter-toggle">Filter</button>
    <a href="add-edit-form.ftlh">Add New</a>
  </div>

  <div id="filter-panel" style="display: none;">
    <input type="text" id="filter-firstName" placeholder="First Name" />
    <input type="text" id="filter-department" placeholder="Department" />
    <input type="text" id="filter-role" placeholder="Role" />
    <button id="apply-filter">Apply Filter</button>
  </div>

  <section id="employee-list-container">
    <#list employees as employee>
      <div class="employee-card" data-employee-id="${employee.id}">
        <h3>${employee.firstName} ${employee.lastName}</h3>
        <p>ID: ${employee.id}</p>
        <p>Email: ${employee.email}</p>
        <p>Department: ${employee.department}</p>
        <p>Role: ${employee.role}</p>
        <button class="edit-btn" data-id="${employee.id}">Edit</button>
        <button class="delete-btn" data-id="${employee.id}">Delete</button>
      </div>
    </#list>
  </section>

  <div id="pagination-controls">
    <button id="prevPage">Previous</button>
    <span id="pageDisplay">Page 1</span>
    <button id="nextPage">Next</button>
    <select id="itemsPerPage">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
  </div>

  <script src="/static/js/data.js"></script>
  <script src="/static/js/app.js"></script>
</body>
</html>
