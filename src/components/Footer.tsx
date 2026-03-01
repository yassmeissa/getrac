import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categoryService } from '../services/api';
import logo from '../assets/logo-getrac.png'; 
import type { Category } from '../types';

export const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService.getAll()
      .then((data) => {
        // On s'assure que les données sont bien chargées
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des catégories');
        setLoading(false);
      });
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-600 mt-20 font-sans border-t border-gray-200">
      <div className="container-max mx-auto px-6 lg:px-12 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section: À propos */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Getrac Logo" className="h-12 w-auto object-contain" />
              <h3 className="text-[#115E59] text-xl font-bold tracking-tight">Getrac Services</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Votre partenaire de confiance au Sénégal pour l'équipement informatique professionnel et les solutions télécoms de pointe.
            </p>
            <div className="flex gap-4">
              {/* Tu pourras ajouter tes réseaux sociaux ici plus tard */}
            </div>
          </div>

          {/* Section: Navigation rapide */}
          <div>
            <h4 className="text-gray-900 text-lg font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="group text-gray-600 hover:text-[#115E59] transition-colors flex items-center gap-2">
                  <ChevronRight size={14} className="text-[#9bd4d0] group-hover:translate-x-1 transition-transform" /> 
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="group text-gray-600 hover:text-[#115E59] transition-colors flex items-center gap-2">
                  <ChevronRight size={14} className="text-[#9bd4d0] group-hover:translate-x-1 transition-transform" /> 
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group text-gray-600 hover:text-[#115E59] transition-colors flex items-center gap-2">
                  <ChevronRight size={14} className="text-[#9bd4d0] group-hover:translate-x-1 transition-transform" /> 
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Catégories dynamiques */}
          <div>
            <h4 className="text-gray-900 text-lg font-bold mb-6">Catégories</h4>
            <ul className="space-y-4">
              {loading && <li className="text-gray-400 animate-pulse">Chargement...</li>}
              {error && <li className="text-red-400 text-sm">{error}</li>}
              {!loading && !error && categories.slice(0, 5).map((cat) => (
                <li key={cat.id || cat.name}>
                  {/* Note: On utilise idCategory car c'est le nom dans ta base MySQL */}
                  <Link 
                    to={`/products?category=${cat.id}`} 
                    className="group text-gray-600 hover:text-[#115E59] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#9bd4d0]"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Contact Direct */}
          <div>
            <h4 className="text-gray-900 text-lg font-bold mb-6">Contactez-nous</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#115E59] shrink-0 mt-1" />
                <span className="text-gray-600">Dakar, Sénégal<br/><span className="text-xs text-gray-400">Siège social</span></span>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#115E59] shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <a href="tel:+221338250093" className="hover:text-[#115E59] transition-colors font-medium text-gray-700">+221 33 825 00 93</a>
                  <a href="tel:+221776347475" className="hover:text-[#115E59] transition-colors text-sm">+221 77 634 74 75</a>
                  <a href="tel:+221776444454" className="hover:text-[#115E59] transition-colors text-sm">+221 77 644 44 54</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#115E59] shrink-0" />
                <a href="mailto:servicesgetrac@gmail.com" className="hover:text-[#115E59] transition-colors break-all font-medium text-gray-700">
                  servicesgetrac@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de pied de page (Copyright & Legal) */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-500 font-medium">
              © {new Date().getFullYear()} <span className="text-[#115E59]">Getrac Services</span>. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-[#115E59] transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-[#115E59] transition-colors">
                Conditions de vente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};