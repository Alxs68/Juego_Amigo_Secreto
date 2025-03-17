let participantes = [];
let amigosAsignados = [];
let sorteadores = [];

function agregarParticipante() {
 const entradaNombre = document.getElementById('entrada-nombre');
 const botonAgregar = document.getElementById('boton-agregar');

 if (entradaNombre.disabled) {
 mostrarMensaje('No puedes agregar más participantes. Reinicia el juego para añadir nuevos.', true);
 return;
 }

 const nombre = entradaNombre.value.trim().toUpperCase();

 if (!/^[a-zA-ZÁÉÍÓÚáéíóú]+$/.test(nombre)) {
 mostrarMensaje('Por favor, ingresa solo caracteres tipo letra.');
 return;
 }
 if (participantes.includes(nombre)) {
 mostrarMensaje('Este participante ya está en la lista.');
 return;
 }

 participantes.push(nombre);
 actualizarListaParticipantes();
 entradaNombre.value = '';
 mostrarMensaje('Participante añadido.');
}

function actualizarListaParticipantes() {
 const lista = document.getElementById('lista-participantes');
 lista.innerHTML = '';
 participantes.forEach(participante => {
 const elementoLista = document.createElement('li');
 elementoLista.textContent = participante;
 lista.appendChild(elementoLista);
 });
 document.getElementById('contador-participantes').textContent = `Participantes: ${participantes.length}`;
}

function mostrarSeccionSorteo() {
 if (participantes.length < 2) {
 mostrarMensaje('Necesitas al menos 2 participantes para iniciar el sorteo.');
 return;
 }

 // Deshabilitar entrada y botón de agregar participantes
 document.getElementById('entrada-nombre').disabled = true;
 document.getElementById('boton-agregar').disabled = true;

 // Mostrar la sección de sorteo
 const seccionSorteo = document.getElementById('seccion-sorteo');
 seccionSorteo.style.display = 'block';
}

function sortearAmigoSecreto() {
 const nombreSorteador = document.getElementById('nombre-sorteador').value.trim().toUpperCase();

 if (!participantes.includes(nombreSorteador)) {
 mostrarMensaje('El nombre no pertenece a la lista de participantes.');
 return;
 }
 if (sorteadores.includes(nombreSorteador)) {
 mostrarMensaje('Ya realizaste tu sorteo.');
 return;
 }

 // Caso especial: solo queda un participante por escoger y otro por asignar
 if (participantes.length - amigosAsignados.length === 1) {
 const amigoRestante = participantes.find(
 nombre => !amigosAsignados.includes(nombre) && nombre !== nombreSorteador
 );
 if (amigoRestante) {
 mostrarMensaje(`${nombreSorteador}, tu amigo secreto es: ${amigoRestante}`, true);

 amigosAsignados.push(amigoRestante);
 sorteadores.push(nombreSorteador);

 // Limpiar el campo donde se ingresa el sorteador
 document.getElementById('nombre-sorteador').value = '';

 setTimeout(() => {
 mostrarMensaje('Todos los participantes han sido asignados. El juego ha finalizado.', true);

 // Ocultar la sección de sorteo al finalizar
 document.getElementById('seccion-sorteo').style.display = 'none';
 }, 5000); // Esperar 5 segundos mostrando el resultado final
 return;
 }
 }

 const amigosDisponibles = participantes.filter(
 nombre => nombre !== nombreSorteador && !amigosAsignados.includes(nombre)
 );

 if (amigosDisponibles.length === 0) {
 mostrarMensaje('No hay suficientes participantes disponibles para sortear.');
 return;
 }

 const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
 const amigoSecreto = amigosDisponibles[indiceAleatorio];

 mostrarMensaje(`${nombreSorteador}, tu amigo secreto es: ${amigoSecreto}`, true);

 amigosAsignados.push(amigoSecreto);
 sorteadores.push(nombreSorteador);

 // Limpiar el campo donde se ingresa el sorteador
 document.getElementById('nombre-sorteador').value = '';

 verificarFinJuego();
}

function verificarFinJuego() {
 if (amigosAsignados.length === participantes.length) {
 setTimeout(() => {
 mostrarMensaje('Todos los participantes han sido asignados. El juego ha finalizado.', true);

 // Ocultar la sección de sorteo al finalizar
 document.getElementById('seccion-sorteo').style.display = 'none';
 }, 5000); // Esperar 5 segundos mostrando el resultado final
 }
}

function reiniciarJuego() {
 participantes = [];
 amigosAsignados = [];
 sorteadores = [];
 actualizarListaParticipantes();
 mostrarMensaje('El juego ha sido reiniciado.');

 // Habilitar entrada y botón de agregar participantes
 document.getElementById('entrada-nombre').disabled = false;
 document.getElementById('boton-agregar').disabled = false;

 // Ocultar la sección de sorteo
 const seccionSorteo = document.getElementById('seccion-sorteo');
 seccionSorteo.style.display = 'none';

 // Limpiar el campo del sorteador
 document.getElementById('nombre-sorteador').value = '';
}

function mostrarMensaje(mensaje, animar = false) {
    const elementoMensaje = document.getElementById('mensaje');
    elementoMensaje.textContent = mensaje;
    if (animar) {
        elementoMensaje.classList.add('animacion-revelar');
        setTimeout(() => elementoMensaje.classList.remove('animacion-revelar'), 1000);
    }
    // Borrar el mensaje después de 3 segundos
    setTimeout(() => {
        elementoMensaje.textContent = '';
    }, 3000);
}