import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SettingsService } from '@/lib/service/settings.service';
import { useAuth } from './use-auth';
import { useToast } from '@/components/ui/use-toast';

export function useSettings() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { addToast } = useToast();
  const { data: settings } = useQuery({
    queryKey: ['settings', user?.id],
    queryFn: () => SettingsService.getUserPreferences(user!.id),
    enabled: !!user
  });

  const updateSettings = useMutation({
    mutationFn: (newSettings: any) => 
      SettingsService.updateUserPreferences(user!.id, newSettings),
    onSuccess: () => {
      addToast({
        title: 'Settings updated',
        description: 'Your preferences have been saved successfully.'
      });
    },
    onError: (error) => {
      addToast({
        description: 'Failed to update settings.',
        variant: 'destructive'
      });
    }
  });

  const generateApiKey = useMutation({
    mutationFn: () => SettingsService.generateApiKey(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', user?.id] });
      addToast({
        title: 'API Key Generated',
        description: 'New API key has been created successfully.'
      });
    }
  });

  return {
    settings,
    updateSettings: updateSettings.mutate,
    generateApiKey: generateApiKey.mutate,
    isLoading: updateSettings.isPending
  };
}
