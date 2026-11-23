
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function DashboardRedirect() {
    const { user } = useAuth();

    const dashboardRoutes = {
        tourist: '/dashboard/tourist',
        guide: '/dashboard/guide',
        admin: '/dashboard/admin',
    };

    const destination = dashboardRoutes[user?.role];

    if (!destination) {
        return <Navigate to="/" replace />;
    }

    return <Navigate to={destination} replace />;
}

export default DashboardRedirect;
