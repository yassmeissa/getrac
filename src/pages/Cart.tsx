import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';

// On étend le type Product pour inclure la quantité dans le panier
type CartItem = Product & { 
  quantity: number; 
  img?: string; 
  image?: string; 
  price?: string | number;
  idProduct?: number; 
};

export const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Récupère tous les items du panier depuis localStorage
    const cart: CartItem[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('cartQty_')) {
        const id = key.replace('cartQty_', '');
        const qty = parseInt(localStorage.getItem(key) || '0', 10);
        if (qty > 0 && localStorage.getItem(`product_${id}`)) {
          try {
            const prod = JSON.parse(localStorage.getItem(`product_${id}`)!);
            cart.push({ ...prod, quantity: qty });
          } catch (e) {
            console.error("Erreur de parsing", e);
          }
        }
      }
    });
    setItems(cart);
  }, []);

  // Fonction pour extraire le prix proprement (robuste pour les FCFA)
  const getNumPrice = (price?: string | number) => {
    if (price === undefined) return 0;
    const numPrice = Number(String(price).replace(/[^\d.]/g, ''));
    return isNaN(numPrice) ? 0 : numPrice;
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(prevItems => prevItems.map(item => {
      const productId = item.id || item.idProduct;
      if (productId === id) {
        const newQty = Math.max(1, item.quantity + delta); // On empêche de descendre sous 1
        localStorage.setItem(`cartQty_${id}`, String(newQty));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: number) => {
    localStorage.removeItem(`cartQty_${id}`);
    setItems(prev => prev.filter(item => (item.id || item.idProduct) !== id));
  };

  const handleClear = () => {
    // On ne supprime QUE les quantités pour ne pas casser la Wishlist !
    items.forEach(item => {
      const id = item.id || item.idProduct;
      localStorage.removeItem(`cartQty_${id}`);
    });
    setItems([]);
  };

  // 1. IL FAUT DÉCLARER TOTAL ICI, AVANT HANDLECHECKOUT
  const total = items.reduce((sum, item) => sum + getNumPrice(item.price) * item.quantity, 0);

  // 2. LA FONCTION CORRIGÉE
  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      const orderId = `CMD-${Math.floor(Math.random() * 1000000)}`;
      
      const response = await fetch('http://localhost:5001/api/create-payment', { // ⚠️ Attention : Ton backend tourne sur le port 5001 selon tes logs !
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
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
        
        <div className="mb-10 flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          {items.length > 0 && (
            <span className="bg-[#9bd4d0]/30 text-[#115E59] py-1 px-3 rounded-full text-sm font-semibold">
              {items.length} article{items.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8 text-lg">
              On dirait que vous n'avez pas encore fait votre choix. Découvrez nos offres exceptionnelles !
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
            >
              Voir le catalogue
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          /* Layout Panier : 2 colonnes sur grand écran */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Colonne de gauche : Liste des articles */}
            <div className="flex-1 space-y-4">
              {items.map((item) => {
                const productId = item.id || item.idProduct as number;
                const imgSrc = item.img || item.image || 'https://via.placeholder.com/150';
                const itemPrice = getNumPrice(item.price);

                return (
                  <div key={productId} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group">
                    {/* Image */}
                    <Link to={`/products/${productId}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden block">
                      <img src={imgSrc} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </Link>

                    {/* Détails */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <p className="text-xs font-bold text-[#115E59] uppercase mb-1">{item.category}</p>
                      <Link to={`/products/${productId}`} className="hover:text-[#115E59] transition-colors">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">{item.name}</h3>
                      </Link>
                      <p className="text-xl font-extrabold text-gray-900">
                        {itemPrice.toLocaleString('fr-FR')} F CFA
                      </p>
                    </div>

                    {/* Contrôles (Quantité + Suppression) */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(productId, -1)}
                          className="p-2 hover:bg-gray-200 text-gray-600 rounded-l-lg transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(productId, 1)}
                          className="p-2 hover:bg-gray-200 text-gray-600 rounded-r-lg transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button 
                        onClick={() => handleRemoveItem(productId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Trash2 size={18} />
                        <span className="sm:hidden">Retirer</span>
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 flex justify-between items-center">
                <Link to="/products" className="text-[#115E59] font-medium hover:underline flex items-center gap-2">
                  <ArrowRight size={16} className="rotate-180" /> Continuer mes achats
                </Link>
                <button onClick={handleClear} className="text-gray-500 hover:text-red-600 text-sm underline transition-colors">
                  Vider tout le panier
                </button>
              </div>
            </div>

            {/* Colonne de droite : Résumé de la commande */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé de la commande</h3>
                
                <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span>Sous-total ({items.reduce((acc, i) => acc + i.quantity, 0)} articles)</span>
                    <span>{total.toLocaleString('fr-FR')} F CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span className="text-green-600 font-medium">Gratuit</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-gray-900">Total TTC</span>
                  <span className="text-2xl font-extrabold text-[#115E59]">
                    {total.toLocaleString('fr-FR')} F CFA
                  </span>
                </div>

                <button 
                  className="w-full btn-primary py-4 text-lg flex justify-center items-center gap-2 mb-4"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Redirection en cours...' : (<><span>Passer la commande</span> <ArrowRight size={20} /></>)}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={16} className="text-green-600" />
                  Paiement 100% sécurisé
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