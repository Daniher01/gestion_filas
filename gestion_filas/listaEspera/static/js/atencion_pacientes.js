$(document).ready(function () {
    crear_tabla_datos()
    // todo crear alerta
    // todo recargar tabla cada segundo y medio
});

const crear_tabla_datos = () => {

    $.ajax({
        url: `${window.location.origin}/obtener_listaEspera`,  // Reemplaza esto con la URL de tu API
        method: 'GET',
        dataType: 'JSON',
        success: function (response) {

            const TBODY_LISTA = document.getElementById('tbodyListaEspera');

            // Limpiar el contenido actual del tbody
            TBODY_LISTA.innerHTML = '';

            // Iterar sobre los datos y construir filas de la tabla
            $.each(response.lista_espera, function (index, item) {

                // Crear un objeto Date
                let fechaHora = new Date(item.fecha_toma);

                let dia = `${fechaHora.getDate()}/${fechaHora.getMonth() + 1}/${fechaHora.getFullYear()}`;
                let hora = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}`;

                // Crear elementos HTML
                let trElement = document.createElement('tr');
                let thElement = document.createElement('th');
                let tdHoraElement = document.createElement('td');
                let tdDiaElement = document.createElement('td');
                let tdTelefonoElement = document.createElement('td');
                let tdBotonElement = document.createElement('td');
                let botonElement = document.createElement('button');

                // Asignar valores e atributos a los elementos
                thElement.textContent = item.ticket;
                tdHoraElement.textContent = hora;
                tdDiaElement.textContent = dia;
                tdTelefonoElement.textContent = item.paciente.numero_telefono;
                botonElement.textContent = 'Atender';
                botonElement.classList.add('btn');
                // Agregar atributos o clases si es necesario
                trElement.id = item.id;

                botonElement.onclick = function(){
                    enviar_form_atender(item.id)
                };

                if(index === 0){
                    trElement.classList.add('table-active');
                    botonElement.classList.add('btn-outline-tuimagen');
                }else{
                    botonElement.classList.add('btn-outline-dark');
                }

                // Agregar el botón al cuarto td
                tdBotonElement.appendChild(botonElement);

                // Agregar elementos al tr
                trElement.appendChild(thElement);
                trElement.appendChild(tdHoraElement);
                trElement.appendChild(tdDiaElement);
                trElement.appendChild(tdTelefonoElement);
                trElement.appendChild(tdBotonElement);

                // Agregar la fila al tbody
                TBODY_LISTA.appendChild(trElement);

                // Agregar Alerta
                haPasadoTiempo(fechaHora) ? thElement.classList.add('text-danger') : null

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

let enviar_form_atender = (id_atencion) => {
    $.ajax({
        url: `${window.location.origin}/atender/${id_atencion}`,  // Reemplaza esto con la URL de tu API
        method: 'GET',
        success: function (response) {
            Swal.fire({
                title: response.mensaje,
                text: response.atencion ? 'Paciente atendido': 'No se pudo atender al paciente',
                icon: response.atencion ? 'success': 'warning',
                confirmButtonText: 'Etendido',
                allowOutsideClick: false
            }).then((result) => {
                // Después de hacer clic en "Volver", recargar la página
                if (result.isConfirmed) {
                    location.reload();
                }
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

let haPasadoTiempo = (fechaTr) => {

    // Comparar si ha pasado el tiempo deseado (por ejemplo, 10 minutos)
    let tiempoDeseadoMinutos = 10; // 10

    // Obtener la fecha actual
    let fechaActual = new Date();

    // Convertir la fecha del tr al formato de fecha de JavaScript
    let fechaTrFormato = new Date(fechaTr);

    // Calcular la diferencia en milisegundos
    let diferenciaMilisegundos = fechaActual - fechaTrFormato;

    // Convertir la diferencia a minutos
    let diferenciaMinutos = diferenciaMilisegundos / (1000 * 60);

    return diferenciaMinutos >= tiempoDeseadoMinutos;
}
