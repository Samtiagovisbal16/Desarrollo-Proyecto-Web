document.getElementById('cuentaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const nombreBanco = document.getElementById('nombreBanco').value;
    const tipoCuenta = document.getElementById('tipoCuenta').value;
    const saldoActual = document.getElementById('saldoActual').value;
    const estadoCuenta = document.getElementById('estadoCuenta').value;
    const fechaApertura = document.getElementById('fechaApertura').value;
    const descripcionCuenta = document.getElementById('descripcionCuenta').value;

    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    cuentas.push({ numeroCuenta, nombreBanco, tipoCuenta, saldoActual, estadoCuenta, fechaApertura, descripcionCuenta });
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    
    displayCuentas();
    document.getElementById('cuentaForm').reset();
});

function displayCuentas() {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const tableBody = document.getElementById('cuentasTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    cuentas.forEach(cuenta => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${cuenta.numeroCuenta}</td>
            <td>${cuenta.nombreBanco}</td>
            <td>${cuenta.tipoCuenta}</td>
            <td>${cuenta.saldoActual}</td>
            <td>${cuenta.estadoCuenta}</td>
            <td>${cuenta.fechaApertura || ''}</td>
            <td>${cuenta.descripcionCuenta || ''}</td>
            <td><button onclick="deleteCuenta('${cuenta.numeroCuenta}')">Eliminar</button></td>
            <td><button onclick="editarCuenta('${cuenta.numeroCuenta}')">Editar</button></td>
            <td><button onclick="consultarCuenta('${cuenta.numeroCuenta}')">Consultar</button></td>
        `;
    });
}

function deleteCuenta(numeroCuenta) {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const filteredCuentas = cuentas.filter(cuenta => cuenta.numeroCuenta !== numeroCuenta);
    localStorage.setItem('cuentas', JSON.stringify(filteredCuentas));
    displayCuentas();
}

function consultarCuenta(numeroCuenta) {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);
    if (cuenta) {
        alert(`Número de Cuenta: ${cuenta.numeroCuenta}\nNombre del Banco: ${cuenta.nombreBanco}\nTipo de Cuenta: ${cuenta.tipoCuenta}\nSaldo Actual: ${cuenta.saldoActual}\nEstado de la Cuenta: ${cuenta.estadoCuenta}\nFecha de Apertura: ${cuenta.fechaApertura}\nDescripción: ${cuenta.descripcionCuenta}`);
    } else {
        alert("La cuenta no fue encontrada.");
    }
}

function editarCuenta(numeroCuenta) {
    // Obtiene las cuentas almacenadas en localStorage
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    // Busca la cuenta que coincide con el número de cuenta proporcionado
    const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);
    
    // Si la cuenta existe
    if (cuenta) {
        // Solicita al usuario los nuevos valores para cada campo, mostrando el valor actual como predeterminado
        const newNombreBanco = prompt("Ingrese el nuevo nombre del banco:", cuenta.nombreBanco);
        const newTipoCuenta = prompt("Ingrese el nuevo tipo de cuenta:", cuenta.tipoCuenta);
        const newSaldoActual = prompt("Ingrese el nuevo saldo actual:", cuenta.saldoActual);
        const newEstadoCuenta = prompt("Ingrese el nuevo estado de la cuenta (activa, inactiva o cerrada):", cuenta.estadoCuenta);
        const newFechaApertura = prompt("Ingrese la nueva fecha de apertura:", cuenta.fechaApertura);
        const newDescripcionCuenta = prompt("Ingrese la nueva descripción de la cuenta:", cuenta.descripcionCuenta);

        // Si los valores ingresados no son nulos, actualiza la cuenta
        if (newNombreBanco !== null && newTipoCuenta !== null && newSaldoActual !== null && newEstadoCuenta !== null && newFechaApertura !== null && newDescripcionCuenta !== null) {
            // Actualiza los valores de la cuenta en el array de cuentas
            cuentas.forEach(c => {
                if (c.numeroCuenta === numeroCuenta) {
                    c.nombreBanco = newNombreBanco || cuenta.nombreBanco;
                    c.tipoCuenta = newTipoCuenta || cuenta.tipoCuenta;
                    c.saldoActual = newSaldoActual || cuenta.saldoActual;
                    c.estadoCuenta = newEstadoCuenta || cuenta.estadoCuenta;
                    c.fechaApertura = newFechaApertura || cuenta.fechaApertura;
                    c.descripcionCuenta = newDescripcionCuenta || cuenta.descripcionCuenta;
                }
            });
            // Guarda las cuentas actualizadas en localStorage
            localStorage.setItem('cuentas', JSON.stringify(cuentas));
            // Actualiza la visualización de las cuentas en la página
            displayCuentas();
            // Muestra una alerta de éxito
            alert("Cuenta editada exitosamente.");
        } else {
            // Si algún valor es nulo, no se realizan cambios y se muestra una alerta
            alert("Edición cancelada. No se realizaron cambios.");
        }
    } else {
        // Si la cuenta no es encontrada, muestra una alerta
        alert("La cuenta no fue encontrada.");
    }
}



