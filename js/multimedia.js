const API_KEY = 'AIzaSyBn41Jf367kk---Opad_qq9jlMWuVbZAxE';
const CHANNEL_ID = 'UCcPSZMRTIGkpilPaxD0MdbQ';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ HAMBURGUESA ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navUl = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const navLinks = navUl.querySelectorAll('a'); // Todos los enlaces del menú

    function toggleMenu() {
        navUl.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    }

    function closeMenu() {
        navUl.classList.remove('active');
        menuOverlay.classList.remove('active');
    }

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if(menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    // -----------------------------------


    // Fetch Channel Banner
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const channel = data.items[0];
            const bannerImageUrl = channel.brandingSettings.image.bannerExternalUrl;
            // document.getElementById('channelHeader').style.backgroundImage = `url(${bannerImageUrl})`;
        });

    // Fetch Live Streams
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&eventType=live&type=video`)
        .then(response => response.json())
        .then(data => {
            const live = document.getElementById('live');
            if (data.items.length === 0) {
                const noLiveMessage = document.createElement('p');
                noLiveMessage.id = 'noLive';
                noLiveMessage.textContent = 'Actualmente no estamos transmitiendo en vivo.';
                live.appendChild(noLiveMessage);
            } else {
                data.items.forEach(item => {
                    createVideoElement(item, live);
                });
            }
        });

    // Fetch Past Streams
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=YOUR_PAST_STREAMS_PLAYLIST_ID&part=snippet&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const pastStreams = document.getElementById('pastStreams');
            if(data.items) {
                data.items.forEach(item => {
                    createVideoElement(item, pastStreams);
                });
            }
        });

    // Fetch Videos
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const videos = document.getElementById('videos');
            data.items.forEach(item => {
                createVideoElement(item, videos);
            });
        });

    // Fetch Podcasts
    fetch(``)
        .then(response => response.json())
        .then(data => {
            console.log("PODCASTS RESPONSE:", data);

            const podcasts = document.getElementById('podcasts');
            if (!podcasts) {
                console.error('No existe un contenedor con id="podcasts" en el HTML');
                return;
            }

            if (data.error) {
                const p = document.createElement('p');
                p.textContent = `Error API Podcasts: ${data.error.message}`;
                podcasts.appendChild(p);
                return;
            }

            if (!data.items || data.items.length === 0) {
                const p = document.createElement('p');
                p.textContent = 'No hay podcasts para mostrar (playlist vacía, privada o ID incorrecto).';
                podcasts.appendChild(p);
                return;
            }

            data.items.forEach(item => {
                createVideoElement(item, podcasts);
            });
        })
        .catch(err => {
            console.error("PODCASTS FETCH ERROR:", err);
            const podcasts = document.getElementById('podcasts');
            if (podcasts) {
                const p = document.createElement('p');
                p.textContent = 'Aun no hay podcast';
                podcasts.appendChild(p);
            }
        });
});

function createVideoElement(item, container) {
    const videoId = item.id.videoId || item.snippet.resourceId.videoId;
    const videoTitle = item.snippet.title;
    const videoThumbnail = item.snippet.thumbnails.high.url;
    const videoElement = document.createElement('div');
    videoElement.className = 'video';
    videoElement.innerHTML = `
        <img src="${videoThumbnail}" alt="${videoTitle}">
        <h3>${videoTitle}</h3>
        <p>${videoId}</p>
    `;
    videoElement.addEventListener('click', () => {
        localStorage.setItem('videoId', videoId);
        localStorage.setItem('videoTitle', videoTitle);
        localStorage.setItem('videoDescription', item.snippet.description);
        window.location.href = '../multimedia/reproductor/';
    });
    container.appendChild(videoElement);
}