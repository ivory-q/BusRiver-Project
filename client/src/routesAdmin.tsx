import { StrictMode, useContext } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { adminStore, StoreProvider } from './stores/admin.store';
import AdminPanel from './container/AdminPanel';
import { AuthProvider } from './context/AuthProvider';
import Login from './components/Login';

export default function Router() {
  render(
    <StrictMode>
      <BrowserRouter>
        <StoreProvider value={adminStore}>
          <AuthProvider>
            <Routes>
              <Route path="/admin">
                <Route index element={<Login />} />
                <Route path="/admin/dash" element={<AdminPanel />} />
              </Route>
            </Routes>
          </AuthProvider>
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('admin-root')
  );
}
