import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { productService } from '../services/api';
import { FlyToCartOverlay } from '../components/FlyToCartOverlay';

export const ProductDetail = () => {
  // TS : id est de type string | undefined
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [flyData, setFlyData] = useState<null | {
    img: string;
    from: { x: number; y: number; width: number; height: number };
    to: { x: number; y: number };
  }>(null);

  // Helper pour l'ID (Postgres compatibility : id, idProduct ou idproduct)
  const getPID = (p: any) => p?.id || p?.idProduct || p?.idproduct;

  useEffect(() => {
    const fetchProduct = async () => {
      // FIX TS(2345) : On vérifie que id existe avant de l'utiliser
      if (!id) return; 

      try {
        // On convertit en nombre seulement si id est présent
        const data = await productService.getById(Number(id)); 
        setProduct(data);
        
        const pid = getPID(data);
        if (pid) {
          setIsLiked(!!localStorage.getItem(`like_${pid}`));
        }
      } catch (error) {
        console.error("Erreur de récupération:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#115E59] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Retour au catalogue
        </button>
      </div>
    );
  }

  const productId = getPID(product);
  const stockQty = product.stock ?? product.qty ?? 0;
  const displayPrice = product.price || product.price_unit || 0;

  const handleAddToCart = () => {
    const imgEl = document.querySelector('#product-detail-img') as HTMLImageElement;
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

    // Mise à jour du Panier
    const storedQty = parseInt(localStorage.getItem(`cartQty_${productId}`) || '0', 10);
    localStorage.setItem(`cartQty_${productId}`, String((isNaN(storedQty) ? 0 : storedQty) + quantity));
    localStorage.setItem(`product_${productId}`, JSON.stringify(product));
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      localStorage.removeItem(`like_${productId}`);
      setIsLiked(false);
    } else {
      localStorage.setItem(`like_${productId}`, '1');
      localStorage.setItem(`product_${productId}`, JSON.stringify(product));
      setIsLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#115E59] mb-10 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                id="product-detail-img"
                src={product.img || product.image || '/placeholder.png'}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <span className="text-[#115E59] font-bold uppercase tracking-widest text-xs mb-4">
              {product.category || 'Équipement'}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{product.name}</h1>
            
            <div className="mb-8">
              <span className="text-4xl font-black text-[#115E59]">
                {Number(displayPrice).toLocaleString('fr-FR')} F CFA
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Quantité</span>
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 font-bold">-</button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 font-bold">+</button>
                  </div>
                </div>

                <div className="flex-1 w-full flex flex-col gap-3">
                  <button
                    disabled={stockQty === 0}
                    onClick={handleAddToCart}
                    className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                  >
                    <ShoppingCart size={22} /> Ajouter au panier
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border ${
                      isLiked ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    {isLiked ? 'Coup de cœur !' : 'Favoris'}
                  </button>
                </div>
              </div>
              <p className={`mt-4 text-sm font-semibold ${stockQty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stockQty > 0 ? `${stockQty} en stock` : 'Rupture de stock'}
              </p>
            </div>

            {/* Badges de confiance */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-10">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-[#115E59] mb-2" size={24} />
                <span className="text-[10px] font-bold text-gray-900 uppercase">Livraison</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="text-[#115E59] mb-2" size={24} />
                <span className="text-[10px] font-bold text-gray-900 uppercase">Sécurisé</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="text-[#115E59] mb-2" size={24} />
                <span className="text-[10px] font-bold text-gray-900 uppercase">Garantie</span>
              </div>
            </div>
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