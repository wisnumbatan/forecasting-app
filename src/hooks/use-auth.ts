import { useQuery, useMutation } from '@tanstack/react-query';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AuthService } from '../lib/service/auth.service';

export function useAuth() {
  const { data: session, status } = useSession();

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      signIn('credentials', { ...credentials, redirect: false }),
  });

  const registerMutation = useMutation({
    mutationFn: AuthService.register
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profile: { name: string; email: string }) =>
      AuthService.updateProfile(profile)
  });

  const logout = () => signOut({ redirect: true, callbackUrl: '/login' });

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    updateProfile: updateProfileMutation.mutate,
  };
}