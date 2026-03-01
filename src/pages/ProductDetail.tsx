import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { productService } from '../services/api';
import type { Product } from '../types';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await productService.getById(parseInt(id));
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // Generate discount based on product ID to ensure consistency
  const discount = useMemo(() => {
    return product ? (product.id * 7) % 30 + 5 : 0;
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Produit non trouvé
        </h1>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-max">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#054d3b] hover:text-[#04796b] mb-8"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="card p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <img
                  key={i}
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Badge */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-semibold text-[#054d3b] uppercase bg-[#e6f6f4] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-[#054d3b] uppercase bg-[#e6f6f4] px-3 py-1 rounded-full">
                -{discount}%
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating}/5 ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-gray-900">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  {(product.price * 1.2).toFixed(2)}€
                </span>
              </div>
              <p className="text-green-600 font-semibold mt-2">
                Économisez {(product.price * 0.2).toFixed(2)}€
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 text-lg">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button disabled={product.stock === 0} className="flex-1 btn-primary flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Truck className="text-[#054d3b] flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900">Livraison gratuite</h4>
                  <p className="text-sm text-gray-600">Pour toute commande supérieure à 50€</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="text-[#054d3b] flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900">Achat sécurisé</h4>
                  <p className="text-sm text-gray-600">Protection d'acheteur garantie</p>
                </div>
              </div>
              <div className="flex gap-4">
                <RotateCcw className="text-[#054d3b] flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900">Retour facile</h4>
                  <p className="text-sm text-gray-600">Retour gratuit sous 30 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
