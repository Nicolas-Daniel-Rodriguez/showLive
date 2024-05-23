const express = require('express');
const app = express();
const port = 3000;
const { autenticarUsuario, verificarToken } = require('./auth');

app.use(express.json()); // Middleware para analizar cuerpos de solicitud JSON

app.get('/', (req, res) => {
  res.send('¡Servidor web funcionando!');
});

app.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  const token = await autenticarUsuario(email, password);

  if (!token) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token' });
  }

  const decodedToken = verificarToken(token);
  if (!decodedToken) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Si el token es válido, puedes acceder al email del usuario desde decodedToken.email
  req.user = decodedToken.email;
  next();
};

app.get('/eventos', authMiddleware, (req, res) => {
  // Aquí puedes obtener los eventos de la base de datos y enviarlos como respuesta
  // Solo los usuarios autenticados podrán acceder a esta ruta
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});