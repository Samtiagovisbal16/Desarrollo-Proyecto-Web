document.getElementById('tipoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('codigo').value;
    const nombreTipo = document.getElementById('nombreTipo').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;
    const descripcionTipo = document.getElementById('descripcionTipo').value;

    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    tipos.push({ codigo, nombreTipo, tipo, categoria, descripcionTipo });
    localStorage.setItem('tipos', JSON.stringify(tipos));
    
    displayTipos();
    document.getElementById('tipoForm').reset();
});

function displayTipos() {
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const tableBody = document.getElementById('tiposTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    tipos.forEach(tipo => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${tipo.codigo}</td>
            <td>${tipo.nombreTipo}</td>
            <td>${tipo.tipo}</td>
            <td>${tipo.categoria || ''}</td>
            <td>${tipo.descripcionTipo || ''}</td>
            <td><button onclick="deleteTipo('${tipo.codigo}')">Eliminar</button></td>
            <td><button onclick="editarTipo('${tipo.codigo}')">Editar</button></td>
            <td><button onclick="consultarTipo('${tipo.codigo}')">Consultar</button></td>
        `;
    });
}

function deleteTipo(codigo) {
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const filteredTipos = tipos.filter(tipo => tipo.codigo !== codigo);
    localStorage.setItem('tipos', JSON.stringify(filteredTipos));
    displayTipos();
}

function consultarTipo(codigo) {
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const tipo = tipos.find(t => t.codigo === codigo);
    if (tipo) {
        alert(`Código: ${tipo.codigo}\nNombre: ${tipo.nombreTipo}\nTipo: ${tipo.tipo}\nCategoría: ${tipo.categoria || 'N/A'}\nDescripción: ${tipo.descripcionTipo || 'N/A'}`);
    } else {
        alert("El tipo no fue encontrado.");
    }
}

function editarTipo(codigo) {
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const tipoIndex = tipos.findIndex(t => t.codigo === codigo);
    if (tipoIndex !== -1) {
        const tipoActual = tipos[tipoIndex];
        const newCodigo = prompt("Ingrese el nuevo código del tipo:", tipoActual.codigo);
        const newNombre = prompt("Ingrese el nuevo nombre del tipo:", tipoActual.nombreTipo);
        const newTipo = prompt("Ingrese el nuevo tipo del tipo:", tipoActual.tipo);
        const newCategoria = prompt("Ingrese la nueva categoría del tipo:", tipoActual.categoria);
        const newDescripcion = prompt("Ingrese la nueva descripción del tipo:", tipoActual.descripcionTipo);
        
        // Verifica que el nuevo nombre y la nueva descripción no sean null o vacíos.
        if (newNombre && newDescripcion) {
            tipos[tipoIndex] = {
                codigo: newCodigo || tipoActual.codigo,
                nombreTipo: newNombre,
                tipo: newTipo || tipoActual.tipo,
                categoria: newCategoria || tipoActual.categoria,
                descripcionTipo: newDescripcion
            };
            localStorage.setItem('tipos', JSON.stringify(tipos));
            displayTipos();
            alert("Tipo editado exitosamente.");
        } else {
            alert("El nombre y la descripción no pueden estar vacíos. Intente de nuevo.");
        }
    } else {
        alert("El tipo no fue encontrado.");
    }
}

