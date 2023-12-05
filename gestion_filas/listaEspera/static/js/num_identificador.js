const num_identificador = document.getElementById('num_identificador');
const btn_solicitar = document.getElementById('btn_solicitar')

function agregarNumero(numero) {
    let telInput = num_identificador;
    telInput.value += numero;
    cambiar_numero_rut()
    
}

function borrarNumero() {
    let telInput = num_identificador;
    telInput.value = telInput.value.slice(0, -1);
    cambiar_numero_rut()
}

function cambiar_numero_rut(){
    let rutInput = num_identificador.value.replace(/[^0-9kK]/g, '');

    if (rutInput.length >= 1) {
      let rutFormateado = formatearRut(rutInput);
      num_identificador.value = rutFormateado;
      validarRut(rutInput);
    } else {
      num_identificador.classList.remove('border-danger')
      btn_solicitar.disabled = false;
    }
}

  function formatearRut(rut) {
    let rutSinFormato = rut.replace(/\./g, '').replace('-', '');
    let rutFormateado = '';
    let contador = 0;

    for (let i = rutSinFormato.length - 1; i >= 0; i--) {
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
    let rutSinFormato = rut.replace(/[.-]/g, '');
    let dv = rutSinFormato.slice(-1).toUpperCase();
    let rutNumerico = parseInt(rutSinFormato.slice(0, -1), 10);

    let suma = 0;
    let multiplicador = 2;

    while (rutNumerico > 0) {
      suma += (rutNumerico % 10) * multiplicador;
      rutNumerico = Math.floor(rutNumerico / 10);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    let resto = suma % 11;
    let digitoVerificadorCalculado = 11 - resto;

    if (digitoVerificadorCalculado === 11) {
      digitoVerificadorCalculado = '0';
    } else if (digitoVerificadorCalculado === 10) {
      digitoVerificadorCalculado = 'K';
    } else {
      digitoVerificadorCalculado = digitoVerificadorCalculado.toString();
    }

    if (dv !== digitoVerificadorCalculado) {
      num_identificador.classList.add('border-danger')
      btn_solicitar.disabled = true;
    } else {
      num_identificador.classList.remove('border-danger')
      num_identificador.classList.add('border-success')
      btn_solicitar.disabled = false;
    }
}

