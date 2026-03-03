import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign 
} from 'lucide-react';

const sidebarLinks = [
  { label: 'Vue d\'ensemble', to: '/admin', icon: LayoutDashboard },
  { label: 'Produits', to: '/admin/products', icon: Package },
  { label: 'Catégories', to: '/admin/categories', icon: Tags },
  { label: 'Utilisateurs', to: '/admin/users', icon: Users },
  { label: 'Paramètres', to: '/admin/settings', icon: Settings },
];

const stats = [
  { title: "Revenus du mois", value: "24 500 €", trend: "+12%", isPositive: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
  { title: "Nouvelles Commandes", value: "342", trend: "+5%", isPositive: true, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Nouveaux Clients", value: "128", trend: "-2%", isPositive: false, icon: Users, color: "text-rose-600", bg: "bg-rose-100" },
];

const Dashboard = () => {
  // Simule la route actuelle si useLocation n'est pas encore configuré dans ton app
  // const location = useLocation();
  const currentPath = '/admin'; // Remplace par location.pathname en production

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-[#115E59] text-white flex flex-col transition-all duration-300 shadow-2xl z-20">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <div className="w-8 h-8 bg-white text-[#115E59] rounded-lg flex items-center justify-center font-bold text-xl mr-3">
            A
          </div>
          <h2 className="text-xl font-bold tracking-wide">AdminPro</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-teal-200/50 uppercase tracking-wider mb-4 px-4">
            Menu principal
          </div>
          {sidebarLinks.map((link) => {
            const isActive = currentPath === link.to;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-teal-100 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-teal-300' : 'text-teal-400 group-hover:text-teal-300 transition-colors'} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout Bottom Action */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-teal-100 hover:bg-white/5 hover:text-white transition-colors text-left">
            <LogOut size={20} className="text-teal-400" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          {/* Search */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher une commande, un utilisateur..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#115E59]/20 focus:border-[#115E59] transition-all"
            />
          </div>

          {/* Actions & Profile */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-[#115E59] transition-colors rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Admin Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-teal-100 transition-colors"
              />
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-slate-700">Thomas M.</p>
                <p className="text-slate-500 text-xs">Administrateur</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Bonjour, Thomas 👋</h1>
            <p className="text-slate-500 mt-1">Voici ce qu'il se passe sur votre boutique aujourd'hui.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <Icon size={24} className={stat.color} />
                    </div>
                    <span className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
                      stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {stat.isPositive ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Placeholder for future content (Table or Chart) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px] text-slate-400">
             <LayoutDashboard size={48} className="mb-4 opacity-20" />
             <p className="font-medium text-slate-500">Espace pour vos graphiques ou tableaux récents</p>
          </div>

        </div>
      </main>

    </div>
  );
};

export default Dashboard;