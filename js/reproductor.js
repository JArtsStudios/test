document.addEventListener('DOMContentLoaded', () => {
  const videoId = localStorage.getItem('videoId');
  const videoTitle = localStorage.getItem('videoTitle') || 'Video';
  const videoDescription = localStorage.getItem('videoDescription') || '';
  
  // Elementos
  const playerWrap = document.getElementById('player');
  const titleEl = document.getElementById('videoTitle');
  const descEl = document.getElementById('videoDescription');
  const toggleBtn = document.getElementById('toggleDescription');

  // Si no hay videoId, no se puede cargar
  if (!videoId) {
    if (titleEl) titleEl.textContent = 'No se encontró el video.';
    if (descEl) descEl.textContent = 'Vuelve a Multimedia y selecciona un video.';
    if (toggleBtn) toggleBtn.style.display = 'none';
    return;
  }

  // Poner título y descripción
  if (titleEl) titleEl.textContent = videoTitle;
  if (descEl) descEl.textContent = videoDescription;

  // Player iframe responsive
  const iframe = document.createElement('iframe');
  
  // MODIFICACIÓN: Se añade ?autoplay=1 (reproducción auto) y &rel=0 (evitar recomendaciones externas)
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
  
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.loading = 'lazy';

  if (playerWrap) playerWrap.appendChild(iframe);

  // Toggle descripción (Mostrar/Ocultar)
  if (toggleBtn && descEl) {
    let open = false;
    toggleBtn.textContent = 'Ver descripción';

    toggleBtn.addEventListener('click', () => {
      open = !open;
      if (open) {
        descEl.classList.add('is-open');
        toggleBtn.textContent = 'Ocultar descripción';
      } else {
        descEl.classList.remove('is-open');
        toggleBtn.textContent = 'Ver descripción';
      }
    });
  }
});