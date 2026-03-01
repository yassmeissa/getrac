import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-getrac.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fonction pour vérifier si un lien est actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20 gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-[#054d3b] shrink-0">
            <img src={logo} alt="GetRac Logo" className="h-10 w-10 object-contain" />
            Getrac
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {[
              { path: '/', label: 'Accueil' },
              { path: '/products', label: 'Catalogue' },
              { path: '/about', label: 'À propos' },
              { path: '/contact', label: 'Contact' }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path) 
                    ? 'text-[#054d3b] border-b-2 border-[#054d3b] py-1' 
                    : 'text-gray-600 hover:text-[#0F766E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/wishlist"
              className="p-2 text-gray-600 hover:text-[#054d3b] transition-colors"
              aria-label="Voir la wishlist"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </Link>
            <Link
              to="/cart"
              id="cart-icon"
              className="p-2 text-gray-600 hover:text-[#054d3b] transition-colors"
              aria-label="Voir le panier"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#054d3b] transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            {[
              { path: '/', label: 'Accueil' },
              { path: '/products', label: 'Catalogue' },
              { path: '/about', label: 'À propos' },
              { path: '/contact', label: 'Contact' }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#e6f2f0] text-[#054d3b]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#0F766E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Icônes panier et like en mobile */}
            <div className="flex gap-4 mt-4 px-4">
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-[#054d3b] transition-colors"
                aria-label="Voir la wishlist"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </Link>
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-[#054d3b] transition-colors"
                aria-label="Voir le panier"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};