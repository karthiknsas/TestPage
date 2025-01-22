
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');

// Toggle nested tabs and update content dynamically
const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      const parentLi = link.parentElement;
        const isActive = parentLi.classList.toggle('active');
        const contentElement = document.getElementById('dynamic-content');			
        if (!isActive) contentElement.innerHTML = `<h2>Welcome to Riayati Developer Portal</h2>`
  });
});

// Nested link click event to dynamically load content
const nested = document.querySelectorAll('.nested a');
nested.forEach(link => {
link.addEventListener('click', function(event) {
event.preventDefault();
const section = link.getAttribute('data-section');
const section_html = link.getAttribute('data-section-html');
updateContent(section, section_html);
});
});

// Dynamically load content based on section
function updateContent(section, section_html) {
const contentElement = document.getElementById('dynamic-content');
contentElement.innerHTML = '<p>Loading...</p>'; // Add loading message
fetch(`${section_html}`)
.then(response => response.text())
.then(html => {
contentElement.innerHTML = html;
loadExternalScripts(section);
})
.catch(error => {
console.error('Error loading content:', error);
contentElement.innerHTML = '<p>Error loading content. Please try again later.</p>';
});
}

// Dynamically load external scripts (JS files) for each section
function loadExternalScripts(section) {
if (!document.querySelector(`script[src="${section}.js"]`)) {
const script = document.createElement('script');
script.src = `${section}.js`;
document.body.appendChild(script);
}
}

// Toggle dropdown in nav menu on click
const navItems = document.querySelectorAll('nav ul li');
navItems.forEach(item => {
item.addEventListener('click', function(event) {
const dropdown = item.querySelector('ul');
if (dropdown) {
const isVisible = dropdown.style.display === 'block';
dropdown.style.display = isVisible ? 'none' : 'block';
}
event.stopPropagation(); // Prevent closing other dropdowns
});
});

// Close dropdowns if clicked outside
document.addEventListener('click', function(event) {
if (!event.target.closest('nav')) {
const dropdowns = document.querySelectorAll('nav ul li ul');
dropdowns.forEach(dropdown => dropdown.style.display = 'none');
}
});

