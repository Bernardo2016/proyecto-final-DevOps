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

function generatePlaylist() {
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = 'Conectando con tu ritmo...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        navTo('view-loading');
        btn.innerHTML = 'Generar TuRitmo';
        btn.style.opacity = '1';
        
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