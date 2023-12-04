function setBotonPresionado(valor) {
    document.getElementById('boton_presionado').value = valor;
}


$("#formLista_espera").submit(function (event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener el valor del campo oculto
    let botonPresionado = $("#boton_presionado").val();

    // Obtener valores de campos específicos
    let numero_identificador = $("#num_identificador").val();

    // Verificar si el valor es nulo o vacío
    if ((numero_identificador === null || $.trim(numero_identificador) === '') && botonPresionado === 'con_numero') {
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
            numero_identificador: numero_identificador,
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
                    title: 'Tu turno será mostrado en la pantalla',
                    html: `  <div class="alert alert-warning" role="alert">
                                <i class="fa-regular fa-circle-exclamation"></i>
                                <strong> No imprimimos papel </strong>
                            </div>`,
                    timer: 5000,  // Cierra el modal después de 5 segundos
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    iconHtml: '<i class="fa-solid fa-recycle fa-bounce" style="color: #1eb80a;"></i>',
                    customClass: {
                        icon: 'icono-personalizado'
                      },
                    didClose: () => {
                        Swal.fire({
                            html: 'Puedes <strong>Memorizarlo</strong> o tómale una foto <i class="fa-regular fa-camera fa-fade" style="color: #892a7d;"></i>',
                            iconHtml: `<h1 style="font-size: 1.5em;" >${response.ticket_espera.ticket}</h1>`,
                            footer: '<span class="alert alert-warning" id="footer-text"></span>',
                            customClass: {
                                icon: 'icono-personalizado'
                            },
                            showConfirmButton: false,
                            buttonsStyling: false,
                            allowOutsideClick: false,
                            timer: 20000,
                            timerProgressBar: true,
                            didOpen: () => {
                                const footerText = document.querySelector('#footer-text');

                                timerInterval = setInterval(() => {
                                    let segundos = Math.floor(Swal.getTimerLeft() / 1000)
                                    footerText.innerHTML = `<i class="fa-regular fa-clock"></i><b> ${segundos} segundos</b> para volver al inicio`
                                }, 100)
                              },
                              willClose: () => {
                                clearInterval(timerInterval)
                                location.reload();
                              }
                        });
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
