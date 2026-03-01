import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { ProductCard } from '../components';
import { productService, categoryService } from '../services/api';
import type { Product } from '../types';

export const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState<(Product & { img?: string; qty?: number; price?: number | string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1500000]); // 1.5M FCFA max au lieu de 1000
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData.map((cat: any) => ({ id: cat.id || cat.idCategory, name: cat.name })));
      } catch (e) {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Synchronise le filtre catégorie avec l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      // On cherche d'abord par nom, puis par id
      const found = categories.find(c => c.name === cat || String(c.id) === cat);
      if (found) setSelectedCategory(String(found.id));
      else setSelectedCategory('all');
    } else {
      setSelectedCategory('all');
    }
    // eslint-disable-next-line
  }, [location.search, categories.length]);

  // Catégories pour le filtre
  const filterCategories = useMemo(() => [
    { id: 'all', name: 'Toutes' },
    ...categories
  ], [categories]);

  // Use useMemo for filtered products instead of setState in effect
  const filteredProducts = useMemo(() => {
    if (products.length === 0) return [];

    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        // Si le produit a idCategory, on compare avec l'id sélectionné
        if ('idCategory' in p && p.idCategory) return String(p.idCategory) === selectedCategory;
        // Si le produit a category (string), on compare avec le nom de la catégorie sélectionnée
        if (p.category && typeof p.category === 'string') return p.category === categories.find(c => String(c.id) === selectedCategory)?.name;
        return false;
      });
    }

    // Filter by price (accepte string ou number, robust for FCFA)
    filtered = filtered.filter(p => {
      const price = Number(String(p.price).replace(/[^\d.]/g, ''));
      return !isNaN(price) && price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'price-asc') {
      filtered.sort((a, b) => Number(String(a.price).replace(/[^\d.]/g, '')) - Number(String(b.price).replace(/[^\d.]/g, '')));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => Number(String(b.price).replace(/[^\d.]/g, '')) - Number(String(a.price).replace(/[^\d.]/g, '')));
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => String(b.name).localeCompare(String(a.name)));
    }

    return filtered;
}, [selectedCategory, priceRange, sortBy, products, categories]); 
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Notre Catalogue</h1>
          <p className="text-gray-600">
            {filteredProducts.length} produit(s) trouvé(s)
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filtres
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Catégories</h4>
                <div className="space-y-2">
                  {filterCategories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === String(cat.id)}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 accent-[#9bd4d0]"
                      />
                      <span className="text-gray-700 capitalize">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Prix</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: {priceRange[0].toLocaleString()} FCFA</label>
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: {priceRange[1].toLocaleString()} FCFA</label>
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Trier par</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-[#9bd4d0] rounded-lg px-3 py-2 text-sm focus:border-[#115E59] focus:outline-none"
                >
                  <option value="newest">Plus récent</option>
                  <option value="price-asc">Prix: Bas à Haut</option>
                  <option value="price-desc">Prix: Haut à Bas</option>
                  <option value="name-asc">Nom: A-Z</option>
                  <option value="name-desc">Nom: Z-A</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mb-4 w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              {showFilters ? 'Fermer les filtres' : 'Afficher les filtres'}
            </button>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-pulse text-lg text-gray-600">
                  Chargement des produits...
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  Aucun produit ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
