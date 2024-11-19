import { useToast } from '@/components/ui/use-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
    return;
  }

  if (error instanceof Error) {
    toast({
      title: 'Unexpected Error',
      description: error.message,
      variant: 'destructive',
    });
    return;
  }

  toast({
    title: 'Error',
    description: 'An unknown error occurred',
    variant: 'destructive',
  });
}
const { addToast } = useToast();

function toast(props: any) {
  addToast(props);
}