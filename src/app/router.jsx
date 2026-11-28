
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';

// Public Pages
import HomePage from '../features/home/pages/HomePage.jsx';
import PlacesPage from '../features/places/pages/PlacesPage.jsx';
import GovernoratesPage from '../features/places/pages/GovernoratesPage.jsx';
import GuidesPage from '../features/guides/pages/GuidesPage.jsx';
import PackagesPage from '../features/packages/pages/PackagesPage.jsx';
import AboutPage from '../features/about/pages/AboutPage.jsx';
import ContactPage from '../features/contact/pages/ContactPage.jsx';
import NotFoundPage from '../features/not-found/pages/NotFoundPage.jsx';

// Auth Pages
import SignupPage from '../features/auth/pages/SignupPage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx';

// Route Guards
import ProtectedRoute from './guards/ProtectedRoute.jsx';
import RoleRoute from './guards/RoleRoute.jsx';
import DashboardRedirect from './guards/DashboardRedirect.jsx';

// Dashboard Pages
import TouristDashboardPage from '../features/tourist/pages/TouristDashboardPage.jsx';
import GuideDashboardPage from '../features/guide/pages/GuideDashboardPage.jsx';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage.jsx';

const router = createBrowserRouter([
    // Authentication Layout
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/forgot-password', element: <ForgotPasswordPage /> },
        ],
    },

    // Main Website Layout
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // Public Pages
            { index: true, element: <HomePage /> },
            { path: 'places', element: <PlacesPage /> },
            { path: 'governorates', element: <GovernoratesPage /> },
            { path: 'guides', element: <GuidesPage /> },
            { path: 'packages', element: <PackagesPage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },

            // Authenticated Users
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardRedirect />,
                    },
                ],
            },

            // Tourist Dashboard
            {
                element: <RoleRoute allowedRoles={['tourist']} />,
                children: [
                    {
                        path: 'dashboard/tourist',
                        element: <TouristDashboardPage />,
                    },
                ],
            },

            // Guide Dashboard
            {
                element: <RoleRoute allowedRoles={['guide']} />,
                children: [
                    {
                        path: 'dashboard/guide',
                        element: <GuideDashboardPage />,
                    },
                ],
            },

            // Admin Dashboard
            {
                element: <RoleRoute allowedRoles={['admin']} />,
                children: [
                    {
                        path: 'dashboard/admin',
                        element: <AdminDashboardPage />,
                    },
                ],
            },

            // Not Found
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

export default router;
