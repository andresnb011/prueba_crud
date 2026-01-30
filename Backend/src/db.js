const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba_crud'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('La base de datos no existe. Creándola...');
      const tempDb = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
      });
      tempDb.query('CREATE DATABASE IF NOT EXISTS prueba_crud', (err2) => {
        if (err2) {
          console.error('Error creando DB:', err2.message);
        } else {
          console.log('DB creada. Reconectando...');
          tempDb.end();
          db.connect((err3) => {
            if (err3) {
              console.error('Error reconectando:', err3.message);
            } else {
              console.log('Reconectado a MySQL');
              createTable();
            }
          });
        }
      });
    }
  } else {
    console.log('Conectado a MySQL');
    createTable();
  }
});

function createTable() {
  const initSql = `
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  documento VARCHAR(255) NOT NULL UNIQUE,
  correo VARCHAR(255) NOT NULL,
  estado VARCHAR(50) NOT NULL
);
  `;
  db.query(initSql, (err) => {
    if (err) {
      console.error('Error creando tabla:', err.message);
    } else {
      console.log('Tabla clientes creada o ya existe');
    }
  });
}

module.exports = db;
