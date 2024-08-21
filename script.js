function cambiarPantalla(num) {
    let pantallaPrincipal = document.getElementById('pantalla-principal');
    let pantallaSecundaria = document.getElementById('pantalla-secundaria');
    
    pantallaPrincipal.style.display = 'none';
    pantallaSecundaria.style.display = 'flex';

    // Limpia el contenedor del lienzo antes de configurar uno nuevo
    document.getElementById('sketch-holder').innerHTML = '';

    // Configura el contenido de la pantalla secundaria según el número
    switch(num) {
        case 1:
            setupRepeticion(); // Configura la pantalla de Repetición
            break;
        case 2:
            setupAcumulacion(); // Configura la pantalla de Acumulación
            break;
        case 3:
            setupElipsis(); // Configura la pantalla de Elípsis
            break;
        case 4:
            setupHiperbole(); // Configura la pantalla de Hipérbole
            break;
        case 5:
            setupMetafora(); // Configura la pantalla de Metáfora
            break;
        case 6:
            setupMetonimia(); // Configura la pantalla de Metonimia
            break;
    }
}

function volver() {
    let pantallaPrincipal = document.getElementById('pantalla-principal');
    let pantallaSecundaria = document.getElementById('pantalla-secundaria');
    
    pantallaPrincipal.style.display = 'flex';
    pantallaSecundaria.style.display = 'none';

    // Elimina el lienzo cuando se vuelve a la pantalla principal
    document.getElementById('sketch-holder').innerHTML = '';
}
