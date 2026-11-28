import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";

import HomePage from "../features/home/pages/HomePage.jsx";
import PlacesPage from "../features/places/pages/PlacesPage.jsx";
import GovernoratesPage from "../features/places/pages/GovernoratesPage.jsx";
import GuidesPage from "../features/guides/pages/GuidesPage.jsx";
import PackagesPage from "../features/packages/pages/PackagesPage.jsx";
import AboutPage from "../features/about/pages/AboutPage.jsx";
import ContactPage from "../features/contact/pages/ContactPage.jsx";
import NotFoundPage from "../features/not-found/pages/NotFoundPage.jsx";

import SignupPage from "../features/auth/pages/SignupPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";

import ProtectedRoute from "./guards/ProtectedRoute.jsx";
import RoleRoute from "./guards/RoleRoute.jsx";
import DashboardRedirect from "./guards/DashboardRedirect.jsx";

import TouristDashboardPage from "../features/tourist/pages/TouristDashboardPage.jsx";
import GuideDashboardPage from "../features/dashboard/guide/pages/GuideDashboardPage.jsx";
import AdminDashboardPage from "../features/dashboard/admin/pages/AdminDashboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "places", element: <PlacesPage /> },
      { path: "governorates", element: <GovernoratesPage /> },
      { path: "guides", element: <GuidesPage /> },
      { path: "packages", element: <PackagesPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },

      // Authenticated users
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardRedirect />,
          },
        ],
      },

      // Tourist Dashboard
      {
        element: <RoleRoute allowedRoles={["tourist"]} />,
        children: [
          {
            path: "dashboard/tourist",
            element: <TouristDashboardPage />,
          },
        ],
      },
      // Guide Dashboard
      {
        element: <RoleRoute allowedRoles={["guide"]} />,
        children: [
          {
            path: "dashboard/guide",
            element: <GuideDashboardPage />,
          },
        ],
      },

      // Admin Dashboard
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "dashboard/admin",
            element: <AdminDashboardPage />,
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
