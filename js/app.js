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
    if(nivel >= 8) return '#27ae60'; // verde
    else if(nivel >= 5) return '#f1c40f'; // amarillo
    else return '#e74c3c'; // rojo
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
        const medOracion = document.getElementById('medidorOracion');
        const medBiblia = document.getElementById('medidorBiblia');
        const medTentaciones = document.getElementById('medidorTentaciones');
        const medRecaidas = document.getElementById('medidorRecaidas');

        medOracion.textContent = Oración: ${ultimo.oracion};
        medBiblia.textContent = Biblia: ${ultimo.biblia};
        medTentaciones.textContent = Tentaciones: ${ultimo.tentaciones ? 'Sí' : 'No'};
        medRecaidas.textContent = Recaídas: ${ultimo.recaidas ? 'Sí' : 'No'};

        medOracion.style.backgroundColor = nivelColor(ultimo.oracion);
        medBiblia.style.backgroundColor = nivelColor(ultimo.biblia);
        medTentaciones.style.backgroundColor = ultimo.tentaciones ? '#27ae60' : '#e74c3c';
        medRecaidas.style.backgroundColor = ultimo.recaidas ? '#e74c3c' : '#27ae60';
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
    e.target.reset();
});

// Diario espiritual simple
document.getElementById('guardarReflexion').addEventListener('click', ()=>{
    const texto = document.getElementById('reflexion').value;
    if(texto){
        const analisis = analizarSentimiento(texto);
        document.getElementById('analisisSentimiento').textContent = Sentimiento detectado: ${analisis};
        document.getElementById('reflexion').value = '';
    }
});

// Análisis de sentimiento simple
function analizarSentimiento(texto){
    const positivo = ['paz','gratitud','amor','alegría','bendición'];
    const negativo = ['tentación','culpa','triste','ira','recaída'];
    let score = 0;
    texto.split(' ').forEach(palabra=>{
        if(positivo.includes(palabra.toLowerCase())) score++;
        if(negativo.includes(palabra.toLowerCase())) score--;
    });
    if(score > 0) return 'Positivo';
    else if(score < 0) return 'Negativo';
    else return 'Neutral';
}

// Inicializar dashboard al cargar
window.addEventListener('DOMContentLoaded', () => {
    actualizarDashboard();
});

