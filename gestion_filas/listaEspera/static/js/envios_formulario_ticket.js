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
                // El valor es nulo o vacío
                console.log(response);
                Swal.fire({
                    title: `'adasd`,
                    text: 'Asegurate de ingresar un Número correcto!',
                    icon: 'success',
                    confirmButtonText: 'Volver'
                });
            },
            error: function(error) {
                // Maneja los errores aquí
                console.log(error);
            }
        });
    }
    
});
