<section id="form-container">
  <h2 id="form-title">Add / Edit Employee</h2>
  <form id="employee-form">
    <input type="hidden" id="employeeId" />

    <label>First Name:</label>
    <input type="text" id="firstName" required />
    <span class="error-msg"></span>

    <label>Last Name:</label>
    <input type="text" id="lastName" required />
    <span class="error-msg"></span>

    <label>Email:</label>
    <input type="email" id="email" required />
    <span class="error-msg"></span>

    <label>Department:</label>
    <input type="text" id="department" required />
    <span class="error-msg"></span>

    <label>Role:</label>
    <input type="text" id="role" required />
    <span class="error-msg"></span>

    <div class="form-actions">
      <button type="submit">Save</button>
      <button type="button" id="cancelBtn">Cancel</button>
    </div>
  </form>
</section>

<script src="/static/js/data.js"></script>
<script src="/static/js/form.js"></script>
