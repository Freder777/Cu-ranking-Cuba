// Datos simulados (en producción usar base de datos)
let rankingData = [
    { position: 1, nombre: "Yami", tag: "Yami#1234", puntos: 2450, torneos: 15, winrate: "78%", main: "Pyra", avatar: "👤" },
    { position: 2, nombre: "Kev", tag: "KevSSB#5678", puntos: 2380, torneos: 14, winrate: "75%", main: "Wolf", avatar: "👤" },
    { position: 3, nombre: "Alex", tag: "AlexCub#9999", puntos: 2250, torneos: 16, winrate: "72%", main: "Sonic", avatar: "👤" },
    // Agregar más jugadores...
];

let torneos = [
    { nombre: "Liga Cubana #15", fecha: "2024-01-20", link: "https://www.start.gg/tournament/cuba-smash-15" },
    { nombre: "Havana Smash Weekly", fecha: "2024-01-18", link: "https://www.start.gg/tournament/havana-weekly-10" },
];

let noticias = [
    { titulo: "¡Nuevo récord de participación!", contenido: "El último torneo rompió récords con 128 jugadores.", fecha: "2024-01-15" },
    { titulo: "Actualización del ranking", contenido: "Sistema de puntos mejorado implementado.", fecha: "2024-01-10" },
];

let mensajesChat = [];
let usuarioActual = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarRanking();
    cargarTorneos();
    cargarNoticias();
    cargarChat();
    
    // Modal handlers
    document.querySelectorAll('.nav-link[href="#perfil"]').forEach(link => {
        link.addEventListener('click', abrirModalPerfil);
    });
    
    document.querySelectorAll('.nav-link[href="#admin"]').forEach(link => {
        link.addEventListener('click', abrirModalAdmin);
    });
    
    // Form handlers
    document.getElementById('perfilForm').addEventListener('submit', guardarPerfil);
    
    // Search
    document.getElementById('searchPlayer').addEventListener('input', filtrarRanking);
    
    // Hamburger menu
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
    
    // Close modals
    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', cerrarModales);
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(event) {
        const modales = document.querySelectorAll('.modal');
        modales.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// Funciones principales
function cargarRanking() {
    const tbody = document.getElementById('rankingTableBody');
    tbody.innerHTML = rankingData.map(jugador => `
        <tr>
            <td class="position">${jugador.position}</td>
            <td>
                <div style="display: flex; align-items: center;">
                    <div class="avatar">${jugador.avatar}</div>
                    <div>
                        <div style="font-weight: 600; color: #333;">${jugador.nombre}</div>
                        <div style="font-size: 0.9rem; color: #666;">${jugador.tag}</div>
                    </div>
                </div>
            </td>
            <td><strong style="color: #ff6b6b;">${jugador.puntos}</strong></td>
            <td>${jugador.torneos}</td>
            <td>${jugador.winrate}</td>
            <td><i class="fas fa-${obtenerIconoMain(jugador.main)}" style="color: #667eea;"></i> ${jugador.main}</td>
        </tr>
    `).join('');
}

function cargarTorneos() {
    const grid = document.getElementById('torneosGrid');
    grid.innerHTML = torneos.map(torneo => `
        <div class="torneo-card">
            <h3>${torneo.nombre}</h3>
            <p><strong>Fecha:</strong> ${new Date(torneo.fecha).toLocaleDateString('es-ES')}</p>
            <a href="${torneo.link}" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;">
                <i class="fab fa-startgg"></i> Ver en start.gg
            </a>
        </div>
    `).join('');
}

function cargarNoticias() {
    const grid = document.getElementById('noticiasGrid');
    grid.innerHTML = noticias.map(noticia => `
        <div class="noticia-card">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.contenido}</p>
            <small style="color: #666;">${noticia.fecha}</small>
        </div>
    `).join('');
}

function cargarChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = mensajesChat.map(msg => `
        <div class="chat-message">
            <div class="chat-avatar">${msg.usuario.charAt(0)}</div>
            <div>
                <strong>${msg.usuario}</strong> <small style="color: #666;">${msg.fecha}</small>
                <p>${msg.mensaje}</p>
            </div>
        </div>
    `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Modal functions
function abrirModalPerfil() {
    document.getElementById('perfilModal').style.display = 'block';
}

function abrirModalAdmin() {
    document.getElementById('adminModal').style.display = 'block';
}

function cerrarModales() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function guardarPerfil(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreJugador').value;
    const tag = document.getElementById('tag').value;
    const main = document.getElementById('main').value;
    
    usuarioActual = { nombre, tag, main };
    alert('¡Perfil guardado correctamente!');
    cerrarModales();
}

function filtrarRanking() {
    const search = document.getElementById('searchPlayer').value.toLowerCase();
    const filtrado = rankingData.filter(jugador => 
        jugador.nombre.toLowerCase().includes(search) || 
        jugador.tag.toLowerCase().includes(search)
    );
    // Actualizar tabla con datos filtrados
    const tbody = document.getElementById('rankingTableBody');
    tbody.innerHTML = filtrado.map((jugador, index) => `
        <tr>
            <td class="position">${index + 1}</td>
            <td>
                <div style="display: flex; align-items: center;">
                    <div class="avatar">${jugador.avatar}</div>
                    <div>
                        <div style="font-weight: 600; color: #333;">${jugador.nombre}</div>
                        <div style="font-size: 0.9rem; color: #666;">${jugador.tag}</div>
                    </div>
                </div>
            </td>
            <td><strong style="color: #ff6b6b;">${jugador.puntos}</strong></td>
            <td>${jugador.torneos}</td>
            <td>${jugador.winrate}</td>
            <td><i class="fas fa-${obtenerIconoMain(jugador.main)}" style="color: #667eea;"></i> ${jugador.main}</td>
        </tr>
    `).join('');
}

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Chat functions
function enviarMensaje() {
    const input = document.getElementById('chatInput');
    const mensaje = input.value.trim();
    
    if (mensaje && usuarioActual) {
        mensajesChat.push({
            usuario: usuarioActual.nombre,
            mensaje: mensaje,
            fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        });
        input.value = '';
        cargarChat();
        localStorage.setItem('chatMensajes', JSON.stringify(mensajesChat));
    }
}

// Admin functions
function mostrarTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function agregarPuntos() {
    const jugador = document.getElementById('adminJugador').value;
    const puntos = parseInt(document.getElementById('puntosAdmin').value);
    
    const jugadorEncontrado = rankingData.find(j => 
        j.nombre.toLowerCase() === jugador.toLowerCase()
    );
    
    if (jugadorEncontrado && puntos) {
        jugadorEncontrado.puntos += puntos;
        cargarRanking();
        alert(`¡${puntos} puntos agregados a ${jugadorEncontrado.nombre}!`);
        document.getElementById('adminJugador').value = '';
        document.getElementById('puntosAdmin').value = '';
    }
}

function agregarTorneo() {
    const nombre = document.getElementById('torneoNombre').value;
    const link = document.getElementById('torneoLink').value;
    const fecha = document.getElementById('torneoFecha').value;
    
    if (nombre && link && fecha) {
        torneos.unshift({ nombre, link, fecha });
        cargarTorneos();
        alert('¡Torneo agregado!');
        document.getElementById('torneoNombre').value = '';
        document.getElementById('torneoLink').value = '';
        document.getElementById('torneoFecha').value = '';
    }
}

function agregarNoticia() {
    const contenido = document.getElementById('nuevaNoticia').value.trim();
    if (contenido) {
        noticias.unshift({
            titulo: `Nueva actualización ${new Date().toLocaleDateString('es-ES')}`,
            contenido: contenido,
            fecha: new Date().toLocaleDateString('es-ES')
        });
        cargarNoticias();
        document.getElementById('nuevaNoticia').value = '';
        alert('¡Noticia publicada!');
    }
}

function borrarChat() {
    if (confirm('¿Estás seguro de borrar todo el chat?')) {
        mensajesChat = [];
        cargarChat();
        localStorage.removeItem('chatMensajes');
    }
}

function obtenerIconoMain(main) {
    const iconos = {
        'Pyra': 'fire',
        'Wolf': 'paw',
        'Sonic': 'bolt',
        // Agregar más mappings
    };
    return iconos[main] || 'user';
}

// Enter key handlers
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviarMensaje();
});

// Cargar datos del localStorage
function cargarDatosLocal() {
    const chatGuardado = localStorage.getItem('chatMensajes');
    if (chatGuardado) {
        mensajesChat = JSON.parse(chatGuardado);
        cargarChat();
    }
}

cargarDatosLocal();