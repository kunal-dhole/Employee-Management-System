const apiBaseUrl = "http://localhost:8080/employees";

// Select DOM elements
const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTable");
const searchInput = document.getElementById("searchBar");
const paginationContainer = document.getElementById("pagination");

// Pagination state
let currentPage = 0;
let totalPages = 1;
let sortBy = 'name';  // default sort by 'name'

// Validate DOM elements
if (!employeeForm || !employeeTableBody || !searchInput || !paginationContainer) {
    console.error("Required DOM elements not found.");
}

// Fetch and display all employees
async function fetchAllEmployees(page = 0, size = 5, sortBy = 'name') {
    try {
        const response = await fetch(`${apiBaseUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        displayEmployees(data.content);  // Use 'content' for paginated data
        totalPages = data.totalPages;   // Get total pages for pagination
        displayPagination();
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// Display employees in the table
function displayEmployees(employees) {
    employeeTableBody.innerHTML = ""; // Clear the current table rows
    employees.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.department}</td>
            <td>
                <button onclick="editEmployee(${employee.id})" class="btn btn-info">Edit</button>
                <button onclick="deleteEmployee(${employee.id})" class="btn btn-danger" style="margin-left: 9px;">Delete</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Display pagination controls
function displayPagination() {
    paginationContainer.innerHTML = ""; // Clear pagination
    for (let i = 0; i < totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        pageItem.innerHTML = `
            <a class="page-link" href="#" onclick="goToPage(${i})">${i + 1}</a>
        `;
        paginationContainer.appendChild(pageItem);
    }
}

// Go to a specific page
function goToPage(page) {
    currentPage = page;
    fetchAllEmployees(currentPage, 5, sortBy); // Fetch employees for the selected page
}

// Add or update an employee
if (employeeForm) {
    employeeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const employee = {
            name: employeeForm.name.value,
            email: employeeForm.email.value,
            phone: employeeForm.phone.value,
            department: employeeForm.department.value,
        };

        // Validation
        if (!employee.name || employee.name.length < 3) {
            alert("Name must be at least 3 characters long.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(employee.email)) {
            alert("Invalid email format.");
            return;
        }
        if (!/^\d{10}$/.test(employee.phone)) {
            alert("Phone must be 10 digits.");
            return;
        }
        if (!employee.department) {
            alert("Department is required.");
            return;
        }

        const employeeId = employeeForm.employeeId.value;

        try {
            if (employeeId) {
                // Update employee
                const response = await fetch(`${apiBaseUrl}/update/${employeeId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employee),
                });
                if (!response.ok) throw new Error("Failed to update employee");
            } else {
                // Add new employee
                const response = await fetch(`${apiBaseUrl}/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employee),
                });
                if (!response.ok) throw new Error("Failed to add employee");
            }

            // Refresh employees and clear form
            await fetchAllEmployees(currentPage);
            employeeForm.reset();
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    });
}

// Edit an employee
async function editEmployee(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/getAll/${id}`);
        if (!response.ok) throw new Error("Failed to fetch employee details");
        const employee = await response.json();

        employeeForm.employeeId.value = id;
        employeeForm.name.value = employee.name;
        employeeForm.email.value = employee.email;
        employeeForm.phone.value = employee.phone;
        employeeForm.department.value = employee.department;
    } catch (error) {
        console.error("Error fetching employee details:", error);
    }
}

// Delete an employee
async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const response = await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete employee");

        await fetchAllEmployees(currentPage);
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}

// Search employees by name or department
if (searchInput) {
    searchInput.addEventListener("input", async (event) => {
        const query = event.target.value.toLowerCase();

        try {
            const response = await fetch(`${apiBaseUrl}?page=${currentPage}&size=5&sortBy=${sortBy}`);
            if (!response.ok) throw new Error("Failed to fetch employees");
            const data = await response.json();

            const filteredEmployees = data.content.filter(
                (employee) =>
                    employee.name.toLowerCase().includes(query) ||
                    employee.department.toLowerCase().includes(query)
            );
            displayEmployees(filteredEmployees);
        } catch (error) {
            console.error("Error searching employees:", error);
        }
    });
}

// Sorting by name or department
document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', function () {
        sortBy = this.getAttribute('data-sort');
        fetchAllEmployees(currentPage, 5, sortBy); // Fetch sorted employees
    });
});

// Initialize the application
fetchAllEmployees(currentPage, 5, sortBy);
