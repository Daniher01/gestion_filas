const chatSocketUrl = 'ws://127.0.0.1:8000/ws/chat/tablaPacientes/';
let chatSocket = null;

// Función para conectar o reconectar al WebSocket
function connectWebSocket() {
    chatSocket = new WebSocket(chatSocketUrl);

    chatSocket.onopen = () => {
        console.log('WebSocket conectado');
    };
}

// Inicia la conexión WebSocket
connectWebSocket();

chatSocket.onclose = (event) => {
    console.log('WebSocket desconectado. Intentando reconexión...');
    setTimeout(connectWebSocket, 3000);  // Intenta reconectar después de 3 segundos
};