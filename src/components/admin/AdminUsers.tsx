import { useState, useEffect } from "react";
import { UserPlus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      toast({
        title: "Error",
        description: "Failed to load admin users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      // This is a simplified version - in a real app, you'd need to:
      // 1. Check if user exists in auth.users
      // 2. Get their user_id
      // 3. Add them to admin_users table
      
      toast({
        title: "Feature Note",
        description: "In a full implementation, this would require proper user lookup and invitation system",
      });
      
      setNewAdminEmail("");
    } catch (error) {
      console.error("Error adding admin:", error);
      toast({
        title: "Error",
        description: "Failed to add admin user",
        variant: "destructive",
      });
    }
  };

  const removeAdmin = async (adminId: string) => {
    try {
      const { error } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", adminId);

      if (error) throw error;

      setAdminUsers(adminUsers.filter(admin => admin.id !== adminId));
      
      toast({
        title: "Success",
        description: "Admin user removed",
      });
    } catch (error) {
      console.error("Error removing admin:", error);
      toast({
        title: "Error",
        description: "Failed to remove admin user",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading admin users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="admin-email">Email Address</Label>
            <Input
              id="admin-email"
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <Button onClick={addAdmin} className="w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Admin User
          </Button>
          <p className="text-xs text-muted-foreground">
            Note: This is a simplified demo. In production, this would require proper user invitation flow.
          </p>
        </CardContent>
      </Card>

      {/* Current Admins */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Current Admin Users ({adminUsers.length})
        </h3>
        
        {adminUsers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No admin users found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {adminUsers.map((admin) => (
              <Card key={admin.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium">Admin User</span>
                        <Badge variant="secondary">{admin.role}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        User ID: {admin.user_id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added: {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAdmin(admin.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};