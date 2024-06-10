document.getElementById('alertaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tipoAlerta = document.getElementById('tipoAlerta').value;
    const descripcionAlerta = document.getElementById('descripcionAlerta').value;
    const fechaHoraAlerta = document.getElementById('fechaHoraAlerta').value;
    const opcionesRepeticion = document.getElementById('opcionesRepeticion').value;

    const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    alertas.push({ tipoAlerta, descripcionAlerta, fechaHoraAlerta, opcionesRepeticion });
    localStorage.setItem('alertas', JSON.stringify(alertas));
    
    displayAlertas();
    document.getElementById('alertaForm').reset();
});

function displayAlertas() {
    const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    const tableBody = document.getElementById('alertasTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    alertas.forEach(alerta => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${alerta.tipoAlerta}</td>
            <td>${alerta.descripcionAlerta}</td>
            <td>${alerta.fechaHoraAlerta}</td>
            <td>${alerta.opcionesRepeticion || ''}</td>
            <td><button onclick="deleteAlerta('${alerta.tipoAlerta}', '${alerta.fechaHoraAlerta}')">Eliminar</button></td>
            <td><button onclick="editAlerta('${alerta.tipoAlerta}', '${alerta.fechaHoraAlerta}')">Editar</button></td>
            <td><button onclick="consultarAlerta('${alerta.tipoAlerta}', '${alerta.fechaHoraAlerta}')">Consultar</button></td>
        `;
    });
}

function deleteAlerta(tipoAlerta, fechaHoraAlerta) {
    const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    const filteredAlertas = alertas.filter(alerta => 
        alerta.tipoAlerta !== tipoAlerta ||
        alerta.fechaHoraAlerta !== fechaHoraAlerta
    );
    localStorage.setItem('alertas', JSON.stringify(filteredAlertas));
    displayAlertas();
}

function editAlerta(tipoAlerta, fechaHoraAlerta) {
    const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    const alertaIndex = alertas.findIndex(alerta => 
        alerta.tipoAlerta === tipoAlerta &&
        alerta.fechaHoraAlerta === fechaHoraAlerta
    );
    if (alertaIndex !== -1) {
        const newTipoAlerta = prompt("Ingrese el nuevo tipo de alerta:", alertas[alertaIndex].tipoAlerta);
        const newDescripcion = prompt("Ingrese la nueva descripción:", alertas[alertaIndex].descripcionAlerta);
        const newFechaHora = prompt("Ingrese la nueva fecha y hora:", alertas[alertaIndex].fechaHoraAlerta);
        const newRepeticion = prompt("Ingrese las nuevas opciones de repetición:", alertas[alertaIndex].opcionesRepeticion);
        if (newTipoAlerta !== null && newDescripcion !== null && newFechaHora !== null && newRepeticion !== null) {
            alertas[alertaIndex].tipoAlerta = newTipoAlerta;
            alertas[alertaIndex].descripcionAlerta = newDescripcion;
            alertas[alertaIndex].fechaHoraAlerta = newFechaHora;
            alertas[alertaIndex].opcionesRepeticion = newRepeticion;
            localStorage.setItem('alertas', JSON.stringify(alertas));
            alert("Alerta editada exitosamente.");
            displayAlertas();
        } else {
            alert("Por favor, complete todos los campos."); // Mensaje cuando algún valor es nulo
        }
    } else {
        alert("La alerta no fue encontrada.");
    }
}

function consultarAlerta(tipoAlerta, fechaHoraAlerta) {
    const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    const alerta = alertas.find(a => 
        a.tipoAlerta === tipoAlerta &&
        a.fechaHoraAlerta === fechaHoraAlerta
    );
    if (alerta) {
        alert(`Tipo de Alerta: ${alerta.tipoAlerta}\nDescripción: ${alerta.descripcionAlerta}\nFecha y Hora: ${alerta.fechaHoraAlerta}\nOpciones de Repetición: ${alerta.opcionesRepeticion}`);
    } else {
        alert("La alerta no fue encontrada.");
    }
}


