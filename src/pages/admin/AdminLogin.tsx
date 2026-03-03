import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'authentification (à remplacer par appel API)
    if (email === 'admin@getrac.com' && password === 'admin123') {
      // Stocker le token ou l'état connecté ici
      localStorage.setItem('admin_token', 'ok');
      navigate('/admin');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-black text-[#115E59] mb-2">Connexion Admin</h1>
        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
        <input
          type="email"
          placeholder="Email admin"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#115E59]/20"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#115E59]/20"
          required
        />
        <button type="submit" className="bg-[#115E59] text-white font-bold py-3 rounded-lg hover:bg-[#0e4d47] transition-colors">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;
