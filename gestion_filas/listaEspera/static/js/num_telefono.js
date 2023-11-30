function agregarNumero(numero) {
    let telInput = document.getElementById('numero_telefono');
    telInput.value += numero;
}

function borrarNumero() {
    let telInput = document.getElementById('numero_telefono');
    telInput.value = telInput.value.slice(0, -1);
}