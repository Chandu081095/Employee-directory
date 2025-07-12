const form = document.getElementById("employee-form");
const params = new URLSearchParams(window.location.search);
const editId = params.get("editId");
const cancelBtn = document.getElementById("cancelBtn");

function showError(input, message) {
  input.classList.add("invalid");
  input.nextElementSibling.textContent = message;
}

function clearError(input) {
  input.classList.remove("invalid");
  input.nextElementSibling.textContent = "";
}

function populateForm(employee) {
  document.getElementById("employeeId").value = employee.id;
  document.getElementById("firstName").value = employee.firstName;
  document.getElementById("lastName").value = employee.lastName;
  document.getElementById("email").value = employee.email;
  document.getElementById("department").value = employee.department;
  document.getElementById("role").value = employee.role;
  document.getElementById("form-title").innerText = "Edit Employee";
}

// Pre-fill form if editing
if (editId) {
  const emp = mockEmployees.find(e => e.id == editId);
  if (emp) populateForm(emp);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("employeeId").value;
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const department = document.getElementById("department");
  const role = document.getElementById("role");

  let valid = true;

  if (!firstName.value.trim()) { showError(firstName, "First name is required"); valid = false; } else clearError(firstName);
  if (!lastName.value.trim()) { showError(lastName, "Last name is required"); valid = false; } else clearError(lastName);
  const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
  if (!email.value.trim()) { showError(email, "Email is required"); valid = false; }
  else if (!emailPattern.test(email.value.trim())) { showError(email, "Invalid email"); valid = false; }
  else clearError(email);
  if (!department.value.trim()) { showError(department, "Department is required"); valid = false; } else clearError(department);
  if (!role.value.trim()) { showError(role, "Role is required"); valid = false; } else clearError(role);

  if (!valid) return;

  const newEmployee = {
    id: id ? parseInt(id) : Date.now(),
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    department: department.value.trim(),
    role: role.value.trim()
  };

  if (id) {
    const index = mockEmployees.findIndex(e => e.id == id);
    if (index !== -1) mockEmployees[index] = newEmployee;
  } else {
    mockEmployees.push(newEmployee);
  }

  window.location.href = "index.html";
});

// Cancel button just abandons changes and returns
cancelBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
