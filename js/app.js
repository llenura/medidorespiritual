// app.js - Dashboard completo para Medidor Espiritual

// Datos iniciales de ejemplo para que los gráficos se vean al cargar
let datos = [
    { fecha: 'Lun', oracion: 5, biblia: 4, tentaciones: 1, recaidas: 0 },
    { fecha: 'Mar', oracion: 6, biblia: 5, tentaciones: 1, recaidas: 0 },
    { fecha: 'Mié', oracion: 7, biblia: 6, tentaciones: 1, recaidas: 0 },
    { fecha: 'Jue', oracion: 4, biblia: 3, tentaciones: 0, recaidas: 0 },
    { fecha: 'Vie', oracion: 8, biblia: 7, tentaciones: 1, recaidas: 0 },
    { fecha: 'Sáb', oracion: 7, biblia: 5, tentaciones: 1, recaidas: 0 },
    { fecha: 'Dom', oracion: 6, biblia: 6, tentaciones: 1, recaidas: 0 },
];

// Función para actualizar gráficos y medidores
function actualizarDashboard() {
    const fechas = datos.map(d => d.fecha);
    const oracion = datos.map(d => d.oracion);
    const biblia = datos.map(d => d.biblia);

    // Actualizar gráficos
    oracionChart.data.labels = fechas;
    oracionChart.data.datasets[0].data = oracion;
    oracionChart.update();

    bibliaChart.data.labels = fechas;
    bibliaChart.data.datasets[0].data = biblia;
    bibliaChart.update();

    // Actualizar medidores
    const ultimo = datos[datos.length - 1];
    if (ultimo) {
        document.getElementById('medidorOracion').textContent = Oración: ${ultimo.oracion};
        document.getElementById('medidorBiblia').textContent = Biblia: ${ultimo.biblia};
        document.getElementById('medidorTentaciones').textContent = Tentaciones: ${ultimo.tentaciones ? 'Sí' : 'No'};
        document.getElementById('medidorRecaidas').textContent = Recaídas: ${ultimo.recaidas ? 'Sí' : 'No'};
        
        document.getElementById('medidorOracion').style.backgroundColor = nivelColor(ultimo.oracion);
        document.getElementById('medidorBiblia').style.backgroundColor = nivelColor(ultimo.biblia);
        document.getElementById('medidorTentaciones').style.backgroundColor = ultimo.tentaciones ? '#27ae60' : '#e74c3c';
        document.getElementById('medidorRecaidas').style.backgroundColor = ultimo.recaidas ? '#e74c3c' : '#27ae60';
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

// Función para asignar color según nivel
function nivelColor(nivel) {
    if(nivel >= 8) return '#27ae60'; // verde
    else if(nivel >= 5) return '#f1c40f'; // amarillo
    else return '#e74c3c'; // rojo
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
actualizarDashboard();

/* 
  Integración con Google Sheets:
  1. Crear un Google Sheet.
  2. Publicar -> "Publicar en la web".
  3. Obtener URL JSON con Tabletop.js o Google Sheets API.
  4. Reemplazar la variable 'datos' con fetch desde Google Sheets.
*/

