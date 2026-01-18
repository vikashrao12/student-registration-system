// Get form and table data
const form = document.getElementById("stuForm");
const tableBody = document.getElementById("stuTable");

// Get input fields
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");

// For editing
let editIndex = -1;

// Get data from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display existing data on page load
displayStudents();

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const studentId = idInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  // Validation
  if (!name || !studentId || !email || !contact) {
    alert("All fields are required");
    return;
  }

  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name should contain only letters");
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert("Student ID should contain only numbers");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (!/^\d{10,}$/.test(contact)) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  const stuData = {
    name,
    studentId,
    email,
    contact
  };

  if (editIndex === -1) {
    students.push(stuData);
  } else {
    students[editIndex] = stuData;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  displayStudents();
});

// Display students
function displayStudents() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border p-2">${student.name}</td>
      <td class="border p-2">${student.studentId}</td>
      <td class="border p-2">${student.email}</td>
      <td class="border p-2">${student.contact}</td>
      <td class="border p-2">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Dynamic scrollbar
  tableBody.parentElement.style.maxHeight = "250px";
  tableBody.parentElement.style.overflowY = "auto";
}

// Edit student
function editStudent(index) {
  const student = students[index];

  nameInput.value = student.name;
  idInput.value = student.studentId;
  emailInput.value = student.email;
  contactInput.value = student.contact;

  editIndex = index;
}

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}
