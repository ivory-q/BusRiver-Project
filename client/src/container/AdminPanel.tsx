import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminStore } from '../stores/admin.store';
import TabGroup from '../components/Tabs';

import '../styles/seat.css';

export default function AdminPanel() {
  let navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(adminStore.username);
    if (!adminStore.isAuth) {
      navigate('/admin');
    }
  }, []);

  return (
    <main>
      <section id="seat">
        <h1>Добро пожаловать в админ панель!</h1>
        <TabGroup />
      </section>
    </main>
  );
}
