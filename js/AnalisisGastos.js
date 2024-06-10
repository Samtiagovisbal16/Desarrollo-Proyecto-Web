document.addEventListener('DOMContentLoaded', function() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    
    if (transacciones.length === 0) {
        document.getElementById('gastosTable').style.display = 'none';
        document.getElementById('totales').style.display = 'none';
        return;
    }
    
    const egresos = transacciones.filter(transaccion => transaccion.tipoTransaccion === 'egreso');
    const ingresos = transacciones.filter(transaccion => transaccion.tipoTransaccion === 'ingreso');
    const tableBody = document.getElementById('gastosTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    let totalEgreso = 0;
    let totalIngreso = 0;

    egresos.forEach(egreso => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${egreso.fechaTransaccion}</td>
            <td>${egreso.descripcionTransaccion || ''}</td>
            <td>$${egreso.valorTransaccion}</td>
        `;
        totalEgreso += parseFloat(egreso.valorTransaccion);
    });

    ingresos.forEach(ingreso => {
        totalIngreso += parseFloat(ingreso.valorTransaccion);
    });

    const saldoTotalCuentas = cuentas.reduce((total, cuenta) => total + parseFloat(cuenta.saldoActual), 0);
    const saldoActual = saldoTotalCuentas + totalIngreso - totalEgreso;

    document.getElementById('egresoTotal').textContent = totalEgreso.toFixed(2);
    document.getElementById('saldoActual').textContent = saldoActual.toFixed(2);
});


