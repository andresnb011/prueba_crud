import React, { useEffect, useState } from 'react';

export default function ItemForm({ onCreate, editing, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editing) {
      setName(editing.name || '');
      setDescription(editing.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    const payload = { name, description };
    if (editing) onUpdate(editing.id, payload);
    else onCreate(payload);
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 10 }}>
      <div>
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
      </div>
    </form>
  );
}
