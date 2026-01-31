import { useDashboard } from '@/lib/dashboard-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, Wallet, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INVENTORY_ITEMS } from '@/lib/dummy-data';

export function SellerDashboard() {
  const { currentUser, wallets, getSellerProfile, jobs, negotiations } = useDashboard();

  if (!currentUser) return null;

  const profile = getSellerProfile(currentUser.id);
  const wallet = wallets.find((w) => w.id === currentUser.walletId);
  const matchedJobs = jobs.filter((j) =>
    j.topSellers.some((s) => s.sellerId === currentUser.id)
  );
  const inventory = INVENTORY_ITEMS.filter((i) => i.sellerId === currentUser.id);
  const activeNegotiations = negotiations.filter(
    (n) => n.sellerId === currentUser.id && (n.status === 'pending' || n.status === 'accepted')
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.rating || 0}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.completedJobs || 0} jobs completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Opportunities</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matchedJobs.length}</div>
            <p className="text-xs text-muted-foreground">Matching your skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${wallet?.balance.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">Earnings available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${profile?.totalEarned.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <h3 className="text-lg font-semibold">Matched Job Opportunities</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {matchedJobs.map((job) => {
              const match = job.topSellers.find((s) => s.sellerId === currentUser.id);
              return (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <div className="font-semibold">
                          ${job.budget.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Match Score:</span>
                        <div className="font-semibold">
                          {((match?.matchScore || 0) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Buyer Rating:</span>
                      <div className="font-semibold">
                        {job.topSellers[0]?.rating || 0}
                      </div>
                    </div>
                    <Link to={`/dashboard/opportunities/${job.id}`}>
                      <Button className="w-full bg-transparent" variant="outline" size="sm">
                        View & Respond
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="negotiations" className="space-y-4">
          <h3 className="text-lg font-semibold">Active Negotiations</h3>

          <div className="space-y-3">
            {activeNegotiations.map((negotiation) => {
              const job = jobs.find((j) => j.id === negotiation.jobId);
              return (
                <Card key={negotiation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{job?.title}</CardTitle>
                        <CardDescription>
                          Round {negotiation.round} of {negotiation.maxRounds}
                        </CardDescription>
                      </div>
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground capitalize">
                        {negotiation.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Offered Price:</span>
                        <div className="font-semibold">
                          ${negotiation.currentOffer.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment:</span>
                        <div className="font-semibold">
                          {negotiation.currentOffer.paymentSchedule}
                        </div>
                      </div>
                    </div>
                    <Link to={`/dashboard/negotiations/${negotiation.id}`}>
                      <Button className="w-full" size="sm">
                        Respond
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Services & Inventory</h3>
            <Link to="/dashboard/inventory/new">
              <Button>Add Item</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {inventory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Base Price:</span>
                      <div className="font-semibold">
                        ${item.basePrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <div className="font-semibold capitalize">{item.status.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <h3 className="text-lg font-semibold">Wallet & Earnings</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${wallet?.balance.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pending Escrow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${wallet?.escrowBalance.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${profile?.totalEarned.toLocaleString() || 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Jobs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {profile?.completedJobs || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <Link to="/dashboard/wallet">
            <Button className="w-full">View Full Wallet History</Button>
          </Link>
        </TabsContent>
      </Tabs>
    </div>
  );
}
