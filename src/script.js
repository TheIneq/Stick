document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

fetch('./src/layout.html')
  .then(res => res.text())
  .then(data => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    const navbar = tempDiv.querySelector('header');
    const footer = tempDiv.querySelector('footer');

    if (navbar) document.getElementById('navbar-container').appendChild(navbar);
    if (footer) document.getElementById('footer-container').appendChild(footer);

    const yearSpan = document.getElementById('footer-container').querySelector('#year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll('#navbar-container a');
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const footerLinks = document.querySelectorAll('#footer-container a');
    footerLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }).catch(err => console.error('Failed to load layout:', err));