import { BuyerDashboard } from '@/components/dashboard/BuyerDashboard';
import { SellerDashboard } from '@/components/dashboard/SellerDashboard';
import { authClient } from '@/lib/auth-client';

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Get the role from the session user
  const role = (session.user as { role?: string }).role;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          {session.user.email} • {role === 'seller' ? 'Seller' : 'Buyer'} Dashboard
        </p>
      </div>

      {/* Render appropriate dashboard based on role */}
      {role === 'seller' ? <SellerDashboard /> : <BuyerDashboard />}
    </div>
  );
}
