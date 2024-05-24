import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventCartelera() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const respuesta = await axios.get('/api/eventos');
        setEventos(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    obtenerEventos();
  }, []);

  return (
    <div>
      <h1>Cartelera de eventos</h1>
      <ul>
        {eventos.map((evento) => (
          <li key={evento._id}>
            <h2>{evento.nombre}</h2>
            <p>Fecha: {evento.fecha}</p>
            <p>{evento.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventCartelera;