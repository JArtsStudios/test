document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards-header');
    let timeout;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Evita que el navegador colapse si el usuario mueve el mouse muy rápido
            clearTimeout(timeout);
            
            timeout = setTimeout(() => {
                // Eliminar clase active de todas
                cards.forEach(c => c.classList.remove('active'));
                // Añadir a la actual
                card.classList.add('active');
            }, 30); // 30ms de espera es imperceptible pero ayuda al CPU
        });
    });
});









//------------------------  Horario ----------------------


document.addEventListener('DOMContentLoaded', () => {
    const timeElements = document.querySelectorAll('.local-time');

    // Mapeo de días de la semana: ¡CRUCIAL para evitar 'Invalid Date'!
    const dayMap = {
        'domingo': 0, 'lunes': 1, 'martes': 2, 'miercoles': 3, 
        'jueves': 4, 'viernes': 5, 'sabado': 6
    };

    // Opciones de formato (solo hora y zona)
    const options = {
        // En este diseño, omitiremos 'weekday' ya que el día está en el encabezado
        // Si quieres el día en la hora local: weekday: 'long', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZoneName: 'short', 
    };

    // Duración estimada del servicio en milisegundos (1.5 horas = 5,400,000 ms)
    const DURACION_SERVICIO_MS = 1.5 * 60 * 60 * 1000; 
    const now = new Date(); // Hora actual del usuario
    const userLanguage = navigator.language || 'es-ES';

    timeElements.forEach(element => {
        // 1. OBTENER DATOS SIMPLIFICADOS DEL HTML
        const utcTimeString = element.getAttribute('data-time-utc'); 
        
        // Normalizamos el día: minúsculas y sin acentos para la búsqueda en el mapa
        let serviceDayName = element.getAttribute('data-day');
        serviceDayName = serviceDayName.toLowerCase().trim().replace(/é/g, 'e'); 

        if (!utcTimeString || !(serviceDayName in dayMap)) {
            element.textContent = "Error: UTC Inválido";
            return;
        }

        const targetDay = dayMap[serviceDayName]; 
        const currentDay = now.getUTCDay(); // Día actual en UTC (0=Dom, 6=Sáb)

        // 2. CALCULAR LA PRÓXIMA FECHA VÁLIDA (Manejo de DST)
        let diff = targetDay - currentDay;
        
        // Si el día objetivo ya pasó esta semana (en UTC), usa el de la próxima semana
        if (diff < 0) {
            diff += 7;
        }

        const referenceDate = new Date(now.getTime());
        referenceDate.setUTCDate(now.getUTCDate() + diff); 

        // 3. CONSTRUIR LA CADENA UTC COMPLETA
        const year = referenceDate.getUTCFullYear();
        const month = String(referenceDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(referenceDate.getUTCDate()).padStart(2, '0');
        const fullUtcDateString = `${year}-${month}-${day}T${utcTimeString}`;

        // 4. CONVERSIÓN DE ZONA HORARIA
        const dateUTC = new Date(fullUtcDateString); 
        
        if (isNaN(dateUTC.getTime())) {
            element.textContent = "Error de Conversión";
            return;
        }

        const localTimeString = dateUTC.toLocaleString(userLanguage, options);
        element.textContent = localTimeString;


        // 5. RESALTADO DEL SERVICIO ACTUAL
        const startTimeMs = dateUTC.getTime(); 
        const endTimeMs = startTimeMs + DURACION_SERVICIO_MS;
        const nowLocalTimeMs = new Date().getTime(); 
        
        // Si la hora actual del usuario está DENTRO del período del servicio
        if (nowLocalTimeMs >= startTimeMs && nowLocalTimeMs < endTimeMs) {
            const item = element.closest('.service-item'); // Busca el padre .service-item
            if (item) {
                item.classList.add('servicio-actual');
            }
        }
    });
});











document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cards-header');
  if (!cards.length) return;

  let timeout;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      }, 30);
    });

    // Extra útil: en tablet/touch (por si no hay hover)
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
});


















