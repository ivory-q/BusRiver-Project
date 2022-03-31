import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Search from './container/Search';

export default function Router() {
  render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
  );
}
