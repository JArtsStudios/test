const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const overlay = document.getElementById('overlay');

// Lista de resultados: nombre y ruta
const items = [
  { name: "inicio", url: "../" },
  { name: "Ministerio", url: "../Ministerio" },
  { name: "Multimedia", url: "../multimedia" },
  { name: "Escuela", url: "../escuela" },
  { name: "Oraciones", url: "../oraciones" },
  { name: "Eventos", url: "../eventos" },
  { name: "Social", url: "../social" }
];

let selectedIndex = -1;

function renderResults(query) {
  searchResults.innerHTML = '';
  selectedIndex = -1;

  if(query === '') {
    searchResults.style.display = 'none';
    overlay.style.display = 'none';
    return;
  }

  const filtered = items.filter(item => item.name.toLowerCase().includes(query));

  filtered.forEach((item, index) => {
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.name;
    a.classList.add('search-item');

    a.addEventListener('mouseenter', () => selectItem(index));
    a.addEventListener('mouseleave', () => {
      a.classList.remove('active');
      selectedIndex = -1;
    });

    searchResults.appendChild(a);
  });

  searchResults.style.display = filtered.length > 0 ? 'flex' : 'none';
  overlay.style.display = filtered.length > 0 ? 'block' : 'none';
}

function selectItem(index) {
  const results = searchResults.querySelectorAll('.search-item');
  results.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  selectedIndex = index;
}

searchInput.addEventListener('input', () => {
  renderResults(searchInput.value.toLowerCase());
});

searchInput.addEventListener('keydown', (e) => {
  const results = searchResults.querySelectorAll('.search-item');
  if(results.length === 0) return;

  if(e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % results.length;
    selectItem(selectedIndex);
  } else if(e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + results.length) % results.length;
    selectItem(selectedIndex);
  } else if(e.key === 'Enter') {
    e.preventDefault();
    if(selectedIndex >= 0 && selectedIndex < results.length) {
      window.location.href = results[selectedIndex].href;
    }
  }
});

// Cerrar resultados al click en overlay
overlay.addEventListener('click', () => {
  searchResults.style.display = 'none';
  overlay.style.display = 'none';
  searchInput.value = '';
});
