import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { productService } from '../services/api';
import type { Product } from '../types';
import { FlyToCartOverlay } from '../components/FlyToCartOverlay';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [flyData, setFlyData] = useState<null | {
    img: string;
    from: { x: number; y: number; width: number; height: number };
    to: { x: number; y: number };
  }>(null);

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

  const qty = product ? ((product as any).qty ?? product.stock ?? 0) : 0;

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

  const handleAddToCart = () => {
    if (!product) return;
    const imgEl = document.querySelector('#product-detail-img') as HTMLImageElement;
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
    const storedQty = parseInt(localStorage.getItem(`cartQty_${product.id}`) || '0', 10);
    const newQty = (isNaN(storedQty) ? 0 : storedQty) + quantity;
    localStorage.setItem(`cartQty_${product.id}`, String(newQty));
    localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    localStorage.setItem(`like_${product.id}`, '1');
    localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
  };

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
              id="product-detail-img"
              src={product.img || (product as any).image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-semibold text-[#054d3b] uppercase bg-[#e6f6f4] px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-gray-900">
                  {product.price !== undefined && !isNaN(Number(product.price))
                    ? Number(product.price).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 })
                    : '—'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 text-lg">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-lg font-semibold ${qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {qty > 0 ? `${qty} en stock` : 'Rupture de stock'}
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
              <button
                disabled={qty === 0}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button
                className="btn-secondary flex items-center justify-center gap-2"
                onClick={handleAddToWishlist}
              >
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
                  <p className="text-sm text-gray-600">Pour toute commande supérieure à 150 000 F CFA</p>
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

        {/* Animation fly-to-cart */}
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
