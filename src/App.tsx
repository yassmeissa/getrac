import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Products, ProductDetail, Contact,  NotFound } from './pages';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './App.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import RequireAdminAuth from './pages/admin/RequireAdminAuth';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <RequireAdminAuth>
              <Dashboard />
            </RequireAdminAuth>
          } />
          {/* Routes utilisateur classique */}
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/products" element={<><Header /><Products /><Footer /></>} />
          <Route path="/products/:id" element={<><Header /><ProductDetail /><Footer /></>} />
          <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
          <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
          <Route path="/wishlist" element={<><Header /><Wishlist /><Footer /></>} />
          <Route path="/terms" element={<><Header /><Terms /><Footer /></>} />
          <Route path="/privacy" element={<><Header /><Privacy /><Footer /></>} />
          <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

