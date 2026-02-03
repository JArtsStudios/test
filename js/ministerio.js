// ===============================
// Parallax optimizado (suave + limpio)
// - requestAnimationFrame (mejor rendimiento)
// - cachea elementos
// - escalable por array
// - layer3 y layer4 se desvanecen SOLO en móvil (notorio)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
	// Cachear elementos
	const layer1 = document.getElementById('layer1');
	const layer2 = document.getElementById('layer2');
	const layer3 = document.getElementById('layer3');
	const layer4 = document.getElementById('layer4');

	// Si falta alguno, no rompe el sitio
	if (!layer1 || !layer2 || !layer3 || !layer4) return;

	// Detectar móvil (solo una vez)
	const isMobile = window.innerWidth < 768;

	// Restablecer opacidades al cargar
	layer1.style.opacity = 1;
	layer2.style.opacity = 1;
	layer3.style.opacity = 1;
	layer4.style.opacity = 1;

	// Configuración parallax
	const layers = [
		{ el: layer1, speed: 0.2 },
		{ el: layer2, speed: 0.4 },
		{ el: layer3, speed: 0.6 },
		{ el: layer4, speed: 0.8 },
	];

	const MAX_SCROLL = 2000;

	// Fade móvil (SOLO layer3 y layer4) - NOTORIO
	const MOBILE_FADE_START = 40;    // empieza casi inmediato
	const MOBILE_FADE_DISTANCE = 150; // desaparece rápido (notorio)

	let latestScroll = window.pageYOffset || 0;
	let ticking = false;

	function updateParallax(offset) {
		const limited = Math.min(Math.max(offset, 0), MAX_SCROLL);

		// Movimiento parallax (PC + móvil)
		for (const layer of layers) {
			layer.el.style.transform = `translateY(${limited * layer.speed}px)`;
		}

		// Fade SOLO en móvil para layer3 y layer4
		if (isMobile) {
			const fadeOffset = Math.max(0, limited - MOBILE_FADE_START);
			const opacity = Math.max(0, 1 - fadeOffset / MOBILE_FADE_DISTANCE);

			layer3.style.opacity = opacity;
			layer4.style.opacity = opacity;

			// (Opcional) cuando ya están casi invisibles, evita clicks "fantasma"
			const noClick = opacity <= 0.05;
			layer3.style.pointerEvents = noClick ? "none" : "auto";
			layer4.style.pointerEvents = noClick ? "none" : "auto";
		} else {
			// En PC siempre visibles
			layer3.style.opacity = 1;
			layer4.style.opacity = 1;
			layer3.style.pointerEvents = "auto";
			layer4.style.pointerEvents = "auto";
		}
	}

	// Primera ejecución
	updateParallax(latestScroll);

	// Scroll optimizado
	window.addEventListener(
		'scroll',
		() => {
			latestScroll = window.pageYOffset || 0;

			if (!ticking) {
				requestAnimationFrame(() => {
					updateParallax(latestScroll);
					ticking = false;
				});
				ticking = true;
			}
		},
		{ passive: true }
	);
});

function openNav() {
	document.getElementById("menu").style.width = "250px";
}

function closeNav() {
	document.getElementById("menu").style.width = "0";
}

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

const message = String.fromCharCode(116, 101, 32, 97, 109, 111);
console.log(message);
























const card = document.querySelector(".photo-card");
const modal = document.getElementById("photoModal");
const modalImg = modal.querySelector(".photo-modal-img");

card.addEventListener("click", () => {
  modalImg.src = card.dataset.full;
  modal.classList.add("active");
});

modal.addEventListener("click", () => {
  modal.classList.remove("active");
  modalImg.src = "";
});
