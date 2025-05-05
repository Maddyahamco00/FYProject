// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners and implement client-side interactions here
  
    // Example: Toggle sidebar on smaller screens (if you have a toggle button)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
  
    if (sidebarToggle && sidebar && mainContent) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
      });
    }
  
    // Example: Basic form validation (you'll likely want more robust validation)
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
      authForm.addEventListener('submit', (event) => {
        const usernameInput = authForm.querySelector('#username');
        const passwordInput = authForm.querySelector('#password');
        let isValid = true;
  
        if (!usernameInput.value.trim()) {
          alert('Please enter your username.');
          isValid = false;
        }
  
        if (!passwordInput.value.trim()) {
          alert('Please enter your password.');
          isValid = false;
        }
  
        if (!isValid) {
          event.preventDefault(); // Prevent form submission if validation fails
        }
      });
    }
  
    // Example: Interactive elements on the dashboard (if you have any)
    const timeSelect = document.querySelector('.time-select');
    const activityChartCanvas = document.getElementById('activityChart');
  
    if (timeSelect && activityChartCanvas) {
      timeSelect.addEventListener('change', (event) => {
        const selectedTimeframe = event.target.value;
        // In a real application, you would fetch new data based on the selectedTimeframe
        console.log(`Fetching activity data for: ${selectedTimeframe}`);
        // For demonstration, let's just update the chart title (replace with actual chart update logic)
        // if (window.myChart) { // Assuming you're using Chart.js and have a chart instance
        //   window.myChart.config.options.plugins.title.text = `Recent Activity (${selectedTimeframe})`;
        //   window.myChart.update();
        // } else {
        //   // Initialize a dummy chart if it doesn't exist
        //   window.myChart = new Chart(activityChartCanvas, {
        //     type: 'line',
        //     data: {
        //       labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        //       datasets: [{
        //         label: `Activity (${selectedTimeframe})`,
        //         data: [65, 59, 80, 81, 56, 55, 40],
        //         borderColor: 'rgba(54, 162, 235, 1)',
        //         borderWidth: 2,
        //         fill: false
        //       }]
        //     },
        //     options: {
        //       plugins: {
        //         title: {
        //           display: true,
        //           text: `Recent Activity (${selectedTimeframe})`
        //         }
        //       }
        //     }
        //   });
        // }
      });
    }
  
    // Example: Handling delete button clicks in the student table
    const deleteButtons = document.querySelectorAll('.data-table-container .btn-action.delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const studentId = event.target.closest('tr').querySelector('td:first-child').textContent; // Assuming Reg. Number is the first cell
        const studentName = event.target.closest('tr').querySelector('td:nth-child(2)').textContent.trim();
  
        if (confirm(`Are you sure you want to delete student: ${studentName} (ID: ${studentId})?`)) {
          // In a real application, you would send an AJAX request to the server to delete the student
          console.log(`Deleting student with ID: ${studentId}`);
          // Optionally, you can remove the table row from the DOM after successful deletion
          event.target.closest('tr').remove();
        }
      });
    });
  
    // Example: Filtering students by school and class
    const schoolFilter = document.querySelector('.search-filter-bar select:first-child');
    const classFilter = document.querySelector('.search-filter-bar select:nth-child(2)');
    const studentTableRows = document.querySelectorAll('.data-table-container .data-table tbody tr');
  
    if (schoolFilter && classFilter && studentTableRows.length > 0) {
      const filterStudents = () => {
        const selectedSchoolId = schoolFilter.value;
        const selectedClass = classFilter.value;
  
        studentTableRows.forEach(row => {
          const schoolId = row.querySelector('td:nth-child(3)').dataset.schoolId || row.querySelector('td:nth-child(3)').textContent.trim(); // Assuming school ID might be in a data attribute
          const classLevel = row.querySelector('td:nth-child(4)').textContent.trim();
          const schoolMatch = selectedSchoolId === 'All Schools' || schoolId === selectedSchoolId;
          const classMatch = selectedClass === 'All Classes' || classLevel === selectedClass;
  
          if (schoolMatch && classMatch) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      };
  
      schoolFilter.addEventListener('change', filterStudents);
      classFilter.addEventListener('change', filterStudents);
  
      // Initially set data attributes for easier filtering (if not already present)
      studentTableRows.forEach(row => {
        const schoolLink = row.querySelector('td:nth-child(3) a');
        if (schoolLink && !row.querySelector('td:nth-child(3)').dataset.schoolId) {
          const href = schoolLink.getAttribute('href');
          const schoolIdMatch = href.match(/\/schools\/(\d+)/); // Example: /admin/schools/123
          if (schoolIdMatch && schoolIdMatch[1]) {
            row.querySelector('td:nth-child(3)').dataset.schoolId = schoolIdMatch[1];
          } else {
            // Fallback to text content if ID not in URL
            row.querySelector('td:nth-child(3)').dataset.schoolId = row.querySelector('td:nth-child(3)').textContent.trim();
          }
        } else if (!schoolLink) {
          row.querySelector('td:nth-child(3)').dataset.schoolId = row.querySelector('td:nth-child(3)').textContent.trim();
        }
      });
    }
  
    // You can add more client-side interactions as needed, such as:
    // - Handling form submissions via AJAX
    // - Implementing dynamic UI updates
    // - Using JavaScript libraries for enhanced functionality (e.g., Chart.js for charts, DataTables for tables)
  });
  