import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuth } from '@/utils/authHelpers';
import { logAuthState } from '@/utils/errorTracking';
import { getUserRole } from '@/utils/roleBasedRedirect';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: 'tasker' | 'advertiser';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login',
  requiredRole
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsLoading(true);
        
        const { session, user, error } = await checkAuth();
        
        if (session && user && !error) {
          setIsAuthenticated(true);
          setUserRole(getUserRole(user));
          logAuthState({ 
            isAuthenticated: true, 
            isLoading: false,
            user,
            source: 'AuthGuard',
            path: location.pathname
          });
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
          logAuthState({ 
            isAuthenticated: false, 
            isLoading: false,
            error,
            source: 'AuthGuard',
            path: location.pathname
          });
        }
      } catch (err) {
        console.error('Auth guard error:', err);
        setIsAuthenticated(false);
        setUserRole(null);
        logAuthState({ 
          isAuthenticated: false, 
          isLoading: false,
          error: err,
          source: 'AuthGuard',
          path: location.pathname
        });
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Handle role-based access
  if (requiredRole && userRole !== requiredRole) {
    // If user is authenticated but has wrong role, redirect to their appropriate dashboard
    const correctDashboard = userRole === 'tasker' ? '/dashboard/tasker' : '/dashboard/advertiser';
    return <Navigate to={correctDashboard} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard; 