const num_identificador = document.getElementById('num_identificador');

function agregarNumero(numero) {
    let telInput = num_identificador;
    telInput.value += numero;
    
}

function borrarNumero() {
    let telInput = num_identificador;
    telInput.value = telInput.value.slice(0, -1);
}

num_identificador.addEventListener('input', function () {
    var rutInput = this.value.replace(/[^0-9kK]/g, '');

    if (rutInput.length > 1) {
      var rutFormateado = formatearRut(rutInput);
      this.value = rutFormateado;
      validarRut(rutInput);
    }else{
        document.getElementById('msgerror').innerText = ''; // todo revisar
    }
  });

  function formatearRut(rut) {
    var rutSinFormato = rut.replace(/\./g, '').replace('-', '');
    var rutFormateado = '';
    var contador = 0;

    for (var i = rutSinFormato.length - 1; i >= 0; i--) {
        if (contador === 1 && i === rutSinFormato.length - 2) {
            rutFormateado = '-' + rutFormateado;
            contador = 0;
        } else if (contador === 3) {
            rutFormateado = '.' + rutFormateado;
            contador = 0;
        }
        rutFormateado = rutSinFormato.charAt(i) + rutFormateado;
        contador++;
    }

    return rutFormateado;
}

function validarRut(rut) {
    var rutSinFormato = rut.replace(/[.-]/g, '');
    var dv = rutSinFormato.slice(-1).toUpperCase();
    var rutNumerico = parseInt(rutSinFormato.slice(0, -1), 10);

    var suma = 0;
    var multiplicador = 2;

    while (rutNumerico > 0) {
      suma += (rutNumerico % 10) * multiplicador;
      rutNumerico = Math.floor(rutNumerico / 10);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    var resto = suma % 11;
    var digitoVerificadorCalculado = 11 - resto;

    if (digitoVerificadorCalculado === 11) {
      digitoVerificadorCalculado = '0';
    } else if (digitoVerificadorCalculado === 10) {
      digitoVerificadorCalculado = 'K';
    } else {
      digitoVerificadorCalculado = digitoVerificadorCalculado.toString();
    }

    if (dv !== digitoVerificadorCalculado) {
      document.getElementById('msgerror').innerText = 'RUT Inválido';
    } else {
      document.getElementById('msgerror').innerText = '';
    }
}