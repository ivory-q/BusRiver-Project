import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './container/Search';
import Seat from './container/Seat';
import Credentials from './components/Credentials';
import Payment from './components/Payment';

import { rootStore, StoreProvider } from './stores/index.store';
import Result from './components/Result';

export default function Router() {
  render(
    <StrictMode>
      <BrowserRouter>
        <StoreProvider value={rootStore}>
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/seat" element={<Seat />} />
            <Route path="/passengers" element={<Credentials />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
  );
}
