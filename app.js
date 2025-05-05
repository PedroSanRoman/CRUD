const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos iniciales
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// GET /usuarios - Lista todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET /usuarios/:nombre - Obtiene un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

// POST /usuarios - Crea un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;

    if (!nombre || !edad || !lugarProcedencia) {
        return res.status(400).json({ mensaje: 'Faltan datos en el cuerpo de la solicitud' });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad,
        lugarProcedencia,
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// PUT /usuarios/:nombre - Actualiza un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (index !== -1) {
        const { nombre: nuevoNombre, edad, lugarProcedencia } = req.body;
        usuarios[index] = {
            ...usuarios[index],
            nombre: nuevoNombre || usuarios[index].nombre,
            edad: edad || usuarios[index].edad,
            lugarProcedencia: lugarProcedencia || usuarios[index].lugarProcedencia,
        };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

// DELETE /usuarios/:nombre - Elimina un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const existe = usuarios.some(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (existe) {
        usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
        res.json({ mensaje: `Usuario ${nombre} eliminado correctamente` });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
