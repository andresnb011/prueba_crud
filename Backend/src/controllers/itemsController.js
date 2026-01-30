const db = require('../db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { nombre, documento, correo, estado } = req.body;
  if (!nombre || !documento || !correo || !estado) return res.status(400).json({ error: 'Todos los campos son requeridos' });
  db.query('INSERT INTO clientes (nombre, documento, correo, estado) VALUES (?, ?, ?, ?)', [nombre, documento, correo, estado], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    const id = result.insertId;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err2, results) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(results[0]);
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { nombre, documento, correo, estado } = req.body;
  db.query(
    'UPDATE clientes SET nombre = ?, documento = ?, correo = ?, estado = ? WHERE id = ?',
    [nombre, documento, correo, estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      db.query('SELECT * FROM clientes WHERE id = ?', [id], (err2, results) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(results[0]);
      });
    }
  );
};

exports.remove = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  });
};
