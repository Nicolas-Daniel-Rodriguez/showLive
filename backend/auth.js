const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017'; // Cambia la URI según tu configuración

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const secretKey = 'tu_clave_secreta'; // Cambia esta clave por una clave secreta más segura

client.connect(async (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conexión exitosa a la base de datos');
  const db = client.db('nombre_de_tu_base_de_datos');
  const usuariosCollection = db.collection('usuarios');

  // Función para registrar un nuevo usuario
  const registrarUsuario = async (email, password) => {
    // Verificar si el usuario ya existe
    const usuarioExistente = await usuariosCollection.findOne({ email });
    if (usuarioExistente) {
      console.log('El usuario ya está registrado');
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = {
      email,
      password: hashedPassword,
    };

    try {
      await usuariosCollection.insertOne(nuevoUsuario);
      console.log('Usuario registrado exitosamente');
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
    }
  };

  // Función para autenticar a un usuario y generar un token JWT
  const autenticarUsuario = async (email, password) => {
    // Buscar al usuario en la base de datos por su correo electrónico
    const usuario = await usuariosCollection.findOne({ email });
    if (!usuario) {
      console.log('Usuario no encontrado');
      return null;
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      console.log('Contraseña incorrecta');
      return null;
    }

    // Si las credenciales son válidas, generar un token JWT
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
  };

  // Función para verificar si un token JWT es válido
  const verificarToken = (token) => {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      return decodedToken;
    } catch (err) {
      console.error('Error al verificar el token:', err);
      return null;
    }
  };

  module.exports = {
    registrarUsuario,
    autenticarUsuario,
    verificarToken,
  };
});