import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import SearchForm from './components/SearchForm';
import Banner from './container/Banner';

export default function Router() {
  render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/search"
            element={
              <Banner>
                <SearchForm />
                <Link to="/ad">AD</Link>
              </Banner>
            }
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
  );
}
