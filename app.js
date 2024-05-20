const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SGV',
  password: 'contrasenia',
  port: 5432,
});
app.post('/guardar_veterinario', async (req, res) => {
  const { id, nombre, especialidad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO veterinarios (id, nombre, especialidad) VALUES ($1, $2, $3) RETURNING *',
      [id, nombre, especialidad]
    );
    res.status(200).json({ message: 'Veterinario guardado con éxito', data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') { // Código de estado para violación de constraint de unicidad
      res.status(400).json({ error: 'Error al guardar el veterinario', reason: 'El veterinario ya existe' });
    } else {
      console.error('Error al guardar el veterinario', err.stack);
      res.status(500).json({ error: 'Error al guardar el veterinario', reason: err.message });
    }
  }
});




app.post('/guardar_cliente', async (req, res) => {
  try {
    const cliente = req.body;
    console.log('Cliente recibido:', cliente);

    // Lógica para guardar el cliente en la base de datos
    const query = 'INSERT INTO clientes (nombre, direccion, telefono, correo) VALUES ($1, $2, $3, $4)';
    const values = [cliente.nombre, cliente.direccion, cliente.telefono, cliente.email];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Cliente guardado exitosamente' });
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar el cliente:', error);
    res.status(500).json({ error: 'Error al guardar el cliente' });
  }
});
// Ruta para guardar una cita
app.post('/guardar_cita', async (req, res) => {
  try {
    const cita = req.body;
    console.log('Cita recibida:', cita);

    // Lógica para guardar la cita en la base de datos
    const query = 'INSERT INTO citas (Citas_cliente_id, Citas_mascota_id, Citas_veterinario_id, fecha, hora) VALUES ($1, $2, $3, $4, $5)';
    const values = [cita.clienteId, cita.mascotaId, cita.veterinarioId, cita.fecha, cita.hora];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json('Cita guardada exitosamente');
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar la cita:', error);
    res.status(500).json({ error: 'Error al guardar la cita' });
  }
});

// Ruta para guardar un cliente
// app.post('/guardar_cita', async (req, res) => {
//     try {
//       const cita = req.body;
//       console.log('Cita recibida:', cita);
  
//       // Lógica para guardar la cita en la base de datos
//       const query = 'INSERT INTO citas (Citas_cliente_id, Citas_mascota_id, Citas_veterinario_id, fecha, hora) VALUES ($1, $2, $3, $4, $5)';
//       const values = [cita.clienteId, cita.mascotaId, cita.veterinarioId, cita.fecha, cita.hora];
//       await pool.query(query, values);
  
//       // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
//       res.status(200).json({ status: 'success', message: 'Cita guardada exitosamente' });
//     } catch (error) {
//       // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
//       console.error('Error al guardar la cita:', error);
//       res.status(500).json({ status: 'error', error: 'Error al guardar la cita' });
//     }
//   });

// Ruta para guardar una consulta
app.post('/guardar_consulta', async (req, res) => {
  try {
    const consulta = req.body;
    console.log('Consulta recibida:', consulta);

    // Lógica para guardar la consulta en la base de datos
    const query = 'INSERT INTO consultas (nombreCliente, direccion, telefono, email, nombreMascota, especie, raza, edad, genero, fechaConsulta, diagnostico, tratamiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    const values = [
      consulta.nombreCliente,
      consulta.direccion,
      consulta.telefono,
      consulta.email,
      consulta.nombreMascota,
      consulta.especie,
      consulta.raza,
      consulta.edad,
      consulta.genero,
      consulta.fecha,
      consulta.diagnostico,
      consulta.tratamiento
    ];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Consulta guardada exitosamente' });
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar la consulta:', error);
    res.status(500).json({ error: 'Error al guardar la consulta' });
  }
});


// Ruta para guardar una factura
app.post('/guardar_factura', async (req, res) => {
  try {
    const factura = req.body;
    console.log('Factura recibida:', factura);

    // Lógica para guardar la factura en la base de datos
    const query = 'INSERT INTO facturas (factura_id, cliente_id, fecha, total) VALUES ($1, $2, $3, $4)';
    const values = [factura.facturaId, factura.clienteId, factura.fecha, factura.total];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Factura guardada exitosamente' });
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar la factura:', error);
    res.status(500).json({ error: 'Error al guardar la factura' });
  }
});







// Rutas para guardar mascotas, productos, tratamientos, etc.
// Se implementarían de manera similar a las rutas anteriores.

// Ruta para guardar una mascota
app.post('/guardar_mascota', async (req, res) => {
  try {
    const mascota = req.body;
    console.log('Mascota recibida:', mascota);

    // Verificar que el campo "nombreMascota" no sea nulo
    if (!mascota.nombre) {
      throw new Error('El campo "nombreMascota" es obligatorio');
    }

    // Lógica para guardar la mascota en la base de datos
    const query = 'INSERT INTO mascotas (nombre, especie, raza, edad, genero, cliente_id) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [mascota.nombre, mascota.especie, mascota.raza, mascota.edad, mascota.genero, mascota.clienteId];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Mascota guardada exitosamente' });
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar la mascota:', error);
    res.status(500).json({ error: error.message });
  }
});






// Ruta para guardar un producto
app.post('/guardar_producto', async (req, res) => {
  try {
    const producto = req.body;
    console.log('Producto recibido:', producto);

    // Verificar si el objeto producto tiene todas las propiedades necesarias
    if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.cantidad || !producto.productoId) {
      throw new Error('Faltan propiedades en el objeto producto');
    }

    // Lógica para guardar el producto en la base de datos
    const query = 'INSERT INTO productos (nombre, descripcion, precio, cantidad, producto_Id) VALUES ($1, $2, $3, $4, $5)';
    const values = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad, producto.productoId];
    await pool.query(query, values);

    // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Producto guardado exitosamente' });
  } catch (error) {
    // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
    console.error('Error al guardar el producto:', error);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});


// Ruta para guardar un tratamiento
// app.post('/guardar_tratamiento', async (req, res) => {
//   try {
//     const tratamiento = req.body;
//     console.log('Tratamiento recibido:', tratamiento);

//     // Lógica para guardar el tratamiento en la base de datos
//     const query = 'INSERT INTO tratamientos (nombre, descripcion, duracion) VALUES ($1, $2, $3)';
//     const values = [tratamiento.nombre, tratamiento.descripcion, tratamiento.duracion];
//     await pool.query(query, values);

//     // Si la inserción es exitosa, enviar una respuesta con un mensaje de éxito
//     res.status(200).json({ message: 'Tratamiento guardado exitosamente' });
//   } catch (error) {
//     // Si hay un error, imprimirlo en la consola y enviar una respuesta con un mensaje de error
//     console.error('Error al guardar el tratamiento:', error);
//     res.status(500).json({ error: 'Error al guardar el tratamiento' });
//   }
// });

// Rutas para otros tipos de datos (consultas, facturas, mascotas, productos, tratamientos, etc.)
// Se implementarían de manera similar a las rutas anteriores.

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
