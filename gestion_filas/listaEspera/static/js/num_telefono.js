function agregarNumero(numero) {
    var rutInput = document.getElementById('rut_number');
    rutInput.value += numero;
}

function borrarNumero() {
    var rutInput = document.getElementById('rut_number');
    rutInput.value = rutInput.value.slice(0, -1);
}