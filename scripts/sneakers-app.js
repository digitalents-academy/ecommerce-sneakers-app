document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const overlay = document.getElementById('overlay');
  const closeButton = document.getElementById('closeButton');

  hamburgerMenu.addEventListener('click', function () {
      extendedMenu.classList.toggle('open');
      overlay.classList.toggle('active');
  });

  closeButton.addEventListener('click', function () {
      extendedMenu.classList.remove('open');
      overlay.classList.remove('active');
  });

  overlay.addEventListener('click', function () {
      extendedMenu.classList.remove('open');
      overlay.classList.remove('active');
  });

  window.addEventListener('resize', function () {
      if (window.innerWidth > 770) {
          extendedMenu.classList.remove('open');
          overlay.classList.remove('active');
      }
  });
});
