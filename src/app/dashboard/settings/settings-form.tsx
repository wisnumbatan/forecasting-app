import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useSettings } from '@/hooks/use-settings';

type FormType = 'profile' | 'preferences' | 'notifications' | 'api';

export function SettingsForm({ type }: { type: FormType }) {
  const { toast } = useToast();
  const { settings, updateSettings } = useSettings();
  
  const renderProfileFields = () => (
    <>
      <div className="space-y-2">
        <label>Name</label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message as string}</p>
        )}
      </div>
      <div className="space-y-2">
        <label>Email</label>
        <Input {...register('email')} type="email" />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message as string}</p>
        )}
      </div>
      <div className="space-y-2">
        <label>Organization</label>
        <Input {...register('organization')} />
      </div>
    </>
  );

  const renderPreferencesFields = () => (
    <>
      <div className="space-y-2">
        <label>Theme</label>
        <Select {...register('theme')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </Select>
      </div>
      <div className="space-y-2">
        <label>Language</label>
        <Select {...register('language')}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </Select>
      </div>
      <div className="space-y-2">
        <label>Timezone</label>
        <Select {...register('timezone')}>
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time</option>
          <option value="PST">Pacific Time</option>
        </Select>
      </div>
    </>
  );

  const renderNotificationFields = () => (
    <>
      <div className="flex items-center justify-between">
        <label>Email Notifications</label>
        <Switch {...register('emailNotifications')} />
      </div>
      <div className="flex items-center justify-between">
        <label>Push Notifications</label>
        <Switch {...register('pushNotifications')} />
      </div>
      <div className="flex items-center justify-between">
        <label>Forecast Alerts</label>
        <Switch {...register('forecastAlerts')} />
      </div>
    </>
  );

  const renderApiFields = () => (
    <>
      <div className="space-y-2">
        <label>API Key</label>
        <div className="flex space-x-2">
          <Input {...register('apiKey')} type="password" readOnly />
          <Button type="button" variant="outline" onClick={generateNewApiKey}>
            Generate New Key
          </Button>
        </div>
      </div>
    </>
  );

  const generateNewApiKey = async () => {
    try {
      const newKey = await generateNewApiKey();
      setValue('apiKey', newKey);
      toast({
        title: 'New API Key Generated',
        description: 'Your new API key has been created successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate new API key.',
        variant: 'destructive'
      });
    }
  };

  const { register, handleSubmit, setValue, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(getSchemaForType(type)),
    defaultValues: settings?.[type]
  });

  const onSubmit = async (data: any) => {
    try {
      await updateSettings({ [type]: data });
      toast({
        title: 'Settings Updated',
        description: 'Your settings have been saved successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {type === 'profile' && renderProfileFields()}
        {type === 'preferences' && renderPreferencesFields()}
        {type === 'notifications' && renderNotificationFields()}
        {type === 'api' && renderApiFields()}
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}

function getSchemaForType(type: FormType) {
  switch (type) {
    case 'profile':
      return z.object({
        name: z.string().min(2),
        email: z.string().email(),
        organization: z.string().optional()
      });
    case 'preferences':
      return z.object({
        theme: z.enum(['light', 'dark', 'system']),
        language: z.string(),
        timezone: z.string()
      });
    case 'notifications':
      return z.object({
        emailNotifications: z.boolean(),
        pushNotifications: z.boolean(),
        forecastAlerts: z.boolean()
      });
    case 'api':
      return z.object({
        apiKey: z.string().optional()
      });
  }
}