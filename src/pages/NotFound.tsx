import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9bd4d0]">
      <div className="text-center text-white">
        <div className="mb-8 flex justify-center">
          <AlertCircle size={80} className="opacity-80" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page non trouvée</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-md">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};
