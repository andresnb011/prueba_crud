import React, { useEffect, useState } from 'react';
import api from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get('/items');
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const createItem = async (data) => {
    await api.post('/items', data);
    load();
  };

  const updateItem = async (id, data) => {
    await api.put(`/items/${id}`, data);
    setEditing(null);
    load();
  };

  const deleteItem = async (id) => {
    await api.delete(`/items/${id}`);
    load();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>CRUD simple - React + Express</h2>
      <ItemForm onCreate={createItem} onUpdate={updateItem} editing={editing} onCancel={() => setEditing(null)} />
      <hr />
      <ItemList items={items} onEdit={(i) => setEditing(i)} onDelete={deleteItem} />
    </div>
  );
}
