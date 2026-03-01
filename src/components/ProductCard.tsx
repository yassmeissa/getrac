import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { FlyToCartOverlay } from './FlyToCartOverlay';

interface ProductCardProps {
  product: Product & { 
    img?: string; 
    qty?: number; 
    idProduct?: number; 
    idproduct?: number; // Ajout pour la compatibilité Postgres
    image?: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Correction cruciale : Détection de l'ID peu importe la casse (Postgres)
  const productId = product.id || product.idProduct || product.idproduct;

  const [liked, setLiked] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  const [flyData, setFlyData] = useState<null | { 
    img: string; 
    from: { x: number; y: number; width: number; height: number }; 
    to: { x: number; y: number } 
  }>(null);

  useEffect(() => {
    if (productId) {
      setLiked(!!localStorage.getItem(`like_${productId}`));
      const storedQty = parseInt(localStorage.getItem(`cartQty_${productId}`) || '0', 10);
      setCartQty(isNaN(storedQty) ? 0 : storedQty);
    }
  }, [productId]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation si le bouton est dans un Link
    if (!productId) return;

    if (liked) {
      localStorage.removeItem(`like_${productId}`);
      setLiked(false);
    } else {
      localStorage.setItem(`like_${productId}`, '1');
      localStorage.setItem(`product_${productId}`, JSON.stringify(product));
      setLiked(true);
    }
  };

  const handleAddToCart = () => {
    if (!productId) return;

    const imgEl = document.querySelector(`#product-img-${productId}`) as HTMLImageElement;
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

    const newQty = cartQty + 1;
    setCartQty(newQty);
    localStorage.setItem(`cartQty_${productId}`, String(newQty));
    localStorage.setItem(`product_${productId}`, JSON.stringify(product));
  };

  const formatPrice = (price?: string | number) => {
    if (price === undefined) return '—';
    const numPrice = Number(String(price).replace(/[^\d.]/g, ''));
    return isNaN(numPrice) ? '—' : `${numPrice.toLocaleString('fr-FR')} F CFA`;
  };

  const stock = product.stock ?? product.qty ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gray-50">
        <img
          id={`product-img-${productId}`}
          src={product.img || product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <button
          className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:scale-110 transition-all ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          onClick={handleLike}
          aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-[#115E59] uppercase tracking-widest mb-2">
          {product.category || 'Matériel IT'}
        </p>

        <Link to={`/products/${productId}`} className="hover:text-[#115E59] transition-colors">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 italic">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-black text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className={`text-xs mb-6 font-bold flex items-center gap-1.5 ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-green-600' : 'bg-red-500'}`}></span>
            {stock > 0 ? `${stock} en stock` : 'Rupture de stock'}
          </p>

          <div className="flex flex-col gap-2">
            <Link
              to={productId ? `/products/${productId}` : '#'}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm text-center hover:bg-gray-50 transition-colors"
            >
              Détails du produit
            </Link>
            <button
              disabled={stock === 0}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 rounded-xl shadow-lg shadow-[#115E59]/10 disabled:opacity-50"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              Ajouter au panier
            </button>
          </div>
        </div>
        
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