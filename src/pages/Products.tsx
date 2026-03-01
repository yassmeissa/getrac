import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SearchX } from 'lucide-react';
import { ProductCard } from '../components';
import { productService, categoryService } from '../services/api';

export const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1500000]); 
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  // Helper pour extraire l'ID peu importe la casse (Postgres compatibility)
  const getPID = (p: any) => p?.id || p?.idProduct || p?.idproduct;

  // Helper pour extraire le prix proprement
  const getPrice = (p: any) => {
    const val = p?.price !== undefined ? p.price : p?.price_unit;
    return Number(String(val).replace(/[^\d.]/g, '')) || 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ]);
        setProducts(productsData);
        // On normalise les catégories (idcategory ou idCategory)
        setCategories(categoriesData.map((cat: any) => ({ 
          id: String(cat.id || cat.idcategory || cat.idCategory), 
          name: cat.name 
        })));
      } catch (e) {
        console.error("Erreur de chargement", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) {
      // On cherche si le paramètre correspond à un ID ou un Nom
      const found = categories.find(c => c.name === catParam || c.id === catParam);
      if (found) setSelectedCategory(found.id);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search, categories]);

  const filterCategories = useMemo(() => [
    { id: 'all', name: 'Toutes les catégories' },
    ...categories
  ], [categories]);

  const filteredProducts = useMemo(() => {
    if (products.length === 0) return [];

    let filtered = [...products];

    // 1. Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        const pCatId = String(p.category_id || p.idcategory || p.idCategory || '');
        return pCatId === selectedCategory;
      });
    }

    // 2. Filtrage par prix
    filtered = filtered.filter(p => {
      const price = getPrice(p);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // 3. Tri
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return getPrice(a) - getPrice(b);
      if (sortBy === 'price-desc') return getPrice(b) - getPrice(a);
      if (sortBy === 'name-asc') return String(a.name).localeCompare(String(b.name));
      if (sortBy === 'name-desc') return String(b.name).localeCompare(String(a.name));
      // Par défaut : Newest (ID décroissant)
      return getPID(b) - getPID(a);
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy, products, categories]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Notre Catalogue</h1>
          <p className="text-lg text-gray-600">
            <span className="font-bold text-[#115E59]">{filteredProducts.length}</span> produit(s) disponible(s)
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className={`md:w-72 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter size={20} className="text-[#115E59]" />
                Filtres
              </h3>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Catégories</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {filterCategories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-[#115E59] focus:ring-[#115E59] border-gray-300"
                      />
                      <span className={`text-sm transition-colors ${selectedCategory === cat.id ? 'text-[#115E59] font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Budget (FCFA)</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Min</span>
                      <span className="text-[#115E59] font-bold">{priceRange[0].toLocaleString()} F</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1500000"
                      step="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#115E59]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Max</span>
                      <span className="text-[#115E59] font-bold">{priceRange[1].toLocaleString()} F</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1500000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#115E59]"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Trier par</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#115E59] focus:ring-1 focus:ring-[#115E59] outline-none transition-all"
                >
                  <option value="newest">Plus récent</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                  <option value="name-asc">Nom : A-Z</option>
                  <option value="name-desc">Nom : Z-A</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mb-6 w-full py-4 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-700 shadow-sm"
            >
              <Filter size={18} className="text-[#115E59]" />
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </button>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="h-96 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slideUp">
                {filteredProducts.map(product => (
                  <ProductCard key={getPID(product)} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                <SearchX size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat</h3>
                <p className="text-gray-500">Essayez de modifier vos filtres ou votre budget.</p>
                <button 
                  onClick={() => {setSelectedCategory('all'); setPriceRange([0, 1500000]);}}
                  className="mt-6 text-[#115E59] font-bold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};