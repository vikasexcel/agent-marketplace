import { useDashboard } from '@/lib/dashboard-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, Wallet, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BuyerDashboard() {
  const { currentUser, jobs, wallets, getBuyerProfile, negotiations } = useDashboard();

  if (!currentUser) return null;

  const profile = getBuyerProfile(currentUser.id);
  const wallet = wallets.find((w) => w.id === currentUser.walletId);
  const activeJobs = jobs.filter((j) => j.status === 'open' || j.status === 'in_progress');
  const activeNegotiations = negotiations.filter((n) => n.status === 'pending' || n.status === 'accepted');

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {jobs.length} total jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Negotiations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeNegotiations.length}</div>
            <p className="text-xs text-muted-foreground">
              Pending deals
            </p>
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
            <p className="text-xs text-muted-foreground">
              {currentUser.currency}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.rating || 0}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.completedJobs || 0} jobs completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Jobs</h3>
            <Link to="/dashboard/jobs/new">
              <Button>Create New Job</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {activeJobs.map((job) => (
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
                      <span className="text-muted-foreground">Status:</span>
                      <div className="font-semibold capitalize">{job.status.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Top Sellers:</span>
                    <div className="font-semibold">
                      {job.topSellers.length} matched
                    </div>
                  </div>
                  <Link to={`/dashboard/jobs/${job.id}`}>
                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
                        <span className="text-muted-foreground">Current Offer:</span>
                        <div className="font-semibold">
                          ${negotiation.currentOffer.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Terms:</span>
                        <div className="font-semibold truncate">
                          {negotiation.currentOffer.paymentSchedule}
                        </div>
                      </div>
                    </div>
                    <Link to={`/dashboard/negotiations/${negotiation.id}`}>
                      <Button className="w-full" size="sm">
                        Review Offer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <h3 className="text-lg font-semibold">Wallet Status</h3>

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
                <CardTitle className="text-sm">Escrow Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${wallet?.escrowBalance.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Daily Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${wallet?.dailySpent.toLocaleString()} / $
                  {wallet?.dailyLimit.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Per-Job Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${wallet?.perJobLimit.toLocaleString()}
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
