import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Products, ProductDetail, Contact, About, NotFound } from './pages';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 animate-fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

