document.addEventListener('DOMContentLoaded', () => {
  // Nombre
  const username = localStorage.getItem('nombre') || 'Usuario';
  const usernameEl = document.getElementById('username');
  if (usernameEl) usernameEl.textContent = `¡Hola, ${username}!`;

  // Config
  const TOTAL = 24; // tus lecciones van 1..24 (ajústalo si cambia)
  const progreso = Number(localStorage.getItem('progreso') || 1);

  // Stats
  const done = Math.max(0, Math.min(progreso, TOTAL));
  const pct = TOTAL > 0 ? Math.round((done / TOTAL) * 100) : 0;

  const statDone = document.getElementById('statDone');
  const statTotal = document.getElementById('statTotal');
  const statPct = document.getElementById('statPct');

  if (statDone) statDone.textContent = String(done);
  if (statTotal) statTotal.textContent = String(TOTAL);
  if (statPct) statPct.textContent = `${pct}%`;

  const hintLine = document.getElementById('hintLine');
  if (hintLine) {
    hintLine.textContent = done >= TOTAL
      ? "Completado al 100% ✅"
      : `Vas por la lección ${done} de ${TOTAL}`;
  }

  // Pintar progreso en grid
  const grid = document.getElementById('progresoGrid');
  if (!grid) return;

  grid.innerHTML = "";
  for (let i = 1; i <= done; i++) {
    const item = document.createElement('div');
    item.className = 'leccion';
    item.innerHTML = `
      <div class="txt">
        <strong>Lección ${i}</strong>
        <span>Completada</span>
      </div>
      <div class="badge">✓</div>
    `;
    grid.appendChild(item);
  }

  // Certificado (cuando termina TODO)
  const certArea = document.getElementById('certArea');
  if (certArea) {
    certArea.hidden = !(done >= TOTAL);
  }

  // Mini avatar (opcional: primera letra del nombre)
  const mini = document.getElementById('miniAvatar');
  if (mini) {
    const first = (username.trim()[0] || "🙂").toUpperCase();
    mini.textContent = first;
  }
});
