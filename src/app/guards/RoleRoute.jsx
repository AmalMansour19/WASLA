
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function RoleRoute({ allowedRoles = [] }) {
    const { user, isAuthenticated } = useAuth();

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but role is not allowed
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default RoleRoute;
