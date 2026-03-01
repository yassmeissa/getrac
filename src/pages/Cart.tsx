import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';

// Type étendu pour le panier
type CartItem = Product & { 
  quantity: number; 
  img?: string; 
  image?: string; 
  price?: string | number;
  idProduct?: number; 
  idproduct?: number; // Ajout pour la compatibilité Postgres
};

export const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper pour extraire l'ID de manière robuste
  const getPID = (item: any) => item?.id || item?.idProduct || item?.idproduct;

  useEffect(() => {
    const cart: CartItem[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('cartQty_')) {
        const idFromKey = key.replace('cartQty_', '');
        const qty = parseInt(localStorage.getItem(key) || '0', 10);
        
        const storedProduct = localStorage.getItem(`product_${idFromKey}`);
        if (qty > 0 && storedProduct) {
          try {
            const prod = JSON.parse(storedProduct);
            // On normalise l'item pour qu'il ait toujours une propriété 'id' propre
            cart.push({ ...prod, quantity: qty, id: getPID(prod) });
          } catch (e) {
            console.error("Erreur de parsing", e);
          }
        }
      }
    });
    setItems(cart);
  }, []);

  const getNumPrice = (price?: string | number) => {
    if (price === undefined) return 0;
    const numPrice = Number(String(price).replace(/[^\d.]/g, ''));
    return isNaN(numPrice) ? 0 : numPrice;
  };

  const updateQuantity = (id: any, delta: number) => {
    setItems(prevItems => prevItems.map(item => {
      const currentId = getPID(item);
      if (String(currentId) === String(id)) {
        const newQty = Math.max(1, item.quantity + delta);
        localStorage.setItem(`cartQty_${id}`, String(newQty));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: any) => {
    localStorage.removeItem(`cartQty_${id}`);
    setItems(prev => prev.filter(item => String(getPID(item)) !== String(id)));
  };

  const handleClear = () => {
    items.forEach(item => {
      localStorage.removeItem(`cartQty_${getPID(item)}`);
    });
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + getNumPrice(item.price) * item.quantity, 0);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      const orderId = `CMD-${Math.floor(Math.random() * 1000000)}`;
      
      const response = await fetch('https://getrac-backend.onrender.com/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: getNumPrice(item.price),
            quantity: item.quantity
          })),
          total: total,
          orderId: orderId
        }),
      });
      
      const data = await response.json();
      
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de l'initialisation du paiement.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Erreur Checkout:", error);
      alert("Impossible de contacter le serveur de paiement.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max mx-auto px-4">
        
        <div className="mb-10 flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          {items.length > 0 && (
            <span className="bg-[#115E59]/10 text-[#115E59] py-1 px-4 rounded-full text-sm font-bold">
              {itemCount} article{itemCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
            <p className="text-gray-500 mb-10 text-lg">
              Parcourez notre catalogue pour trouver le meilleur matériel informatique au Sénégal.
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center gap-3 px-10 py-4 text-lg rounded-2xl"
            >
              Découvrir les produits
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Liste des articles */}
            <div className="flex-1 space-y-4">
              {items.map((item) => {
                const productId = getPID(item);
                const imgSrc = item.img || item.image || '/placeholder.png';
                const itemPrice = getNumPrice(item.price);

                return (
                  <div key={productId} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                    {/* Image */}
                    <Link to={`/products/${productId}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden block">
                      <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                    </Link>

                    {/* Détails */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <p className="text-xs font-bold text-[#115E59] uppercase tracking-wider mb-1">{item.category}</p>
                      <Link to={`/products/${productId}`} className="hover:text-[#115E59] transition-colors">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">{item.name}</h3>
                      </Link>
                      <p className="text-xl font-black text-gray-900">
                        {itemPrice.toLocaleString('fr-FR')} F CFA
                      </p>
                    </div>

                    {/* Contrôles */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center bg-gray-100 rounded-xl p-1">
                        <button 
                          onClick={() => updateQuantity(productId, -1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900 text-lg">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(productId, 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button 
                        onClick={() => handleRemoveItem(productId)}
                        className="text-red-400 hover:text-red-600 p-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold"
                      >
                        <Trash2 size={18} />
                        <span className="sm:hidden">Retirer du panier</span>
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/products" className="text-[#115E59] font-bold hover:underline flex items-center gap-2">
                  <ArrowRight size={18} className="rotate-180" /> Retourner à la boutique
                </Link>
                <button onClick={handleClear} className="text-gray-400 hover:text-red-600 text-sm font-medium transition-colors">
                  Vider complètement le panier
                </button>
              </div>
            </div>

            {/* Résumé de commande */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Résumé</h3>
                
                <div className="space-y-4 text-gray-600 mb-8 border-b border-gray-100 pb-8">
                  <div className="flex justify-between text-lg">
                    <span>Sous-total</span>
                    <span className="font-bold text-gray-900">{total.toLocaleString('fr-FR')} F CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="text-green-600 font-bold uppercase text-sm">Offerte</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span className="text-gray-500 font-medium">Total à payer</span>
                  <span className="text-3xl font-black text-[#115E59]">
                    {total.toLocaleString('fr-FR')} F CFA
                  </span>
                </div>

                <button 
                  className="w-full btn-primary py-5 text-xl font-bold rounded-2xl flex justify-center items-center gap-3 mb-6 shadow-xl shadow-[#115E59]/10 disabled:opacity-50"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Traitement...' : (<>Confirmer l'achat <ArrowRight size={22} /></>)}
                </button>

                <div className="flex items-center justify-center gap-3 text-sm font-bold text-gray-400">
                  <ShieldCheck size={20} className="text-[#115E59]" />
                  Paiement sécurisé Getrac
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;