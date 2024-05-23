const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017'; // Cambia la URI según tu configuración
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
  const db = client.db('nombre_de_tu_base_de_datos');

  // Crea la colección "eventos"
  const eventosCollection = db.collection('eventos');
  console.log('Colección "eventos" creada');

  // Crea la colección "usuarios"
  const usuariosCollection = db.collection('usuarios');
  console.log('Colección "usuarios" creada');

  // Operaciones CRUD para eventos
  const crearEvento = async (nombreEvento, fechaEvento, descripcion) => {
    const evento = {
      nombre: nombreEvento,
      fecha: fechaEvento,
      descripcion: descripcion,
    };

    try {
      await eventosCollection.insertOne(evento);
      console.log('Evento creado exitosamente');
    } catch (err) {
      console.error('Error al crear el evento:', err);
    }
  };

  const leerEventos = async () => {
    try {
      const eventos = await eventosCollection.find().toArray();
      return eventos;
    } catch (err) {
      console.error('Error al leer los eventos:', err);
      return [];
    }
  };

  const actualizarEvento = async (id, nombreEvento, fechaEvento, descripcion) => {
    try {
      await eventosCollection.updateOne(
        { _id: MongoClient.ObjectId(id) },
        { $set: { nombre: nombreEvento, fecha: fechaEvento, descripcion: descripcion } }
      );
      console.log('Evento actualizado exitosamente');
    } catch (err) {
      console.error('Error al actualizar el evento:', err);
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await eventosCollection.deleteOne({ _id: MongoClient.ObjectId(id) });
      console.log('Evento eliminado exitosamente');
    } catch (err) {
      console.error('Error al eliminar el evento:', err);
    }
  };
});

module.exports = {
  eventosCollection,
  usuariosCollection,
  crearEvento,
  leerEventos,
  actualizarEvento,
  eliminarEvento,
};