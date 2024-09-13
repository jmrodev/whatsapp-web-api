// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [numeroDestino, setNumeroDestino] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajesRecibidos, setMensajesRecibidos] = useState([]);

  // Función para enviar un mensaje
  const enviarMensaje = async () => {
    if (!numeroDestino || !mensaje) {
      alert('Por favor, ingresa el número de destino y el mensaje.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/whatsapp/send', {
        numeroDestino,
        mensaje,
      });
      alert('Mensaje enviado correctamente.');
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Hubo un error al enviar el mensaje.');
    }
  };

  // Función para obtener los mensajes recibidos
  const obtenerMensajes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/whatsapp/messages');
      setMensajesRecibidos(response.data.messages);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    }
  };

  // Obtener los mensajes cuando el componente se monte
  useEffect(() => {
    obtenerMensajes();
  }, []);

  return (
    <div style={styles.container}>
      <h1>WhatsApp Bot</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Número de destino (+123456789)"
          value={numeroDestino}
          onChange={(e) => setNumeroDestino(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Escribe tu mensaje aquí..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={enviarMensaje} style={styles.button}>
          Enviar Mensaje
        </button>
      </div>

      <h2>Mensajes Recibidos</h2>
      <ul style={styles.messageList}>
        {mensajesRecibidos.map((msg) => (
          <li key={msg.id} style={styles.messageItem}>
            <strong>De:</strong> {msg.from} <br />
            <strong>Mensaje:</strong> {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Estilos en línea para simplicidad
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    minHeight: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  messageList: {
    listStyleType: 'none',
    padding: 0,
  },
  messageItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default App;
