import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Navigate, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy imports for pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin lazy imports
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const ManageServices = lazy(() => import('./pages/admin/ManageServices'));
const ContactMessages = lazy(() => import('./pages/admin/ContactMessages'));
const ManageReviews = lazy(() => import('./pages/admin/ManageReviews'));
const ManageStaff = lazy(() => import('./pages/admin/ManageStaff'));
const Login = lazy(() => import('./pages/admin/Login'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const ManageSubscribers = lazy(() => import('./pages/admin/ManageSubscribers'));

import { API_BASE_URL } from './config/api';

const RouteSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }
  >
    {children}
  </Suspense>
);


const ProtectedRoute = () => {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAuthState('unauthenticated');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/verify`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setAuthState('authenticated');
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAuthState('unauthenticated');
        }
      } catch {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setAuthState('unauthenticated');
      }
    };

    verifyToken();
  }, []);

  if (authState === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: () => <RouteSuspense><Home /></RouteSuspense> },
      { path: 'services', Component: () => <RouteSuspense><Services /></RouteSuspense> },
      { path: 'portfolio', Component: () => <RouteSuspense><Portfolio /></RouteSuspense> },
      { path: 'about', Component: () => <RouteSuspense><About /></RouteSuspense> },
      { path: 'contact', Component: () => <RouteSuspense><Contact /></RouteSuspense> },
    ],
  },
  {
    path: '/admin',
    children: [
      { path: 'login', Component: () => <RouteSuspense><Login /></RouteSuspense> },
      {
        path: '',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: () => <RouteSuspense><AdminLayout /></RouteSuspense>,
            children: [
              { index: true, Component: () => <RouteSuspense><AdminDashboard /></RouteSuspense> },
              { path: 'projects', Component: () => <RouteSuspense><ManageProjects /></RouteSuspense> },
              { path: 'services', Component: () => <RouteSuspense><ManageServices /></RouteSuspense> },
              { path: 'reviews', Component: () => <RouteSuspense><ManageReviews /></RouteSuspense> },
              { path: 'messages', Component: () => <RouteSuspense><ContactMessages /></RouteSuspense> },
              { path: 'staff', Component: () => <RouteSuspense><ManageStaff /></RouteSuspense> },
              { path: 'settings', Component: () => <RouteSuspense><SiteSettings /></RouteSuspense> },
              { path: 'profile', Component: () => <RouteSuspense><AdminProfile /></RouteSuspense> },
              { path: 'subscribers', Component: () => <RouteSuspense><ManageSubscribers /></RouteSuspense> },
            ],
          },
        ],
      },
    ],
  },
]);

