function agregarNumero(numero) {
    var rutInput = document.getElementById('numero_telefono');
    rutInput.value += numero;
}

function borrarNumero() {
    var rutInput = document.getElementById('numero_telefono');
    rutInput.value = rutInput.value.slice(0, -1);
}