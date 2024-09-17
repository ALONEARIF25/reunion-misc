const menuIcon = document.querySelector(".menu-icon");
const body = document.body;
const sidebar = document.querySelector(".sidebar");

// Function to toggle sidebar and store state in localStorage
const toggleSidebar = () => {
  body.classList.toggle("sidebar-active");

  // Save the state in localStorage
  if (body.classList.contains("sidebar-active")) {
    localStorage.setItem("sidebarState", "active");
  } else {
    localStorage.setItem("sidebarState", "inactive");
  }
};

// Toggle sidebar visibility on menu icon click
menuIcon.addEventListener("click", toggleSidebar);

// Close the sidebar when clicking outside
window.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
    body.classList.remove("sidebar-active");
    localStorage.setItem("sidebarState", "inactive");
  }
});

// Check the saved state from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const sidebarState = localStorage.getItem("sidebarState");

  // Temporarily disable transitions to prevent animation on refresh
  sidebar.style.transition = "none";
  body.style.transition = "none";

  // Apply the saved state
  if (sidebarState === "active") {
    body.classList.add("sidebar-active");
  }

  // Re-enable transitions after a short delay
  setTimeout(() => {
    sidebar.style.transition = "";
    body.style.transition = "";
  }, 100); // Adjust this delay if necessary
});

// Toggle sidebar when pressing the spacebar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Escape") {
    e.preventDefault(); // Prevent the default spacebar action (like page scroll)
    toggleSidebar();
  }
});
