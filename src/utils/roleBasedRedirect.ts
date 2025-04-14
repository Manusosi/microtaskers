import { User } from '@supabase/supabase-js';

export const getRoleBasedRedirectPath = (user: User | null): string => {
  if (!user) return '/login';
  
  const role = user.user_metadata?.role;
  
  switch (role) {
    case 'tasker':
      return '/dashboard/tasker';
    case 'advertiser':
      return '/dashboard/advertiser';
    default:
      // If role is not set, default to tasker dashboard
      return '/dashboard/tasker';
  }
};

export const getUserRole = (user: User | null): string | null => {
  if (!user) return null;
  return user.user_metadata?.role || null;
}; 