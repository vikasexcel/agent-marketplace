import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const callbackURL = `${import.meta.env.VITE_FRONTEND_DEV_URL}/problems`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await authClient.signIn.email(
        { email, password, callbackURL },
        {
          onSuccess: () => {
            toast.success("Signed in successfully.");
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "Sign in failed.");
            setIsSubmitting(false);
          },
        }
      );
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
      toast.success("Redirecting to Google…");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Could not sign in with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        aria-hidden
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60vh] bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[50%] h-[40%] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[50%] h-[40%] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative flex-1 flex items-center justify-center px-6 py-6 sm:py-8">
        <div className="w-full max-w-md mx-auto">
          <Card className="border-border bg-card/80 shadow-lg overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Log in
              </CardTitle>
              <CardDescription>
                Sign in with your email or Google to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-10"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 font-medium"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground tracking-wide">
                  OR
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={isGoogleLoading}
                onClick={handleGoogleSignIn}
                className="w-full h-10 border-border bg-background hover:bg-muted/50"
              >
                {isGoogleLoading ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                ) : (
                  <>
                    <FcGoogle className="size-5" aria-hidden />
                    Continue with Google
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
