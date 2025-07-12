const form = document.getElementById('employee-form');
const cancelBtn = document.getElementById('cancelBtn');
const params = new URLSearchParams(window.location.search);
const editId = params.get('editId');

function populateForm(emp) {
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
  document.getElementById('form-title').innerText = "Edit Employee";
}

// Pre-fill if editing
if (editId) {
  const emp = mockEmployees.find(e => e.id == editId);
  if (emp) populateForm(emp);
}

// Simple inline validation
function showError(input, message) {
  input.style.borderColor = 'red';
  input.nextElementSibling.textContent = message;
}

function clearError(input) {
  input.style.borderColor = '';
  input.nextElementSibling.textContent = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('employeeId').value;
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const department = document.getElementById('department');
  const role = document.getElementById('role');

  let valid = true;
  if (!firstName.value.trim()) { showError(firstName, "Required"); valid = false; } else clearError(firstName);
  if (!lastName.value.trim()) { showError(lastName, "Required"); valid = false; } else clearError(lastName);
  if (!department.value.trim()) { showError(department, "Required"); valid = false; } else clearError(department);
  if (!role.value.trim()) { showError(role, "Required"); valid = false; } else clearError(role);
  const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailPattern.test(email.value.trim())) { showError(email, "Invalid email"); valid = false; } else clearError(email);

  if (!valid) return;

  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    department: department.value.trim(),
    role: role.value.trim()
  };

  if (id) {
    const index = mockEmployees.findIndex(e => e.id == id);
    if (index !== -1) mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  window.location.href = "dashboard.ftlh"; // Redirect to dashboard
});

cancelBtn.addEventListener('click', () => {
  window.location.href = "dashboard.ftlh";
});
