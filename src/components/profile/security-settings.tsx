import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export function SecuritySettings() {
  const { addToast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implement password change logic
      addToast({ title: "Password updated successfully" });
    } catch (error) {
      addToast({ 
        title: "Error updating password",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" name="currentPassword" />
            </div>
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" name="newPassword" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input type="password" name="confirmPassword" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </Card>
  );
}