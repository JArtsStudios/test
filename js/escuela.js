document.addEventListener('DOMContentLoaded', function () {
  // Avatar (opcional)
  const avatar = localStorage.getItem('avatar');
  const avatarElement = document.getElementById('avatar');

  if (avatarElement) {
    if (avatar) avatarElement.setAttribute('src', avatar);

    avatarElement.addEventListener('click', function () {
      window.location.href = 'perfil.html';
    });
  }

  // Menú mobile (no rompe nada si no lo usas)
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');
  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      const clickInside = navLinks.contains(e.target) || menuIcon.contains(e.target);
      if (!clickInside) navLinks.classList.remove('show');
    });
  }
});

// ---- Card tilt (MISMO funcionamiento) ----
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const content = card.querySelector('.content');
  if (!content) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    content.style.setProperty('--rotateX', `${rotateX}deg`);
    content.style.setProperty('--rotateY', `${rotateY}deg`);
  });

  card.addEventListener('mouseleave', () => {
    content.style.setProperty('--rotateX', `0deg`);
    content.style.setProperty('--rotateY', `0deg`);
  });
});

// ---- Banner acceso (MISMO funcionamiento) ----
const accesoBtn = document.getElementById('acceso');
const banner = document.getElementById('banner');
const overlay = document.getElementById('overlay');
const submitBtn = document.getElementById('submit');
const closeBtn = document.getElementById('close-banner');

function openBanner() {
  banner.classList.add('visible');
  banner.classList.remove('hidden');
  overlay.classList.add('visible');
  overlay.classList.remove('hidden');
}

function closeBanner() {
  banner.classList.remove('visible');
  banner.classList.add('hidden');
  overlay.classList.remove('visible');
  overlay.classList.add('hidden');
}

if (accesoBtn) {
  accesoBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const paginaDesbloqueada = localStorage.getItem('paginaDesbloqueada');
    if (paginaDesbloqueada === '1') {
      window.location.href = '../escuela/dotrinabasica/';
    } else {
      openBanner();
    }
  });
}

if (submitBtn) {
  submitBtn.addEventListener('click', function () {
    const password = document.getElementById('password')?.value || '';
    const mensaje = document.getElementById('mensaje');

    if (password === 'escuela@ebenezer') {
      localStorage.setItem('paginaDesbloqueada', '1');
      window.location.href = '../escuela/dotrinabasica/';
    } else {
      if (mensaje) {
        mensaje.textContent = 'Contraseña incorrecta';
        mensaje.classList.remove('hidden');
      }
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeBanner);
}

if (overlay) {
  overlay.addEventListener('click', closeBanner);
}

// Enter para enviar
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBanner();
  if (e.key === 'Enter' && banner && banner.classList.contains('visible')) {
    submitBtn?.click();
  }
});
