import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useToast } from '../../components/ui/use-toast';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  }

  return (
    <Card className="w-[400px] p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input 
            id="email"
            name="email" 
            type="email" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input 
            id="password"
            name="password" 
            type="password" 
            required 
          />
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </Card>
  );
}