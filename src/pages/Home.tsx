import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Sparkles, 
  Monitor 
} from 'lucide-react';
import { ProductCard } from '../components';
import { productService, categoryService } from '../services/api';
import type { Product } from '../types';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction utilitaire pour extraire l'ID du produit (Postgres compatibility)
  const getPID = (p: any) => p?.id || p?.idProduct || p?.idproduct;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          productService.getAll(),
          categoryService.getAll()
        ]);

        // Mélange les produits et en prend 6 au hasard (clone le tableau pour éviter les mutations)
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 6));

        // Normalisation des catégories pour Postgres (idcategory / idCategory / id)
        const normalizedCats = cats.map((cat: any) => ({
          id: cat.id || cat.idcategory || cat.idCategory,
          name: cat.name,
          icon: cat.icon
        }));
        setCategories(normalizedCats);
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen text-gray-800">
      
      {/* Hero Section - Identité #115E59 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#115E59] to-[#0D4A46] text-white py-24 animate-fadeIn">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#9bd4d0] opacity-10 blur-3xl"></div>
        
        <div className="container-max mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 flex flex-col gap-6 items-start">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-medium mb-2">
              <Sparkles size={16} className="text-[#9bd4d0]" />
              <span>Expert High-Tech au Sénégal</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              L'excellence IT <br/> à votre portée
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg mb-2">
              Getrac Services vous accompagne dans votre transformation digitale avec les meilleures marques de matériel informatique et télécoms.
            </p>
            
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Link to="/products" className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 bg-[#9bd4d0] text-[#115E59] font-bold rounded-xl px-8 py-4 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20">
                Explorer le catalogue
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl px-8 py-4 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                Contactez-nous
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-[#9bd4d0] rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="Matériel informatique Getrac"
                className="relative rounded-3xl shadow-2xl object-cover h-[450px] w-full animate-slideUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raccourcis Catégories - Corrigé pour le filtrage par ID */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-6 lg:px-12 text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Parcourir par catégorie</h2>
        </div>
        <div className="container-max mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/products?category=${cat.id}`} 
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gray-50 text-[#115E59] flex items-center justify-center group-hover:bg-[#115E59] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#115E59]/20 transition-all duration-300">
                  {cat.icon ? (
                    <img src={cat.icon} alt={cat.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <Monitor size={32} />
                  )}
                </div>
                <span className="font-bold text-gray-700 group-hover:text-[#115E59] transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features - #115E59 accents */}
      <section className="py-24 bg-gray-50">
        <div className="container-max mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Truck size={28} />, title: 'Livraison Rapide', desc: 'Distribution partout au Sénégal, de Dakar à l\'intérieur du pays.' },
              { icon: <ShieldCheck size={28} />, title: 'Paiement Sécurisé', desc: 'Réglez en toute confiance via Wave, Orange Money ou à la livraison.' },
              { icon: <Headphones size={28} />, title: 'Expertise & Conseil', desc: 'Une équipe de techniciens locaux pour vous accompagner 7j/7.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#115E59]/5 text-[#115E59] flex items-center justify-center mb-6 group-hover:bg-[#115E59] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container-max mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
                Derniers Arrivages
              </h2>
              <p className="text-gray-500 text-lg">
                Découvrez les nouveautés technologiques disponibles en stock.
              </p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-[#115E59] font-bold hover:gap-4 transition-all">
              Tout le catalogue <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-100 rounded-3xl h-[450px] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-slideUp">
              {featuredProducts.map((product) => (
                <ProductCard key={getPID(product)} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section CTA B2B - Harmonie #115E59 */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto bg-[#115E59] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
          
          <div className="relative z-10 p-12 md:p-20 text-center md:text-left flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-6 text-white leading-tight">
                Besoin d'un devis pour votre entreprise ?
              </h2>
              <p className="text-[#9bd4d0] text-xl mb-0 leading-relaxed">
                Matériel bureautique, serveurs ou infrastructure réseau : nous proposons des tarifs préférentiels pour les professionnels.
              </p>
            </div>
            
            <div className="w-full max-w-sm flex flex-col gap-4">
              <a 
                href="https://wa.me/221776347475" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white font-bold px-8 py-5 rounded-2xl hover:bg-[#1DA851] transition-all shadow-xl text-center flex items-center justify-center gap-3 text-lg"
              >
                <Headphones size={24} />
                Contact via WhatsApp
              </a>
              <Link 
                to="/contact" 
                className="w-full bg-white/10 border border-white/20 text-white font-bold px-8 py-5 rounded-2xl hover:bg-white/20 transition-all text-center text-lg"
              >
                Demander un devis par mail
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};