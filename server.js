const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SGV',
  password: 'contrasenia',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.get('/lista_clientes', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT nombre, direccion, telefono, correo
        FROM clientes;
      `);
      res.json(result.rows);
    } catch (err) {
      console.error('Error ejecutando la consulta', err.stack);
      res.status(500).json({ error: 'Error obteniendo los clientes' });
    }
  });
// Ruta para obtener la lista de clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.status(500).json({ error: 'Error obteniendo los clientes' });
  }
});

app.get('/mascotas', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM mascotas');
      res.json(result.rows);
    } catch (err) {
      console.error('Error ejecutando la consulta', err.stack);
      res.status(500).json({ error: 'Error obteniendo las mascotas' });
    }
  });
  app.get('/lista_mascotas', async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT mascotas.nombre, mascotas.especie, mascotas.raza, mascotas.edad, mascotas.genero, mascotas.cliente_id
FROM mascotas;


      `);
      res.json(result.rows);
    } catch (err) {
      console.error('Error ejecutando la consulta', err.stack);
      res.status(500).json({ error: 'Error obteniendo las mascotas' });
    }
  });
// Ruta para ver las citas
app.get('/ver_citas', async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT cl.nombre AS cliente, m.nombre AS mascota, v.nombre AS veterinario, c.fecha, c.hora
    FROM citas c
    INNER JOIN clientes cl ON c.citas_cliente_id = c.citas_id
    INNER JOIN mascotas m ON c.citas_mascota_id = m.mascota_id
    INNER JOIN veterinarios v ON c.citas_veterinario_id = v.id;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.status(500).json({ error: 'Error obteniendo las citas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
