let tiempoDeInactividad = 60000; // Tiempo de inactividad permitido (en milisegundos)
let temporizador;

// Detectar cualquier actividad del usuario
window.onload = window.onmousemove = window.onmousedown = window.ontouchstart = window.onclick = window.onscroll = window.onkeypress = reiniciarTemporizador;

function redireccionar() {
    window.location.href = `${window.location.origin}/pacientes/`; // Reemplaza con tu URL
}

function reiniciarTemporizador() {
    clearTimeout(temporizador);
    temporizador = setTimeout(redireccionar, tiempoDeInactividad);
}