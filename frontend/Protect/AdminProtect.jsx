import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
