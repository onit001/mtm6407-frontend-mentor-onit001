document.addEventListener('DOMContentLoaded', function() {
  
  const menuBtn = document.querySelector('.menu-btn');
  const navContent = document.querySelector('.nav-content');
  const body = document.body;
  const dropdowns = document.querySelectorAll('.dropdown');

  // create overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  body.appendChild(overlay);

  // toggle mobile view menu
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    navContent.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (navContent.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // close menu when clicking overlay
  overlay.addEventListener('click', function() {
    menuBtn.classList.remove('active');
    navContent.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    
    // close dropdowns too
    dropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
      dropdown.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
    });
  });

  // dropdown functionality
  dropdowns.forEach(function(dropdown) {
    const btn = dropdown.querySelector('.dropdown-btn');

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = dropdown.classList.contains('active');
      
      // close other dropdowns
      dropdowns.forEach(function(other) {
        if (other !== dropdown) {
          other.classList.remove('active');
          other.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
        }
      });

      // toggle this dropdown
      if (isOpen) {
        dropdown.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        dropdown.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(function(dropdown) {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // close menu on window resize
  let timer;
  window.addEventListener('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      if (window.innerWidth > 768) {
        menuBtn.classList.remove('active');
        navContent.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      }
    }, 250);
  });

  // prevent dropdown clicks from closing
  document.querySelectorAll('.dropdown-content').forEach(function(menu) {
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // escape key closes menus
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(function(dropdown) {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
      });
      
      if (window.innerWidth <= 768 && navContent.classList.contains('active')) {
        menuBtn.classList.remove('active');
        navContent.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      }
    }
  });

  // keyboard navigation or shortcuts for dropdowns
  dropdowns.forEach(function(dropdown) {
    const btn = dropdown.querySelector('.dropdown-btn');
    
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});