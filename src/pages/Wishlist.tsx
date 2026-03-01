import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, HeartCrack, ArrowRight } from 'lucide-react';
import { FlyToCartOverlay } from '../components/FlyToCartOverlay';

export const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  
  const [flyData, setFlyData] = useState<null | { 
    img: string; 
    from: { x: number; y: number; width: number; height: number }; 
    to: { x: number; y: number } 
  }>(null);

  // Fonction utilitaire pour extraire l'ID peu importe la casse
  const getProductId = (item: any) => item?.id || item?.idProduct || item?.idproduct;

  useEffect(() => {
    const likes: any[] = [];
    Object.keys(localStorage).forEach((key) => {
      // On ignore explicitement 'like_undefined' qui est le résultat du bug
      if (key.startsWith('like_') && key !== 'like_undefined') {
        const id = key.replace('like_', '');
        const storedProduct = localStorage.getItem(`product_${id}`);
        
        if (storedProduct) {
          try {
            const prod = JSON.parse(storedProduct);
            const realId = getProductId(prod);
            
            // Éviter les doublons dans l'affichage
            if (realId && !likes.some(p => getProductId(p) === realId)) {
              likes.push(prod);
            }
          } catch (e) {
            console.error("Erreur de parsing", e);
          }
        }
      }
    });
    setItems(likes);
  }, []);

  const handleRemove = (id: any) => {
    // On nettoie toutes les clés possibles
    localStorage.removeItem(`like_${id}`);
    localStorage.removeItem(`product_${id}`);
    
    setItems((prev) => prev.filter((item) => String(getProductId(item)) !== String(id)));
  };

  const handleAddToCart = (productId: any) => {
    const imgEl = document.querySelector(`#wishlist-img-${productId}`) as HTMLImageElement;
    const cartEl = document.getElementById('cart-icon'); 

    if (imgEl && cartEl) {
      const from = imgEl.getBoundingClientRect();
      const to = cartEl.getBoundingClientRect();
      
      setFlyData({
        img: imgEl.src,
        from: { x: from.left, y: from.top, width: from.width, height: from.height },
        to: {
          x: to.left + (to.width / 2) - (from.width / 2),
          y: to.top + (to.height / 2) - (from.height / 2)
        },
      });
    }

    const storedQty = parseInt(localStorage.getItem(`cartQty_${productId}`) || '0', 10);
    localStorage.setItem(`cartQty_${productId}`, String((isNaN(storedQty) ? 0 : storedQty) + 1));
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartCrack size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Votre wishlist est vide</h2>
            <p className="text-gray-500 mb-8 text-lg">
              Explorez notre catalogue et sauvegardez vos articles préférés !
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg">
              Explorer les produits <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const productId = getProductId(item);

              return (
                <div key={productId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img 
                      id={`wishlist-img-${productId}`}
                      src={item.img || item.image || '/placeholder.png'} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => handleRemove(productId)} 
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs font-bold text-[#115E59] uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    
                    <Link to={`/products/${productId}`} className="group-hover:text-[#115E59] transition-colors">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    </Link>

                    <div className="mt-auto pt-4">
                      <div className="text-xl font-extrabold text-gray-900 mb-4">{formatPrice(item.price)}</div>
                      <button 
                        onClick={() => handleAddToCart(productId)}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-2.5"
                      >
                        <ShoppingCart size={18} /> Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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