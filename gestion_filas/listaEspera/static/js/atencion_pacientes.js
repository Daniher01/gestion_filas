$(document).ready(function () {
    crear_tabla_datos()

});

const crear_tabla_datos = () => {

    const TBODY_LISTA = $('#tbodyListaEspera');

    $.ajax({
        url: `${window.location.origin}/obtener_listaEspera`,  // Reemplaza esto con la URL de tu API
        method: 'GET',
        dataType: 'JSON',
        success: function (response) {

            // Limpiar el contenido actual del tbody
            TBODY_LISTA.empty();

            // Iterar sobre los datos y construir filas de la tabla
            $.each(response.lista_espera, function (index, item) {

                // Crear un objeto Date
                let fechaHora = new Date(item.fecha_toma);

                let dia = `${fechaHora.getDate()}/${fechaHora.getMonth() + 1}/${fechaHora.getFullYear()}`;
                let hora = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}`;

                let row = `<tr>
                <th>${item.ticket}</th>
                <td>${hora}</td>
                <td>${dia}</td>
                <td>${item.paciente.numero_telefono}</td>
                </tr>`;

                // Agregar la fila al tbody
                TBODY_LISTA.append(row);
            });
        },
        error: function (error) {
            console.log(error);
                // Maneja los errores aquí
                Swal.fire({
                    title: `¡Error! ${error.status}`,
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