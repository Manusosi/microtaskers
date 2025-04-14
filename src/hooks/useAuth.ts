import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { checkAuth, getUserData } from '@/utils/authHelpers';
import { logAuthState, logNavigation } from '@/utils/errorTracking';

export const useAuth = (redirectToLogin = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Log navigation for debugging
    logNavigation(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set loading immediately
        setIsLoading(true);
        
        // Check authentication status
        const { session, user: authUser, error: authError } = await checkAuth();
        
        if (authError) {
          console.error('Authentication error:', authError);
          setError(authError);
          setIsAuthenticated(false);
          setUser(null);
          
          // Log auth state for debugging
          logAuthState({ isAuthenticated: false, isLoading: false, error: authError });
          
          if (redirectToLogin) {
            navigate('/login');
          }
          
          setIsLoading(false);
          return;
        }
        
        if (!session) {
          setIsAuthenticated(false);
          setUser(null);
          
          // Log auth state for debugging
          logAuthState({ isAuthenticated: false, isLoading: false, user: null });
          
          if (redirectToLogin) {
            navigate('/login');
          }
          
          setIsLoading(false);
          return;
        }
        
        // User is authenticated
        setIsAuthenticated(true);
        const userData = getUserData(authUser);
        setUser(userData);
        setError(null);
        
        // Log auth state for debugging
        logAuthState({ 
          isAuthenticated: true, 
          isLoading: false, 
          user: userData,
          sessionExpires: session.expires_at
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Auth hook error:', err);
        setError(err);
        setIsAuthenticated(false);
        setUser(null);
        
        // Log auth state for debugging
        logAuthState({ isAuthenticated: false, isLoading: false, error: err });
        
        if (redirectToLogin) {
          navigate('/login');
        }
        
        setIsLoading(false);
      }
    };

    // Initialize authentication
    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          const userData = getUserData(session.user);
          setUser(userData);
          setError(null);
          setIsLoading(false);
          
          // Log auth state for debugging
          logAuthState({ 
            isAuthenticated: true, 
            isLoading: false, 
            user: userData,
            event: 'SIGNED_IN',
            sessionExpires: session.expires_at
          });
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
          
          // Log auth state for debugging
          logAuthState({ 
            isAuthenticated: false, 
            isLoading: false, 
            user: null,
            event: 'SIGNED_OUT'
          });
          
          if (redirectToLogin) {
            navigate('/login');
          }
          
          setIsLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Log token refresh for debugging
          logAuthState({ 
            isAuthenticated: true,
            isLoading: false,
            user: getUserData(session.user),
            event: 'TOKEN_REFRESHED',
            sessionExpires: session.expires_at
          });
        } else if (event === 'USER_UPDATED' && session) {
          const userData = getUserData(session.user);
          setUser(userData);
          
          // Log user update for debugging
          logAuthState({ 
            isAuthenticated: true,
            isLoading: false,
            user: userData,
            event: 'USER_UPDATED',
            sessionExpires: session.expires_at
          });
        }
      }
    );

    // Clean up subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate, redirectToLogin, location.pathname]);

  return { isLoading, isAuthenticated, user, error };
};

export default useAuth; 