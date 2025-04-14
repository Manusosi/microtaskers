
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { checkAuth, getUserData } from '@/utils/authHelpers';
import { logAuthState, logNavigation } from '@/utils/errorTracking';
import { User, Session } from '@supabase/supabase-js';

export const useAuth = (redirectToLogin = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Log navigation for debugging
    logNavigation(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && newSession) {
          setIsAuthenticated(true);
          setError(null);
          
          // Log auth state for debugging
          logAuthState({ 
            isAuthenticated: true, 
            isLoading: false, 
            user: newSession.user,
            event: 'SIGNED_IN',
            sessionExpires: newSession.expires_at
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
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        // Set loading immediately
        setIsLoading(true);
        
        // Check authentication status
        const { data, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          console.error('Authentication error:', authError);
          setError(authError);
          setIsAuthenticated(false);
          setUser(null);
          setSession(null);
          
          // Log auth state for debugging
          logAuthState({ isAuthenticated: false, isLoading: false, error: authError });
          
          if (redirectToLogin) {
            navigate('/login');
          }
          
          setIsLoading(false);
          return;
        }
        
        if (!data.session) {
          setIsAuthenticated(false);
          setUser(null);
          setSession(null);
          
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
        setUser(data.session.user);
        setSession(data.session);
        setError(null);
        
        // Log auth state for debugging
        logAuthState({ 
          isAuthenticated: true, 
          isLoading: false, 
          user: data.session.user,
          sessionExpires: data.session.expires_at
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Auth hook error:', err);
        setError(err);
        setIsAuthenticated(false);
        setUser(null);
        setSession(null);
        
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

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, redirectToLogin, location.pathname]);

  return { isLoading, isAuthenticated, user, session, error };
};

export default useAuth;
