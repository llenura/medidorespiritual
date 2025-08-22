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

// --- Inicializar gráficos de línea (Chart.js) ---
const ctxOracion = document.getElementById('oracionChart').getContext('2d');
const ctxBiblia = document.getElementById('bibliaChart').getContext('2d');

const oracionChart = new Chart(ctxOracion, {
    type: 'line',
    data: {
        labels: datos.map(d=>d.fecha),
        datasets: [{
            label: 'Nivel de Oración',
            data: datos.map(d=>d.oracion),
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.2)',
            tension: 0.4
        }]
    },
    options: { responsive: true, scales: { y: { min:0, max:10 } } }
});

const bibliaChart = new Chart(ctxBiblia, {
    type: 'line',
    data: {
        labels: datos.map(d=>d.fecha),
        datasets: [{
            label: 'Lectura de Biblia',
            data: datos.map(d=>d.biblia),
            borderColor: '#1abc9c',
            backgroundColor: 'rgba(26, 188, 156, 0.2)',
            tension: 0.4
        }]
    },
    options: { responsive: true, scales: { y: { min:0, max:10 } } }
});

// --- Función para actualizar medidores circulares ---
function actualizarMedidores() {
    const ultimo = datos[datos.length-1];
    if(!ultimo) return;

    // Oración
    const medidorOracion = document.getElementById('medidorOracion');
    medidorOracion.textContent = Oración: ${ultimo.oracion};
    medidorOracion.style.backgroundColor = nivelColor(ultimo.oracion);

    // Biblia
    const medidorBiblia = document.getElementById('medidorBiblia');
    medidorBiblia.textContent = Biblia: ${ultimo.biblia};
    medidorBiblia.style.backgroundColor = nivelColor(ultimo.biblia);

    // Tentaciones
    const medidorTentaciones = document.getElementById('medidorTentaciones');
    medidorTentaciones.textContent = Tentaciones: ${ultimo.tentaciones ? 'Sí' : 'No'};
    medidorTentaciones.style.backgroundColor = ultimo.tentaciones ? '#27ae60' : '#e74c3c';

    // Recaídas
    const medidorRecaidas = document.getElementById('medidorRecaidas');
    medidorRecaidas.textContent = Recaídas: ${ultimo.recaidas ? 'Sí' : 'No'};
    medidorRecaidas.style.backgroundColor = ultimo.recaidas ? '#e74c3c' : '#27ae60';
}

// --- Función para actualizar todo el dashboard ---
function actualizarDashboard() {
    // Gráficas
    oracionChart.data.labels = datos.map(d=>d.fecha);
    oracionChart.data.datasets[0].data = datos.map(d=>d.oracion);
    oracionChart.update();

    bibliaChart.data.labels = datos.map(d=>d.fecha);
    bibliaChart.data.datasets[0].data = datos.map(d=>d.biblia);
    bibliaChart.update();

    // Medidores circulares
    actualizarMedidores();

    // Resumen semanal
    const promedioOracion = (datos.map(d=>d.oracion).reduce((a,b)=>a+b,0)/datos.length).toFixed(1);
    const maxOracion = Math.max(...datos.map(d=>d.oracion));
    const minOracion = Math.min(...datos.map(d=>d.oracion));
    document.getElementById('resumenText').textContent = 
        Oración promedio: ${promedioOracion}, máximo: ${maxOracion}, mínimo: ${minOracion};
}

// --- Registro diario ---
document.getElementById('registroForm').addEventListener('submit', e=>{
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
    e.target.reset();
});

// --- Diario espiritual ---
document.getElementById('guardarReflexion').addEventListener('click', ()=>{
    const texto = document.getElementById('reflexion').value;
    if(texto){
        const analisis = analizarSentimiento(texto);
        document.getElementById('analisisSentimiento').textContent = Sentimiento detectado: ${analisis};
        document.getElementById('reflexion').value = '';
    }
});

function analizarSentimiento(texto){
    const positivo = ['paz','gratitud','amor','alegría','bendición'];
    const negativo = ['tentación','culpa','triste','ira','recaída'];
    let score = 0;
    texto.split(' ').forEach(p=>{
        if(positivo.includes(p.toLowerCase())) score++;
        if(negativo.includes(p.toLowerCase())) score--;
    });
    if(score>0) return 'Positivo';
    else if(score<0) return 'Negativo';
    else return 'Neutral';
}

// --- Inicializar dashboard al cargar ---
actualizarDashboard();

