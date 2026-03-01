import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, HeartCrack, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { FlyToCartOverlay } from '../components/FlyToCartOverlay';

export const Wishlist = () => {
  const [items, setItems] = useState<(Product & { img?: string; image?: string; price?: string | number })[]>([]);
  
  // State pour l'animation du panier
  const [flyData, setFlyData] = useState<null | { 
    img: string; 
    from: { x: number; y: number; width: number; height: number }; 
    to: { x: number; y: number } 
  }>(null);

  useEffect(() => {
    const likes: (Product & { img?: string; image?: string; price?: string | number })[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('like_')) {
        const id = key.replace('like_', '');
        if (localStorage.getItem(key) && localStorage.getItem(`product_${id}`)) {
          try {
            const prod = JSON.parse(localStorage.getItem(`product_${id}`)!);
            likes.push(prod);
          } catch (e) {
            console.error("Erreur de parsing du produit", e);
          }
        }
      }
    });
    setItems(likes);
  }, []);

  const handleRemove = (id: number) => {
    localStorage.removeItem(`like_${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id && (item as any).idProduct !== id));
  };

  const handleAddToCart = (productId: number, imgSrc: string) => {
    const imgEl = document.querySelector(`#wishlist-img-${productId}`) as HTMLImageElement;
    const cartEl = document.getElementById('cart-icon'); 

    if (imgEl && cartEl) {
      const from = imgEl.getBoundingClientRect();
      const to = cartEl.getBoundingClientRect();
      
      setFlyData({
        img: imgEl.src,
        from: {
          x: from.left,
          y: from.top,
          width: from.width,
          height: from.height
        },
        to: {
          x: to.left + (to.width / 2) - (from.width / 2),
          y: to.top + (to.height / 2) - (from.height / 2)
        },
      });
    }

    // Ajout logique au panier
    const storedQty = parseInt(localStorage.getItem(`cartQty_${productId}`) || '0', 10);
    const newQty = (isNaN(storedQty) ? 0 : storedQty) + 1;
    localStorage.setItem(`cartQty_${productId}`, String(newQty));
  };

  const formatPrice = (price?: string | number) => {
    if (price === undefined) return '—';
    const numPrice = Number(String(price).replace(/[^\d.]/g, ''));
    return isNaN(numPrice) ? '—' : `${numPrice.toLocaleString('fr-FR')} F CFA`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max mx-auto px-4">
        
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Coups de Cœur</h1>
            <p className="text-gray-600">
              {items.length} article{items.length !== 1 ? 's' : ''} sauvegardé{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          // État vide corrigé (sans accolade JSX)
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartCrack size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Votre wishlist est vide</h2>
            <p className="text-gray-500 mb-8 text-lg">
              Vous n'avez pas encore trouvé la perle rare ? Découvrez notre catalogue et sauvegardez vos articles préférés !
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
            >
              Explorer les produits
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          // Grille corrigée
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const productId = item.id || (item as any).idProduct;

              return (
                <div 
                  key={productId} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img 
                      id={`wishlist-img-${productId}`} // ID unique pour l'animation
                      src={item.img || item.image || 'https://via.placeholder.com/300'} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => handleRemove(productId)} 
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                      title="Retirer de la wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs font-bold text-[#115E59] uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    
                    <Link to={`/products/${productId}`} className="group-hover:text-[#115E59] transition-colors">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-4">
                      <div className="text-xl font-extrabold text-gray-900 mb-4">
                        {formatPrice(item.price)}
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(productId, item.img || item.image || 'https://via.placeholder.com/300')}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-2.5"
                      >
                        <ShoppingCart size={18} />
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Le portail d'animation */}
        {flyData && (
          <FlyToCartOverlay
            img={flyData.img}
            from={flyData.from}
            to={flyData.to}
            onEnd={() => setFlyData(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;