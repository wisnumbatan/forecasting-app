import { SettingsForm } from './settings-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SettingsForm type="profile" />
        </TabsContent>
        
        <TabsContent value="preferences">
          <SettingsForm type="preferences" />
        </TabsContent>
        
        <TabsContent value="notifications">
          <SettingsForm type="notifications" />
        </TabsContent>
        
        <TabsContent value="api">
          <SettingsForm type="api" />
        </TabsContent>
      </Tabs>
    </div>
  );
}