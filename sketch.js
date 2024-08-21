let canvas;
let blinkCircleIndex = 8;
let blinkState = false;
let cols = 6;  // Número de columnas
let rows = 3;  // Número de filas
let circleSize = 220; // Tamaño inicial del círculo (ajustar si es necesario)
let margin = 10; // Margen entre los círculos
let isRepeticion = false; // Bandera para saber si estamos en la pantalla de Repetición
let isHiperbole = false; // Bandera para saber si estamos en la pantalla de Hipérbole
let isAcumulacion = false; // Bandera para saber si estamos en la pantalla de Acumulación
let isElipsis = false; // Bandera para saber si estamos en la pantalla de Elipsis
let isMetafora = false; // Bandera para saber si estamos en la pantalla de Metáfora
let isMetonimia = false; // Activa la pantalla de Metonimia
let blinkInterval; // Almacena el intervalo de parpadeo
let maxCircleSize = 600; // Tamaño máximo del círculo en Hipérbole (puedes eliminar o ajustar este valor)
let growthRate = 5; // Tasa de crecimiento de los círculos (ajustar para crecimiento más rápido)
let growingSize; // Tamaño actual del círculo en crecimiento
let angleOffset = 0; // Desfase del ángulo para los círculos giratorios
let numCircles = 10; // Número de círculos giratorios
let radius = 150; // Radio de la trayectoria de los círculos giratorios
let angleSpeed = 0.02; // Velocidad de rotación de los círculos giratorios
let angles = []; // Array para almacenar los ángulos de los círculos giratorios
let centerCircleSize = 220; // Tamaño del círculo grande en Acumulación
let movingCircles = []; // Array para almacenar los círculos adicionales
let numMovingCircles = 8; // Número de pares de círculos adicionales
let maxCircles = 700; // Máximo número de círculos permitidos
let circlesAdded = 0; // Contador de círculos añadidos por colisiones
let surroundingCircles = []; // Array para los círculos alrededor del círculo central
let numSurroundingCircles = 12; // Número de círculos alrededor del círculo central
let surroundingRadius = 300; // Radio de la trayectoria de los círculos alrededor del círculo central
let isSplitting = false;
let splitProgress = 0;
let splitOffset = 0;
let splitComplete = false;


function setupRepeticion() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
  
    growingSize = circleSize; // Inicializa el tamaño de crecimiento con el tamaño de los círculos en Repetición
    blinkState = false;
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }
    isRepeticion = true; // Establece la bandera a true para la pantalla de Repetición
    isHiperbole = false; // Asegúrate de que la pantalla de Hipérbole esté desactivada
    isAcumulacion = false; // Asegúrate de que la pantalla de Acumulación esté desactivada
    isElipsis = false; // Asegúrate de que la pantalla de Elipsis esté desactivada
    isMetafora = false; // Bandera para saber si estamos en la pantalla de Metáfora
    isMetonimia = false; 

    loop(); // Asegúrate de que el bucle de dibujo esté activo
}

function setupHiperbole() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    growingSize = circleSize; // Inicializa el tamaño de crecimiento con el tamaño de los círculos en Repetición
    isRepeticion = false; // Asegúrate de que la pantalla de Repetición esté desactivada
    isHiperbole = true; // Activa la pantalla de Hipérbole
    isAcumulacion = false; // Asegúrate de que la pantalla de Acumulación esté desactivada
    isElipsis = false; // Asegúrate de que la pantalla de Elipsis esté desactivada
    isMetafora = false; // Bandera para saber si estamos en la pantalla de Metáfora
    isMetonimia = false;

    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }
    loop(); // Asegúrate de que el bucle de dibujo esté activo

    // Inicializa los círculos en posiciones aleatorias
    surroundingCircles = [];
    for (let i = 0; i < numSurroundingCircles; i++) {
        let x = random(circleSize, width - circleSize);
        let y = random(circleSize, height - circleSize);
        surroundingCircles.push({ x: x, y: y });
    }
}


function setupAcumulacion() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    
    // Configura el parpadeo
    blinkState = false;
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }
    
    isRepeticion = false; 
    isHiperbole = false; 
    isAcumulacion = true; 
    isElipsis = false; // Asegúrate de que la pantalla de Elipsis esté desactivada
    isMetafora = false; // Bandera para saber si estamos en la pantalla de Metáfora
    isMetonimia = false; 

    movingCircles = []; // Vacía el array de círculos en movimiento
    circlesAdded = 0; // Resetea el contador de círculos añadidos

    // Inicializa los círculos en movimiento
    for (let i = 0; i < numMovingCircles; i++) {
        movingCircles.push(createMovingCircle());
    }

    loop(); // Asegúrate de que el bucle de dibujo esté activo
}

function setupElipsis() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
 

    // Inicializa el tamaño de crecimiento con el tamaño de los círculos en Repetición
    growingSize = circleSize;
    blinkState = false;
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }
    isRepeticion = true; // Activa la pantalla de Elipsis
    isHiperbole = false; // Asegúrate de que la pantalla de Hipérbole esté desactivada
    isAcumulacion = false; // Asegúrate de que la pantalla de Acumulación esté desactivada
    isElipsis = true; // Activa la pantalla de Elipsis
    isMetafora = false; // Bandera para saber si estamos en la pantalla de Metáfora
    isMetonimia = false; 
    loop(); // Asegúrate de que el bucle de dibujo esté activo
}

function setupMetafora() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Configura el parpadeo
    blinkState = false;
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }

    // Reinicia las variables de la mitosis
    isSplitting = false;
    splitProgress = 0;
    splitOffset = 0;
    splitComplete = false;

    isRepeticion = false; 
    isHiperbole = false; 
    isAcumulacion = false; 
    isElipsis = false; 
    isMetafora = true; // Activa la pantalla de Metáfora
    isMetonimia = false;

    loop(); // Asegúrate de que el bucle de dibujo esté activo
}

function setupMetonimia() {
    if (canvas) {
        canvas.remove();
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Configura el parpadeo
    blinkState = false;
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleBlink, 500); // Configura el parpadeo
    }

    isRepeticion = false;
    isHiperbole = false;
    isAcumulacion = false;
    isElipsis = false;
    isMetafora = false;
    isMetonimia = true; // Activa la pantalla de Metonimia

    loop(); // Asegúrate de que el bucle de dibujo esté activo
}

function draw() {
    clear();

    if (isRepeticion || isElipsis) {
        background(240); // Color de fondo
        drawCircles();
        
    } else if (isHiperbole) {
        background(240); // Color de fondo
        drawGrowingCircle();
        
    } else if (isAcumulacion) {
        background(240); // Color de fondo
        drawAcumulacion();
        
    } else if (isMetafora) {
        background(240); // Color de fondo
        drawMetafora();
        
    } else if (isMetonimia) {
        background(240); // Color de fondo
        drawMetonimia(); // Dibuja el círculo grande y el pequeño parpadeante
    }
}

function drawCircles() {
    // Calcula las posiciones de los círculos con un margen
    let startX = (width - (cols * (circleSize + margin) - margin)) / 2;
    let startY = (height - (rows * (circleSize + margin) - margin)) / 2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let index = row * cols + col;
            let x = startX + col * (circleSize + margin) + circleSize / 2;
            let y = startY + row * (circleSize + margin) + circleSize / 2;

            // Dibuja el círculo exterior
            fill(255);
            stroke(0);
            strokeWeight(2);
            ellipse(x, y, circleSize, circleSize);

            // Dibuja el círculo interior que parpadea
            let innerSize = circleSize / 2;
            fill(index === blinkCircleIndex && blinkState ? 0 : 255);
            ellipse(x, y, innerSize, innerSize);

            // Dibuja el rectángulo negro solo en la pantalla de Elipsis
            if (isElipsis && index === blinkCircleIndex) {
                fill(240); // Color negro para el rectángulo
                noStroke();
                
                // Calcula las coordenadas y tamaño del rectángulo negro
                let rectSize = circleSize+2; // Tamaño del rectángulo igual al tamaño del círculo exterior
                let rectX = x - rectSize / 2; // Coordenada x del rectángulo
                let rectY = y - rectSize / 2; // Coordenada y del rectángulo

                rect(rectX, rectY, rectSize/2, rectSize); // Dibuja el rectángulo negro
            }
        }
    }
}

function drawGrowingCircle() {
    let centerX = width / 2;
    let centerY = height / 2;

    // Dibuja el círculo exterior en crecimiento
    fill(255);
    stroke(0);
    strokeWeight(2);
    ellipse(centerX, centerY, growingSize, growingSize);

    // Dibuja el círculo interior en crecimiento, aplicando el parpadeo solo al círculo central
    let innerSize = growingSize / 2;
    fill(blinkState ? 0 : 255); // Aplicar el parpadeo solo al círculo central
    ellipse(centerX, centerY, innerSize, innerSize);

    // Incrementa el tamaño del círculo
    growingSize += growthRate;

    // Dibuja y mueve los círculos adicionales alrededor del círculo central
    for (let i = 0; i < surroundingCircles.length; i++) {
        let circle = surroundingCircles[i];
        
        // Dibuja el círculo exterior adicional
        fill(255);
        stroke(0);
        strokeWeight(2);
        ellipse(circle.x, circle.y, circleSize / 2, circleSize / 2);

        // Dibuja el círculo interior adicional (no afecta por el parpadeo)
        fill(255); // Mantén el color blanco constante para los círculos adicionales
        ellipse(circle.x, circle.y, circleSize / 4, circleSize / 4);

        // Detecta colisiones con el círculo central y mueve los círculos adicionales
        let distToCenter = dist(circle.x, circle.y, centerX, centerY);
        if (distToCenter < growingSize / 2 + circleSize / 4) {
            // Calcula la dirección hacia el centro y mueve el círculo adicional
            let angleToCenter = atan2(centerY - circle.y, centerX - circle.x);
            circle.x -= cos(angleToCenter) * growthRate;
            circle.y -= sin(angleToCenter) * growthRate;
        }
    }
}


function createCircle(x, y) {
    return {
        x: x,
        y: y,
        dx: random(-3, 3),  // Velocidad en x
        dy: random(-3, 3),  // Velocidad en y
        size: circleSize   // Tamaño del círculo
    };
}

function createMovingCircle() {
    // Crea un círculo en una posición aleatoria fuera de la pantalla
    let startX = random(-100, width + 100);
    let startY = random(-100, height + 100);
    let speedX = random(-3, 3);
    let speedY = random(-3, 3);
    let size = 100; // Tamaño del círculo en movimiento
    return { x: startX, y: startY, speedX: speedX, speedY: speedY, size: size };
}

function drawAcumulacion() {
    let centerX = width / 2;
    let centerY = height / 2;

    // Dibuja el círculo grande en el centro
    fill(255);
    stroke(0);
    strokeWeight(2);
    ellipse(centerX, centerY, centerCircleSize, centerCircleSize);

    // Dibuja el círculo interior en el centro
    let innerSize = centerCircleSize / 2;
    fill(blinkState ? 0 : 255);
    ellipse(centerX, centerY, innerSize, innerSize);

    // Dibuja y mueve los círculos adicionales
    for (let i = 0; i < movingCircles.length; i++) {
        let circle = movingCircles[i];

        // Mueve el círculo
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Colisiones con los bordes de la pantalla
        if (circle.x - circle.size / 2 < 0 || circle.x + circle.size / 2 > width) {
            circle.speedX *= -1;
        }
        if (circle.y - circle.size / 2 < 0 || circle.y + circle.size / 2 > height) {
            circle.speedY *= -1;
        }

        // Dibuja el círculo
        fill(255);       // Relleno blanco
        stroke(0);       // Borde negro
        strokeWeight(2); // Grosor del borde
        ellipse(circle.x, circle.y, circle.size, circle.size);

        // Dibuja el círculo interior
        let innerCircleSize = circle.size / 2;
        fill(255);  // Color fijo para el círculo interior
        ellipse(circle.x, circle.y, innerCircleSize, innerCircleSize);

        // Detecta colisiones con el círculo central
        let distToCenter = dist(circle.x, circle.y, centerX, centerY);
        if (distToCenter < centerCircleSize / 2 + circle.size / 2) {
            // Multiplica el tamaño del círculo adicional por 2
            circle.size *= 2;

            // Asegúrate de que el círculo no se haga demasiado grande
            if (circle.size > 100) {
                circle.size = 100;
            }

            // Añade 4 nuevos círculos si el límite no ha sido alcanzado
            if (movingCircles.length + 4 <= maxCircles) {
                for (let j = 0; j < 4; j++) {
                    movingCircles.push(createMovingCircle());
                }
            }

            // Rebote en el círculo central
            let angle = atan2(circle.y - centerY, circle.x - centerX);
            circle.speedX = cos(angle) * 5;  // Ajusta la velocidad de rebote
            circle.speedY = sin(angle) * 5;

            // Asegúrate de que el círculo se aleje del centro lo suficiente
            circle.x += circle.speedX * 2;
            circle.y += circle.speedY * 2;

            // Evita la acumulación continua
            if (circlesAdded > maxCircles) {
                movingCircles.splice(0, 1); // Elimina el primer círculo de la lista
            }
            circlesAdded++;
        }
    }
}


function toggleBlink() {
    blinkState = !blinkState;
}


function drawMetafora() {
    let centerX = width / 2;
    let centerY = height / 2;

    fill(255);
    stroke(0);
    strokeWeight(2);

    if (isSplitting) {
        // Incrementa el progreso de la división
        splitProgress += 0.02;
        if (splitProgress > 1) {
            splitProgress = 1;
            splitComplete = true; // Marca la división como completa
        }

        // Calcula la separación de los círculos en función del progreso de la división
        let stretch = lerp(0, circleSize, splitProgress);
        splitOffset = (circleSize / 2) * splitProgress;

        if (splitComplete) {
            ellipse(centerX - splitOffset, centerY, circleSize, circleSize);
            ellipse(centerX + splitOffset, centerY, circleSize, circleSize);

            // Dibuja los círculos pequeños que parpadean en los círculos grandes resultantes
            fill(blinkState ? 0 : 255);
            ellipse(centerX - splitOffset, centerY, circleSize / 2, circleSize / 2);
            ellipse(centerX + splitOffset, centerY, circleSize / 2, circleSize / 2);
        } else {
            ellipse(centerX, centerY, circleSize + stretch, circleSize);

            // Dibuja los círculos pequeños en el círculo estirado
            fill(blinkState ? 0 : 255);
            ellipse(centerX - splitOffset, centerY, circleSize / 2, circleSize / 2);
            ellipse(centerX + splitOffset, centerY, circleSize / 2, circleSize / 2);
        }
    } else {
        ellipse(centerX, centerY, circleSize, circleSize);
        fill(blinkState ? 0 : 255);
        ellipse(centerX, centerY, circleSize / 2, circleSize / 2);
    }

    // Inicia la división del círculo después de un tiempo
    if (!isSplitting && frameCount > 100) {
        isSplitting = true;
    }

    // No detener el bucle, para que el parpadeo siga ocurriendo
    // Si deseas reiniciar la animación o seguir en un estado específico, ajusta aquí.
}

function drawMetonimia() {
    let centerX = width / 2;
    let centerY = height / 2;

    // Dibuja el rectángulo negro detrás del primer círculo
    fill(0); // Color negro
    noStroke();
    let rectSize = circleSize * 2 - 5; // Tamaño del rectángulo
    rect(centerX - rectSize / 2, centerY - rectSize / 2, rectSize, rectSize);

    // Dibuja el círculo grande
    fill(240); // Color blanco
    
    strokeWeight(2);
    ellipse(centerX, centerY, circleSize * 2, circleSize * 2);

    // Dibuja el círculo pequeño que parpadea en el centro
    let innerSize = circleSize / 2;
    fill(blinkState ? 0 : 255); // Parpadeo: negro cuando blinkState es true, blanco cuando es false
    ellipse(centerX, centerY, innerSize * 2, innerSize * 2);

    // Dibuja el rectángulo horizontal fino en el centro del círculo pequeño
    fill(240); // Mismo color que el círculo pequeño
    noStroke();
    let rectWidth = innerSize * 2 + 2; // Ancho del rectángulo horizontal (ajusta según necesites)
    let rectHeight = innerSize / 4; // Altura del rectángulo horizontal (ajusta según necesites)
    rect(centerX - rectWidth / 2, centerY - rectHeight / 2, rectWidth, rectHeight);

    // Dibuja el rectángulo vertical fino en el centro del círculo pequeño
    fill(240); // Mismo color que el círculo pequeño
    noStroke();
    let rectWidthVertical = innerSize / 4; // Ancho del rectángulo vertical (ajusta según necesites)
    let rectHeightVertical = innerSize * 2 + 2; // Altura del rectángulo vertical (ajusta según necesites)
    rect(centerX - rectWidthVertical / 2, centerY - rectHeightVertical / 2, rectWidthVertical, rectHeightVertical);
}




function keyPressed() {
    if (key === '1') {
        setupRepeticion();
    } else if (key === '2') {
        setupHiperbole();
    } else if (key === '3') {
        setupAcumulacion();
    } else if (key === '4') {
        setupElipsis();
    } else if (key === '5') {
        setupMetafora();
    } else if (key === '6') {
        setupMetonimia(); // Añade esta línea para activar Metonimia
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
