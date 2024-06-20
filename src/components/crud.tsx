import React, { useState, useEffect } from 'react';
import api from '../api';

interface Item {
  id: number;
  name: string;
}

const Crud: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/items', { name: item });
      setItems([...items, response.data]);
      setItem('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await api.delete(/api/items/${id});
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>CRUD</h2>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;