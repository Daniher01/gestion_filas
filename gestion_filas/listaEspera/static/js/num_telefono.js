function agregarNumero(numero) {
    let rutInput = document.getElementById('numero_telefono');
    rutInput.value += numero;
}

function borrarNumero() {
    let rutInput = document.getElementById('numero_telefono');
    rutInput.value = rutInput.value.slice(0, -1);
}