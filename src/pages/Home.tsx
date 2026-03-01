import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Sparkles, 
  Monitor, 
  Smartphone, 
  Printer, 
  Tv 
} from 'lucide-react';
import { ProductCard } from '../components';
import { productService, categoryService } from '../services/api';
import type { Product, Category } from '../types';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAll();
        // Mélange les produits et en prend 6 au hasard
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getAll();
        setCategories(cats);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      
      {/* Hero Section - Avec le gradient Sarcelle/Cyan choisi */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#115E59] to-[#0F766E] text-white py-24 animate-fadeIn">
        {/* Décoration d'arrière-plan abstraite */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#9bd4d0] opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 flex flex-col gap-6 items-start">
            
            {/* Badge Localisation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-medium mb-2 shadow-sm">
              <Sparkles size={16} className="text-[#9bd4d0]" />
              <span>Votre partenaire technologique à Dakar</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              L'excellence IT <br/> au cœur du Sénégal
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg mb-2">
              Explorez notre catalogue et découvrez des équipements informatiques soigneusement sélectionnés pour la performance de votre entreprise.
            </p>
            
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              {/* Bouton Primaire (Solid - Vert clair pour le contraste) */}
              <Link to="/products" className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 bg-[#9bd4d0] text-[#054d3b] font-bold rounded-xl px-8 py-4 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20">
                Voir le catalogue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Bouton Secondaire (Outline) */}
              <Link to="/contact" className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl px-8 py-4 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                Demander un devis
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block flex-1">
            <div className="relative">
              {/* Ombre colorée derrière l'image */}
              <div className="absolute inset-0 bg-[#9bd4d0] rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Matériel informatique"
                className="relative rounded-2xl shadow-2xl object-cover h-[450px] w-full animate-slideUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raccourcis Catégories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {categories.map((cat, idx) => (
              <Link key={cat.id} to={`/category/${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 rounded-full bg-[#e6f2f0] text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300 shadow-sm">
                  {/* Optionnel: afficher une icône si présente, sinon une icône par défaut */}
                  {cat.icon ? (
                    <img src={cat.icon} alt={cat.name} className="w-7 h-7 object-contain" />
                  ) : (
                    <Monitor size={24} />
                  )}
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-[#0F766E] transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Adaptée au marché local */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Truck size={28} />, title: 'Livraison Express', desc: 'Livraison rapide partout à Dakar et expédition sécurisée en région.' },
              { icon: <ShieldCheck size={28} />, title: 'Paiement Sécurisé', desc: 'Produits garantis. Paiement par Wave, Orange Money ou à la livraison.' },
              { icon: <Headphones size={28} />, title: 'Support Technique', desc: 'Une équipe locale à votre écoute pour vous conseiller 7j/7.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-[#e6f2f0] text-[#0F766E] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
                Derniers Arrivages
              </h2>
              <p className="text-gray-500 text-lg">
                Notre sélection d'équipements récents des plus grandes marques.
              </p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-[#0F766E] font-semibold hover:gap-3 transition-all">
              Voir tout le catalogue <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            /* Squelettes de chargement modernes */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-100 rounded-2xl h-[400px] animate-pulse flex flex-col justify-end p-6">
                  <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} hideDiscount />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 font-semibold rounded-xl px-6 py-3 hover:bg-gray-200 transition-colors">
              Voir tous les produits <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section B2B / Entreprises - Design Newsletter conservé */}
      <section className="py-12 px-6 lg:px-12 bg-white pb-24">
        <div className="max-w-5xl mx-auto bg-[#00353F] rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Cercle décoratif */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Équipez votre entreprise
              </h2>
              <p className="text-[#9bd4d0] text-lg max-w-md mx-auto md:mx-0">
                Vous avez un projet d'infrastructure ou un besoin en volume ? Nos conseillers sont là pour vous proposer les meilleurs tarifs.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://wa.me/221776347475?text=Bonjour%20Getrac%20Services%2C%20je%20souhaite%20plus%20d'informations%20!" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 justify-center bg-[#25D366] text-white font-bold px-6 py-4 rounded-xl hover:bg-[#128C7E] transition-colors duration-300 shadow-lg text-center flex items-center gap-2"
                >
                  <Headphones size={20} />
                  Contact WhatsApp
                </a>
                <Link 
                  to="/contact" 
                  className="bg-white/10 border border-white/20 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition-colors duration-300 text-center"
                >
                  Nous écrire
                </Link>
              </div>
              <p className="text-[#9bd4d0]/60 text-sm mt-3 text-center md:text-left">
                Réponse garantie en moins de 24h ouvrées.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};