import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

export function UserProfile() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      await updateProfile({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      });
      addToast({ title: "Profile updated successfully" });
      setIsEditing(false);
    } catch (error) {
      addToast({ 
        title: "Error updating profile",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input 
              name="name"
              defaultValue={user?.name ?? ''}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input 
              name="email"
              type="email"
              defaultValue={user?.email ?? ''}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button type="submit">Save Changes</Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
