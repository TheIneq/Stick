document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

fetch('/Stick/src/layout.html')
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

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.remove('fade-in');
  }, 50);
});

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
      return;
    }

    e.preventDefault();

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = href;
    }, 500);
  });
});