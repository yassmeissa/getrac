import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useMemo } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product & { img?: string; qty?: number };
  hideDiscount?: boolean;
}

export const ProductCard = ({ product, hideDiscount }: ProductCardProps) => {
  // Generate discount based on product ID to ensure consistency
  const discount = useMemo(() => {
    return (product.id * 7) % 30 + 5; // Consistent discount per product
  }, [product.id]);
  
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
          src={product.img || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <button className="absolute top-4 left-4 bg-white rounded-full p-2 hover:bg-[#9bd4d0] hover:text-[#054d3b] transition transform hover:scale-110 animate-slideUp">
          <Heart size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-[#054d3b] uppercase mb-2">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-[#054d3b] transition">
          {product.name}
        </h3>



        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {product.price !== undefined && !isNaN(Number(String(product.price).replace(/[^\d.]/g, '')))
                ? Number(String(product.price).replace(/[^\d.]/g, '')).toLocaleString('fr-FR') + ' F CFA'
                : '—'}
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <p className={`text-sm mb-4 font-semibold ${(product.stock ?? product.qty) > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {(product.stock ?? product.qty) > 0 ? `${product.stock ?? product.qty} en stock` : 'Rupture de stock'}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 animate-slideUp">
          <Link
            to={product.id ? `/products/${product.id}` : '#'}
            className="flex-1 btn-primary text-center"
          >
            Voir détails
          </Link>
          <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};
