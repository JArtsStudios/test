const eventos = [
  {
    id: 1,
    titulo: "Santa Cena",
    descripcion: "Conmemoración del sacrificio de Cristo mediante pan y vino sagrado.",
    fecha: "2026-03-01T17:00:00",
    img: "../img/santacena.avif"
  },
];

const grid = document.querySelector(".grid-eventos");

if (grid) {
  grid.innerHTML = "";

  eventos.forEach((ev, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-id", ev.id);

    const img = document.createElement("img");
    img.src = ev.img;
    img.alt = ev.titulo;
    img.loading = "lazy";
    img.style.cursor = "pointer";
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarImagenGrande(ev.img);
    });

    const contenido = document.createElement("div");
    contenido.className = "contenido";

    const h3 = document.createElement("h3");
    h3.textContent = ev.titulo;

    const p = document.createElement("p");
    p.textContent = ev.descripcion;

    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = formatearFechaBonita(ev.fecha);

    const contador = document.createElement("div");
    contador.className = "contador";

    contenido.appendChild(h3);
    contenido.appendChild(p);
    contenido.appendChild(fecha);
    contenido.appendChild(contador);

    card.appendChild(img);
    card.appendChild(contenido);
    grid.appendChild(card);

    // animación entrada
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 80 * index + 60);

    startCountdown(ev.fecha, contador);
  });
}

function startCountdown(fechaEvento, contenedor) {
  const target = new Date(fechaEvento).getTime();

  const interval = setInterval(() => {
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      clearInterval(interval);
      contenedor.innerHTML = "";

      const btn = document.createElement("button");
      btn.textContent = "Ir al Evento";
      btn.className = "contador-boton";
      btn.addEventListener("click", () => {
        window.location.href = "../multimedia/";
      });

      contenedor.appendChild(btn);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    contenedor.textContent = `Faltan ${days}d ${pad2(hours)}h ${pad2(minutes)}m ${pad2(seconds)}s`;
  }, 1000);
}

function mostrarImagenGrande(url) {
  const overlay = document.createElement("div");
  overlay.className = "imagen-overlay";

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Imagen del evento";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  });
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatearFechaBonita(isoString) {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;

  // Formato amigable según el navegador del usuario
  return d.toLocaleString("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
