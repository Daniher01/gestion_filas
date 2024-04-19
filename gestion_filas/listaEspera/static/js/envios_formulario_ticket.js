const url_main_pacientes = `${window.location.origin}/pacientes/`


$("#formLista_espera").submit(function (event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener valores de campos específicos
    let numero_identificador = $("#num_identificador").val();

    // Verificar si el valor es nulo o vacío
    if ((numero_identificador === null || $.trim(numero_identificador) === '')) {
        // El valor es nulo o vacío
        Swal.fire({
            title: 'Rut Inválido!',
            text: 'Asegurate de ingresar un rut correcto!',
            icon: 'warning',
            confirmButtonText: 'Volver'
        });
    } else {
        // Construir el objeto de datos
        let formData = {
            numero_identificador: numero_identificador,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        };
        let method = $(this).attr("method");
        let action = $(this).attr("action");
        
        enviar_formulario(method, action, formData)
    }
    
});

$("#formLista_espera_sin_rut").submit(function (event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener valores de campos específicos
    let numero_identificador = $("#num_identificador").val();

    // Construir el objeto de datos
    let formData = {
        numero_identificador: numero_identificador,
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    };
    let method = $(this).attr("method");
    let action = $(this).attr("action");
    
    enviar_formulario(method, action, formData)

    
});

let enviar_formulario = (method, action, formData) => {

        // Realiza la solicitud AJAX
        $.ajax({
            type: method,
            url: action,
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
                                    let textoSegundos = (segundos === 1) ? 'segundo' : 'segundos';
                                    footerText.innerHTML = `<i class="fa-regular fa-clock"></i><b> ${segundos} ${textoSegundos}</b> para volver al inicio`
                                }, 100)
                              },
                              willClose: () => {
                                clearInterval(timerInterval)
                                window.location.href = url_main_pacientes
                              }

                              
                        });
                        // avisar que se actualiza un paciente
                        chatSocket.send(JSON.stringify({
                            message_type:'updateTabla',
                            message: 'Se crea un paciente'
                        }))
                        
                    }
                  });
            }else{
                Swal.fire({
                    title: `¡Lo Siento!`,
                    html: 'Parece que ya tienes un ticket de espera con este Rut',
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
                        window.location.href = url_main_pacientes
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
                        window.location.href = url_main_pacientes
                    }
                });
            }
        });

}
