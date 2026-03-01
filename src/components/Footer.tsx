import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categoryService } from '../services/api';
import logo from '../assets/logo-getrac.png'; 

export const Footer = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService.getAll()
      .then((data) => {
        // Normalisation immédiate des IDs pour éviter les bugs de liens
        const normalized = data.map((cat: any) => ({
          ...cat,
          id: cat.id || cat.idcategory || cat.idCategory
        }));
        setCategories(normalized);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des catégories');
        setLoading(false);
      });
  }, []);

  return (
    <footer className="bg-gray-50 text-gray-600 mt-24 border-t border-gray-200">
      <div className="container-max mx-auto px-6 lg:px-12 py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          {/* Section: À propos */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Getrac Logo" className="h-14 w-auto object-contain" />
              <div className="flex flex-col">
                <h3 className="text-[#115E59] text-2xl font-black tracking-tighter leading-none">GETRAC</h3>
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Services</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              Votre partenaire de confiance au Sénégal pour l'équipement informatique professionnel et les solutions télécoms de pointe. Expert en infrastructure IT depuis Dakar.
            </p>
          </div>

          {/* Section: Navigation rapide */}
          <div>
            <h4 className="text-gray-900 text-lg font-black mb-8 border-b-2 border-[#115E59] inline-block pb-1">Navigation</h4>
            <ul className="space-y-4">
              {[{ label: 'Accueil', to: '/' }, { label: 'Catalogue', to: '/products' }, { label: 'Contact', to: '/contact' }].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to}
                    className="group text-gray-500 hover:text-[#115E59] transition-all flex items-center gap-2 font-medium"
                  >
                    <ChevronRight size={14} className="text-[#9bd4d0] group-hover:translate-x-1 transition-transform" /> 
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Catégories dynamiques */}
          <div>
            <h4 className="text-gray-900 text-lg font-black mb-8 border-b-2 border-[#115E59] inline-block pb-1">Catégories</h4>
            <ul className="space-y-4">
              {loading && <li className="text-gray-400 animate-pulse text-sm">Récupération des catégories...</li>}
              {error && <li className="text-red-400 text-xs italic">{error}</li>}
              {!loading && !error && categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.id}`}
                    className="group text-gray-500 hover:text-[#115E59] transition-all flex items-center gap-2 font-medium"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9bd4d0] group-hover:bg-[#115E59] transition-colors"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Contact Direct */}
          <div>
            <h4 className="text-gray-900 text-lg font-black mb-8 border-b-2 border-[#115E59] inline-block pb-1">Nous trouver</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={22} className="text-[#115E59] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold text-sm">Dakar, Sénégal</span>
                  <span className="text-xs text-gray-400">Siège social & Logistique</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone size={22} className="text-[#115E59] shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+221338250093" className="hover:text-[#115E59] transition-colors font-bold text-gray-900">+221 33 825 00 93</a>
                  <a href="tel:+221776347475" className="hover:text-[#115E59] transition-colors text-xs text-gray-500">SAV: +221 77 634 74 75</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={22} className="text-[#115E59] shrink-0" />
                <a href="mailto:servicesgetrac@gmail.com" className="hover:text-[#115E59] transition-colors break-all font-bold text-gray-900 text-sm">
                  servicesgetrac@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de pied de page (Copyright & Legal) */}
        <div className="border-t border-gray-200 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-xs text-gray-400 font-bold tracking-wider">
              © {new Date().getFullYear()} <span className="text-[#115E59]">GETRAC SERVICES</span>. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black uppercase tracking-widest">
              <Link to="/privacy" className="text-gray-400 hover:text-[#115E59] transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#115E59] transition-colors">
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};