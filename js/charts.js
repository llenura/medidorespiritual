// Oración
const oracionChart = new Chart(ctxOracion, {
    type: 'line',
    data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [{
            label: 'Nivel de Oración',
            data: [5,6,7,4,8,7,6], // Datos de ejemplo
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

// Biblia
const bibliaChart = new Chart(ctxBiblia, {
    type: 'line',
    data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [{
            label: 'Lectura de Biblia',
            data: [4,5,6,3,7,5,6], // Datos de ejemplo
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

