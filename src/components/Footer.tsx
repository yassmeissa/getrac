import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
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
      <div className="container mx-auto px-6 lg:px-12 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Getrac Logo" className="h-10 w-10 object-contain p-1" />
              {/* Titre passé en vert foncé */}
              <h3 className="text-[#054d3b] text-xl font-bold">Getrac Services</h3>
            </div>
            {/* Texte passé en gris moyen */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Votre partenaire de confiance au Sénégal pour l'équipement informatique professionnel et particulier.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* Titre passé en gris très foncé */}
            <h4 className="text-gray-900 text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#054d3b] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#054d3b] opacity-0 hover:opacity-100 transition-opacity"></span> Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-[#054d3b] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#054d3b] opacity-0 hover:opacity-100 transition-opacity"></span> Catalogue
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#054d3b] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#054d3b] opacity-0 hover:opacity-100 transition-opacity"></span> À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#054d3b] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#054d3b] opacity-0 hover:opacity-100 transition-opacity"></span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-6">Catégories</h4>
            <ul className="space-y-3">
              {loading && <li className="text-gray-400">Chargement...</li>}
              {error && <li className="text-red-500">{error}</li>}
              {!loading && !error && categories.length === 0 && (
                <li className="text-gray-400">Aucune catégorie</li>
              )}
              {!loading && !error && categories.map((cat) => (
                <li key={cat.id ?? cat.name}>
                  <Link to={`/category/${cat.id}`} className="text-gray-600 hover:text-[#054d3b] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-6">Contactez-nous</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {/* Icônes passées en vert foncé */}
                <MapPin size={20} className="text-[#054d3b] shrink-0 mt-1" />
                <span className="text-gray-600">Dakar, Sénégal<br/></span>
              </div>
              
              {/* Affichage des 3 numéros de téléphone */}
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#054d3b] shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <a href="tel:+221338250093" className="text-gray-600 hover:text-[#054d3b] transition-colors">+221 33 825 00 93</a>
                  <a href="tel:+2217763447475" className="text-gray-600 hover:text-[#054d3b] transition-colors">+221 77 634 74 75</a>
                  <a href="tel:+221776444454" className="text-gray-600 hover:text-[#054d3b] transition-colors">+221 77 644 44 54</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#054d3b] shrink-0" />
                <a href="mailto:contact@getracservices.com" className="text-gray-600 hover:text-[#054d3b] transition-colors break-all">contact@getracservices.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* Bordure passée en gris au lieu de blanc transparent */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} GetRac Services. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-[#054d3b] transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-[#054d3b] transition-colors">
                Conditions générales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};