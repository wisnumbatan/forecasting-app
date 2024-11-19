// src/app/(auth)/login/page.tsx
import { LoginForm } from '@/components/auth/login-form';
import { siteMetadata } from '../../../config/site';

export const metadata = {
  title: `Login - ${siteMetadata.title}`,
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}