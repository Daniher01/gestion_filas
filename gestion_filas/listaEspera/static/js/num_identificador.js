function agregarNumero(numero) {
    let telInput = document.getElementById('num_identificador');
    telInput.value += numero;
}

function borrarNumero() {
    let telInput = document.getElementById('num_identificador');
    telInput.value = telInput.value.slice(0, -1);
}