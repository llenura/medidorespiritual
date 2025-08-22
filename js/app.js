// Contextos de los canvas
window.ctxOracion = document.getElementById('oracionChart').getContext('2d');
window.ctxBiblia = document.getElementById('bibliaChart').getContext('2d');

// Gráfico de Oración
window.oracionChart = new Chart(window.ctxOracion, {
    type: 'line',
    data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [{
            label: 'Nivel de Oración',
            data: [5,6,7,4,8,7,6],
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.2)',
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { y: { min: 0, max: 10 } }
    }
});

// Gráfico de Biblia
window.bibliaChart = new Chart(window.ctxBiblia, {
    type: 'line',
    data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [{
            label: 'Lectura de Biblia',
            data: [4,5,6,3,7,5,6],
            borderColor: '#1abc9c',
            backgroundColor: 'rgba(26, 188, 156, 0.2)',
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        scales: { y: { min: 0, max: 10 } }
    }
});

// Datos iniciales de ejemplo
let datos = [
    { fecha: 'Lun', oracion: 5, biblia: 4, tentaciones: 1, recaidas: 0 },
    { fecha: 'Mar', oracion: 6, biblia: 5, tentaciones: 1, recaidas: 0 },
    { fecha: 'Mié', oracion: 7, biblia: 6, tentaciones: 1, recaidas: 0 },
    { fecha: 'Jue', oracion: 4, biblia: 3, tentaciones: 0, recaidas: 0 },
    { fecha: 'Vie', oracion: 8, biblia: 7, tentaciones: 1, recaidas: 0 },
    { fecha: 'Sáb', oracion: 7, biblia: 5, tentaciones: 1, recaidas: 0 },
    { fecha: 'Dom', oracion: 6, biblia: 6, tentaciones: 1, recaidas: 0 },
];

// Función para asignar color según nivel
function nivelColor(nivel) {
    if(nivel >= 8) return '#27ae60';
    else if(nivel >= 5) return '#f1c40f';
    else return '#e74c3c';
}

// Actualizar dashboard
function actualizarDashboard() {
    const fechas = datos.map(d => d.fecha);
    const oracion = datos.map(d => d.oracion);
    const biblia = datos.map(d => d.biblia);

    // Actualizar gráficos
    window.oracionChart.data.labels = fechas;
    window.oracionChart.data.datasets[0].data = oracion;
    window.oracionChart.update();

    window.bibliaChart.data.labels = fechas;
    window.bibliaChart.data.datasets[0].data = biblia;
    window.bibliaChart.update();

    // Actualizar medidores
    const ultimo = datos[datos.length - 1];
    if (ultimo) {
        const medidores = [
            {id: 'medidorOracion', valor: ultimo.oracion, texto: 'Oración'},
            {id: 'medidorBiblia', valor: ultimo.biblia, texto: 'Biblia'},
            {id: 'medidorTentaciones', valor: ultimo.tentaciones, texto: 'Tentaciones'},
            {id: 'medidorRecaidas', valor: ultimo.recaidas, texto: 'Recaídas'}
        ];

        medidores.forEach(m => {
            const el = document.getElementById(m.id);
            if(el){
                if(m.id === 'medidorTentaciones' || m.id === 'medidorRecaidas'){
                    el.textContent = ${m.texto}: ${m.valor ? 'Sí' : 'No'};
                    el.style.backgroundColor = m.valor ? '#27ae60' : '#e74c3c';
                    el.style.color = 'white';
                } else {
                    el.textContent = ${m.texto}: ${m.valor};
                    el.style.backgroundColor = nivelColor(m.valor);
                    el.style.color = 'white';
                }
            }
        });
    }

    // Resumen semanal
    if(datos.length > 0){
        const promedioOracion = (oracion.reduce((a,b)=>a+b,0)/oracion.length).toFixed(1);
        const maxOracion = Math.max(...oracion);
        const minOracion = Math.min(...oracion);
        document.getElementById('resumenText').textContent = 
            Oración promedio: ${promedioOracion}, máximo: ${maxOracion}, mínimo: ${minOracion};
    }
}

// Registro diario
document.getElementById('registroForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const nuevo = {
        fecha: new Date().toLocaleDateString(),
        oracion: parseInt(document.getElementById('oracion').value),
        biblia: parseInt(document.getElementById('biblia').value),
        tentaciones: parseInt(document.getElementById('tentaciones').value),
        recaidas: parseInt(document.getElementById('recaidas').value)
    };
    datos.push(nuevo);
    actualizarDashboard();
    document.getElementById('registroForm').reset();
});

// Ejecutar al cargar
actualizarDashboard();

