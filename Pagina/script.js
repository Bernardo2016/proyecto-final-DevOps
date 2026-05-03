// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.color-slider');
    
    sliders.forEach(slider => {
        updateSliderColor(slider);
        slider.addEventListener('input', function() {
            updateSliderColor(this);
        });
    });
});

function navTo(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
    window.scrollTo(0, 0);
}

// Analiza las respuestas del formulario para determinar un género musical
function determineGenre(answers) {
    const energy = answers.q2; // Nivel de energía (1-5)
    const mood = answers.q4;   // Triste(1) a Motivadora(5)
    const stress = answers.q5; // Nada(1) a Muchísimo(5)

    if (energy >= 4 && mood >= 4) {
        return "Pop"; 
    } else if (energy >= 4 && stress >= 4) {
        return "Hard Rock"; 
    } else if (energy <= 2 && mood <= 2) {
        return "Soul"; 
    } else if (mood === 3 && energy === 3) {
        return "Alternative Rock"; 
    } else if (stress <= 2 && mood >= 4) {
        return "Funk"; 
    } else {
        return "Rock"; 
    }
}

// Nueva función que se conecta a tu API de AWS
async function obtenerCancionesDesdeAWS(generoSeleccionado) {
    const apiUrl = `https://z9clq8ou4f.execute-api.us-east-1.amazonaws.com/canciones?genero=${generoSeleccionado}`;
    
    try {
        const respuesta = await fetch(apiUrl);
        const datos = await respuesta.json();
        return datos.canciones || []; 
    } catch (error) {
        console.error("Error al conectar con DynamoDB:", error);
        return [];
    }
}

// Genera la playlist haciendo la petición real a AWS
async function generatePlaylist() {
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = 'Conectando con AWS...';
    btn.style.opacity = '0.7';
    
    // 1. Recopilar valores de los sliders
    const answers = {
        q2: parseInt(document.getElementById('q2').value),
        q4: parseInt(document.getElementById('q4').value),
        q5: parseInt(document.getElementById('q5').value)
    };

    // 2. Determinar el género basado en las emociones
    const targetGenre = determineGenre(answers);
    console.log(`Género seleccionado por el algoritmo: ${targetGenre}`);

    // Mostrar pantalla de carga
    navTo('view-loading');
    
    // 3. LLAMADA REAL A AWS API GATEWAY
    const playlist = await obtenerCancionesDesdeAWS(targetGenre);
    
    console.log("Playlist recibida de AWS:", playlist);

    // Restaurar el botón
    btn.innerHTML = 'Generar TuRitmo';
    btn.style.opacity = '1';
    
    // Actualizar el DOM con la cantidad real de canciones que devolvió la base de datos
    const trackInfoElement = document.querySelector('.track-info p');
    if (trackInfoElement) {
        trackInfoElement.innerText = `${playlist.length} canciones de ${targetGenre} • Personalizada`;
    }
    
    // Navegar al resultado
    setTimeout(() => {
        navTo('view-result');
    }, 1000); 
}

function updateSliderColor(slider) {
    const val = parseInt(slider.value);
    let gradient = '';

    switch(val) {
        case 1:
            gradient = 'linear-gradient(to right, #00c6ff, #0072ff)'; 
            break;
        case 2:
            gradient = 'linear-gradient(to right, #11998e, #38ef7d)'; 
            break;
        case 3:
            gradient = 'linear-gradient(to right, #f2c94c, #f2994a)'; 
            break;
        case 4:
            gradient = 'linear-gradient(to right, #ff0844, #ffb199)'; 
            break;
        case 5:
            gradient = 'linear-gradient(to right, #f12711, #f5af19)'; 
            break;
    }
    
    slider.style.background = gradient;
}
