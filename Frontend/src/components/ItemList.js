import React from 'react';

export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div>
      <h3>Items</h3>
      {items.length === 0 && <div>No hay items aún.</div>}
      <ul>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 6 }}>
            <strong>{it.name}</strong> — {it.description}
            <div>
              <button onClick={() => onEdit(it)}>Editar</button>
              <button onClick={() => onDelete(it.id)} style={{ marginLeft: 8 }}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
