import { useState } from "react";
import { Shield, Users, FileText, Building2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminReports } from "@/components/admin/AdminReports";
import { AdminMinistries } from "@/components/admin/AdminMinistries";
import { AdminUsers } from "@/components/admin/AdminUsers";

export const Admin = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You don't have admin privileges to access this portal.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="font-heading font-bold text-2xl">Admin Portal</h1>
          </div>
          <p className="text-primary-foreground/80">
            Manage reports, ministries, and system settings
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="ministries" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Ministries
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="mt-6">
            <AdminReports />
          </TabsContent>

          <TabsContent value="ministries" className="mt-6">
            <AdminMinistries />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};