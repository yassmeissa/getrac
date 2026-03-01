import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';
import { FlyToCartOverlay } from './FlyToCartOverlay';

interface ProductCardProps {
  product: Product & { img?: string; qty?: number; idProduct?: number };
  hideDiscount?: boolean;
}

export const ProductCard = ({ product, hideDiscount }: ProductCardProps) => {
  const productId = product.id || product.idProduct;

  const [liked, setLiked] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  // CORRECTION 1 : On type correctement le state pour correspondre aux variables x, y, width, height
  const [flyData, setFlyData] = useState<null | { 
    img: string; 
    from: { x: number; y: number; width: number; height: number }; 
    to: { x: number; y: number } 
  }>(null);

  useEffect(() => {
    setLiked(!!localStorage.getItem(`like_${productId}`));
    const storedQty = parseInt(localStorage.getItem(`cartQty_${productId}`) || '0', 10);
    setCartQty(isNaN(storedQty) ? 0 : storedQty);
  }, [productId]);

  const handleLike = () => {
    if (liked) {
      localStorage.removeItem(`like_${productId}`);
      setLiked(false);
    } else {
      localStorage.setItem(`like_${productId}`, '1');
      setLiked(true);
    }
  };

  const handleAddToCart = () => {
    const imgEl = document.querySelector(`#product-img-${productId}`) as HTMLImageElement;
    
    // Assure-toi que ton icône panier dans le Header a bien id="cart-icon"
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
    } else {
      console.warn("L'image ou l'icône du panier (id='cart-icon') est introuvable.");
    }

    const newQty = cartQty + 1;
    setCartQty(newQty);
    localStorage.setItem(`cartQty_${productId}`, String(newQty));
  };

  const handleFlyEnd = () => setFlyData(null);

  const discount = useMemo(() => {
    if (!productId) return 0;
    return (productId * 7) % 30 + 5; 
  }, [productId]);
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          id={`product-img-${productId}`}
          src={product.img || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <button
          className={`absolute top-4 left-4 bg-white rounded-full p-2 hover:bg-[#9bd4d0] hover:text-[#054d3b] transition transform hover:scale-110 animate-slideUp ${liked ? 'text-[#054d3b]' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart size={20} fill={liked ? '#054d3b' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-[#054d3b] uppercase mb-2">
          {product.category}
        </p>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-[#054d3b] transition">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {product.price !== undefined && !isNaN(Number(String(product.price).replace(/[^\d.]/g, '')))
                ? Number(String(product.price).replace(/[^\d.]/g, '')).toLocaleString('fr-FR') + ' F CFA'
                : '—'}
            </span>
          </div>
        </div>

        <p className={`text-sm mb-4 font-semibold ${(product.stock ?? product.qty) > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {(product.stock ?? product.qty) > 0 ? `${product.stock ?? product.qty} en stock` : 'Rupture de stock'}
        </p>

        <div className="flex flex-col gap-2 animate-slideUp">
          <Link
            to={productId ? `/products/${productId}` : '#'}
            className="flex-1 btn-primary text-center"
          >
            Voir détails
          </Link>
          <button
            className={"flex-1 btn-secondary flex items-center justify-center gap-2"}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Ajouter {cartQty > 0 && <span className="ml-1">({cartQty})</span>}
          </button>
        </div>
        
        {/* CORRECTION 2 : On passe directement les objets 'from' et 'to' tels quels */}
        {flyData && (
          <FlyToCartOverlay
            img={flyData.img}
            from={flyData.from}
            to={flyData.to}
            onEnd={handleFlyEnd}
          />
        )}
      </div>
    </div>
  );
};