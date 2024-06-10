document.addEventListener('DOMContentLoaded', function () {
    populateSelectOptions();
    displayTransacciones();

    document.getElementById('transaccionForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const tipoTransaccion = document.getElementById('tipoTransaccion').value;
        const tipoAsociado = document.getElementById('tipoAsociado').value;
        const valorTransaccion = document.getElementById('valorTransaccion').value;
        const cuentaRelacionada = document.getElementById('cuentaRelacionada').value;
        const fechaTransaccion = document.getElementById('fechaTransaccion').value;
        const archivo = document.getElementById('archivo').files[0] ? document.getElementById('archivo').files[0].name : 'No';
        const descripcionTransaccion = document.getElementById('descripcionTransaccion').value;

        const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        transacciones.push({ tipoTransaccion, tipoAsociado, valorTransaccion, cuentaRelacionada, fechaTransaccion, archivo, descripcionTransaccion });
        localStorage.setItem('transacciones', JSON.stringify(transacciones));

        displayTransacciones();
        document.getElementById('transaccionForm').reset();
    });
});

function populateSelectOptions() {
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];

    const tipoAsociadoSelect = document.getElementById('tipoAsociado');
    const cuentaRelacionadaSelect = document.getElementById('cuentaRelacionada');

    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.codigo;
        option.textContent = tipo.nombreTipo;
        tipoAsociadoSelect.appendChild(option);
    });

    cuentas.forEach(cuenta => {
        const option = document.createElement('option');
        option.value = cuenta.numeroCuenta;
        option.textContent = `${cuenta.numeroCuenta} - ${cuenta.nombreBanco}`;
        cuentaRelacionadaSelect.appendChild(option);
    });
}

function displayTransacciones() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const tableBody = document.getElementById('transaccionesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    transacciones.forEach(transaccion => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${transaccion.tipoTransaccion}</td>
            <td>${transaccion.tipoAsociado}</td>
            <td>${transaccion.valorTransaccion}</td>
            <td>${transaccion.cuentaRelacionada}</td>
            <td>${transaccion.fechaTransaccion}</td>
            <td>${transaccion.archivo}</td>
            <td>${transaccion.descripcionTransaccion || ''}</td>
            <td><button onclick="deleteTransaccion('${transaccion.tipoAsociado}', '${transaccion.valorTransaccion}', '${transaccion.cuentaRelacionada}', '${transaccion.fechaTransaccion}')">Eliminar</button></td>
            <td><button onclick="editarTransaccion('${transaccion.tipoAsociado}', '${transaccion.valorTransaccion}', '${transaccion.cuentaRelacionada}', '${transaccion.fechaTransaccion}')">Editar</button></td>
            <td><button onclick="consultarTransaccion('${transaccion.tipoAsociado}', '${transaccion.valorTransaccion}', '${transaccion.cuentaRelacionada}', '${transaccion.fechaTransaccion}')">Consultar</button></td>
        `;
    });
}

function deleteTransaccion(tipoAsociado, valorTransaccion, cuentaRelacionada, fechaTransaccion) {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const filteredTransacciones = transacciones.filter(transaccion =>
        transaccion.tipoAsociado !== tipoAsociado ||
        transaccion.valorTransaccion !== valorTransaccion ||
        transaccion.cuentaRelacionada !== cuentaRelacionada ||
        transaccion.fechaTransaccion !== fechaTransaccion
    );
    localStorage.setItem('transacciones', JSON.stringify(filteredTransacciones));
    displayTransacciones();
}

function consultarTransaccion(tipoAsociado, valorTransaccion, cuentaRelacionada, fechaTransaccion) {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const transaccion = transacciones.find(trans =>
        trans.tipoAsociado === tipoAsociado &&
        trans.valorTransaccion === valorTransaccion &&
        trans.cuentaRelacionada === cuentaRelacionada &&
        trans.fechaTransaccion === fechaTransaccion
    );
    if (transaccion) {
        alert(`Tipo de Transacción: ${transaccion.tipoTransaccion}\nTipo de Asociado: ${transaccion.tipoAsociado}\nValor de Transacción: ${transaccion.valorTransaccion}\nCuenta Relacionada: ${transaccion.cuentaRelacionada}\nFecha de Transacción: ${transaccion.fechaTransaccion}\nArchivo: ${transaccion.archivo}\nDescripción: ${transaccion.descripcionTransaccion}`);
    } else {
        alert("La transacción no fue encontrada.");
    }
}

function editarTransaccion(tipoAsociado, valorTransaccion, cuentaRelacionada, fechaTransaccion) {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const transaccionIndex = transacciones.findIndex(trans =>
        trans.tipoAsociado === tipoAsociado &&
        trans.valorTransaccion === valorTransaccion &&
        trans.cuentaRelacionada === cuentaRelacionada &&
        trans.fechaTransaccion === fechaTransaccion
    );
    if (transaccionIndex !== -1) {
        const newTipoTransaccion = prompt("Ingrese el nuevo tipo de transacción:", transacciones[transaccionIndex].tipoTransaccion);
        const newTipoAsociado = prompt("Ingrese el nuevo tipo asociado:", transacciones[transaccionIndex].tipoAsociado);
        const newValorTransaccion = prompt("Ingrese el nuevo valor de la transacción:", transacciones[transaccionIndex].valorTransaccion);
        const newCuentaRelacionada = prompt("Ingrese la nueva cuenta relacionada:", transacciones[transaccionIndex].cuentaRelacionada);
        const newFechaTransaccion = prompt("Ingrese la nueva fecha de transacción:", transacciones[transaccionIndex].fechaTransaccion);
        const newDescripcionTransaccion = prompt("Ingrese la nueva descripción de la transacción:", transacciones[transaccionIndex].descripcionTransaccion);

        if (newTipoTransaccion !== null && newTipoAsociado !== null && newValorTransaccion !== null && newCuentaRelacionada !== null && newFechaTransaccion !== null) {
            const newArchivo = prompt("Ingrese el nombre del nuevo archivo (deje en blanco si no cambia):", transacciones[transaccionIndex].archivo);

            transacciones[transaccionIndex] = {
                tipoTransaccion: newTipoTransaccion || transacciones[transaccionIndex].tipoTransaccion,
                tipoAsociado: newTipoAsociado || transacciones[transaccionIndex].tipoAsociado,
                valorTransaccion: newValorTransaccion || transacciones[transaccionIndex].valorTransaccion,
                cuentaRelacionada: newCuentaRelacionada || transacciones[transaccionIndex].cuentaRelacionada,
                fechaTransaccion: newFechaTransaccion || transacciones[transaccionIndex].fechaTransaccion,
                archivo: newArchivo || transacciones[transaccionIndex].archivo,
                descripcionTransaccion: newDescripcionTransaccion || transacciones[transaccionIndex].descripcionTransaccion
            };

            localStorage.setItem('transacciones', JSON.stringify(transacciones));
            alert("Transacción editada exitosamente.");
            displayTransacciones(); // Actualizar la tabla
        } else {
            alert("Edición cancelada. No se realizaron cambios.");
        }
    } else {
        alert("La transacción no fue encontrada.");
    }
}


