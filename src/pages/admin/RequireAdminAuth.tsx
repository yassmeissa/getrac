import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const RequireAdminAuth = ({ children }: Props) => {
  // Vérifie la présence d'un token (à adapter selon ta logique d'authentification)
  const isAuthenticated = Boolean(localStorage.getItem('admin_token'));

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAdminAuth;
