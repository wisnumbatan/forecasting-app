import { UserProfile } from '@/components/profile/user-profile';
import { ActivityLog } from '@/components/profile/activity-log';
import { SecuritySettings } from '@/components/profile/security-settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
  description: 'Manage your account settings and preferences.'
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <UserProfile />
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Security</h2>
          <SecuritySettings />
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <ActivityLog />
        </section>
      </div>
    </div>
  );
}