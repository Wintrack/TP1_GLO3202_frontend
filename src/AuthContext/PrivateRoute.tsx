import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;