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

    // Lógica de mapeo de emociones a géneros basados en tu base de datos
    if (energy >= 4 && mood >= 4) {
        return "Pop"; // Canciones como "Uptown Funk" o "Crazy in Love"
    } else if (energy >= 4 && stress >= 4) {
        return "Hard Rock"; // Para liberar tensión, ej. AC/DC o Guns N' Roses
    } else if (energy <= 2 && mood <= 2) {
        return "Soul"; // Canciones melancólicas, ej. Amy Winehouse o Adele
    } else if (mood === 3 && energy === 3) {
        return "Alternative Rock"; // Punto medio, ej. Coldplay o Radiohead
    } else if (stress <= 2 && mood >= 4) {
        return "Funk"; // Relajado pero feliz
    } else {
        return "Rock"; // Género comodín (el más abundante en tu BD)
    }
}

// Genera la playlist haciendo una petición simulada al futuro backend de AWS
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

    setTimeout(async () => {
        navTo('view-loading');
        btn.innerHTML = 'Generar TuRitmo';
        btn.style.opacity = '1';
        
        // 3. AQUÍ IRÁ TU LLAMADA A AWS API GATEWAY
        // const response = await fetch(`https://tu-api-gateway.amazonaws.com/prod/playlist?genero=${targetGenre}`);
        // const data = await response.json();
        
        // --- SIMULACIÓN PARA TU AVANCE ---
        // Simulamos la respuesta de DynamoDB limitando a 10 canciones
        const mockSongs = [
            "Canción 1", "Canción 2", "Canción 3", "Canción 4", "Canción 5",
            "Canción 6", "Canción 7", "Canción 8", "Canción 9", "Canción 10"
        ];
        
        // Actualizar el DOM con el resultado
        document.querySelector('.track-info p').innerText = `10 canciones de ${targetGenre} • Personalizada`;
        
        setTimeout(() => {
            navTo('view-result');
        }, 3500);
    }, 800);
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
