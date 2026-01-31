import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { DashboardProvider } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Wallet, 
  Bell,
  Settings,
  LogOut,
  Package,
  TrendingUp,
  Loader2
} from "lucide-react";

function DashboardContent() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const role = (session?.user as { role?: string })?.role;

  useEffect(() => {
    if (!isPending && !session?.user) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  };

  // Navigation items based on role
  const buyerNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/jobs", icon: Briefcase, label: "My Jobs" },
    { to: "/dashboard/negotiations", icon: MessageSquare, label: "Negotiations" },
    { to: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
    { to: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  ];

  const sellerNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/opportunities", icon: TrendingUp, label: "Opportunities" },
    { to: "/dashboard/negotiations", icon: MessageSquare, label: "Negotiations" },
    { to: "/dashboard/inventory", icon: Package, label: "Inventory" },
    { to: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
    { to: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  ];

  const navItems = role === 'seller' ? sellerNavItems : buyerNavItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl">
              Agent Marketplace
            </Link>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {role === 'seller' ? 'Seller' : 'Buyer'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {session.user.email}
            </span>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard/notifications">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="gap-2"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex w-64 flex-col border-r min-h-[calc(100vh-56px)] p-4">
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Logout button at bottom of sidebar */}
          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="container max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
