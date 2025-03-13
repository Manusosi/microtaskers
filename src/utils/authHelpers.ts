import { supabase } from "@/integrations/supabase/client";

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Auth error:", error);
      return { session: null, user: null, error };
    }
    
    if (!data || !data.session) {
      return { session: null, user: null, error: null };
    }
    
    // Check if session is about to expire (within 5 minutes) and refresh it
    const expiresAt = data.session.expires_at;
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const fiveMinutesInSeconds = 5 * 60;
    
    if (expiresAt && (expiresAt - now < fiveMinutesInSeconds)) {
      console.log('Session is about to expire, refreshing...');
      // Try to refresh the session
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        console.error("Session refresh error:", refreshError);
        // If refresh fails, we still return the current session
        return { 
          session: data.session, 
          user: data.session.user,
          error: null 
        };
      }
      
      if (refreshData && refreshData.session) {
        console.log('Session refreshed successfully');
        return { 
          session: refreshData.session, 
          user: refreshData.session.user,
          error: null 
        };
      }
    }
    
    return { 
      session: data.session, 
      user: data.session.user,
      error: null 
    };
  } catch (err) {
    console.error("Auth check failed:", err);
    return { session: null, user: null, error: err };
  }
};

// Sign out user
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Signout error:", error);
      return { success: false, error };
    }
    
    return { success: true, error: null };
  } catch (err) {
    console.error("Signout failed:", err);
    return { success: false, error: err };
  }
};

// Safely access user metadata with fallbacks
export const getUserData = (user: any) => {
  if (!user) return null;
  
  try {
    return {
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'User',
      fullName: user.user_metadata?.full_name || user.user_metadata?.username || '',
      avatarUrl: user.user_metadata?.avatar_url || null,
      role: user.user_metadata?.role || 'tasker',
      // Add more useful user data as needed
      emailConfirmed: user.email_confirmed_at ? true : false,
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at,
    };
  } catch (err) {
    console.error("Error extracting user data:", err);
    return {
      id: user.id,
      email: user.email,
      username: 'User',
      fullName: '',
      avatarUrl: null,
      role: 'tasker',
    };
  }
};

// Force session refresh
export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error("Session refresh error:", error);
      return { success: false, error };
    }
    
    if (!data || !data.session) {
      return { success: false, error: new Error("No session returned") };
    }
    
    return { success: true, session: data.session, error: null };
  } catch (err) {
    console.error("Session refresh failed:", err);
    return { success: false, error: err };
  }
}; 