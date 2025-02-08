
import { useState } from "react";
import { Bell, BellOff, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const navigate = useNavigate();
  const userId = "HU" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "w-80 bg-primary text-primary-foreground p-4 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-secondary">Hush</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-secondary">Your Hush ID</p>
            <p className="text-lg font-mono">{userId}</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-secondary">Notifications</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            >
              {isNotificationsEnabled ? (
                <Bell className="h-5 w-5 text-secondary" />
              ) : (
                <BellOff className="h-5 w-5 text-secondary" />
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full text-secondary hover:text-secondary/90 justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center px-4 bg-primary/5">
          {!isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <h2 className="text-xl font-semibold text-primary">Messages</h2>
        </header>
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </main>
    </div>
  );
};
