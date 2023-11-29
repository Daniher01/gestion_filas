function setBotonPresionado(valor) {
    document.getElementById('boton_presionado').value = valor;
}


$("#formLista_espera").submit(function (event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener el valor del campo oculto
    let botonPresionado = $("#boton_presionado").val();

    // Obtener valores de campos específicos
    let numeroTelefono = $("#numero_telefono").val();

    // Verificar si el valor es nulo o vacío
    if ((numeroTelefono === null || $.trim(numeroTelefono) === '') && botonPresionado === 'con_numero') {
        // El valor es nulo o vacío
        Swal.fire({
            title: 'Número Inválido!',
            text: 'Asegurate de ingresar un Número correcto!',
            icon: 'warning',
            confirmButtonText: 'Volver'
        });
    } else {
        // Construir el objeto de datos
        let formData = {
            numero_telefono: numeroTelefono,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        };


        // Realiza la solicitud AJAX
        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: formData,
            success: function(response) {
                
            console.log(response);

            if(response.ticket_espera !== null){
                Swal.fire({
                    title: `Tu número de atencion es: 
                    <strong>${response.ticket_espera.centro}${response.ticket_espera.numero_espera}</strong>`,
                    html: '¡Si ingresaste tu número telefónico, te llegará vía WhatsApp sino, te recomendamos <strong>Memorizarlo</strong>!',
                    icon: 'success',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    },
                    buttonsStyling: false,
                    allowOutsideClick: false
                }).then((result) => {
                    // Después de hacer clic en "Volver", recargar la página
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }else{
                Swal.fire({
                    title: `¡Lo Siento!`,
                    html: 'Parece que ya tienes un ticket de espera con este número telefónico',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    },
                    buttonsStyling: false,
                    allowOutsideClick: false
                }).then((result) => {
                    // Después de hacer clic en "Volver", recargar la página
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }

            },
            error: function(error) {
                // Maneja los errores aquí
                Swal.fire({
                    title: `¡Error!  ${error.status}`,
                    html: `${error.statusText}`,
                    icon: 'error',
                    confirmButtonText: 'Volver',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false,
                    allowOutsideClick: false
                }).then((result) => {
                    // Después de hacer clic en "Volver", recargar la página
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
        });
    }
    
});
