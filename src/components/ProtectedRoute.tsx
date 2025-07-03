
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  adminKey?: string;
}

const ProtectedRoute = ({ children, adminKey }: ProtectedRouteProps) => {
  const urlParams = new URLSearchParams(window.location.search);
  const providedKey = urlParams.get('key');
  const expectedKey = 'admin123'; // In a real app, this would be more secure

  if (adminKey && providedKey !== expectedKey) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
