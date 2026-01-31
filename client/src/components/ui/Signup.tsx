import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

const COUNTRY_OPTIONS = [
  { value: "", label: "Select country" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "BR", label: "Brazil" },
  { value: "OTHER", label: "Other" },
];

export type SignupRole = "buyer" | "seller";

interface SignupProps {
  role: SignupRole;
  onBack?: () => void;
  className?: string;
}

export default function Signup({ role, onBack, className }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const roleLabel = role === "buyer" ? "Buyer" : "Seller";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) {
      toast.error("Please select your country.");
      return;
    }
    try {
      setIsSubmitting(true);
      await authClient.signUp.email(
        {
          email,
          password,
          name: email.split("@")[0] || "User",
          callbackURL: `${import.meta.env.VITE_FRONTEND_DEV_URL}/dashboard`,
          role,
          country,
          currency: "$",
          language: "en",
        } as Parameters<typeof authClient.signUp.email>[0],
        {
          onSuccess: () => {
            toast.success("Account created successfully.");
            if (onBack) onBack();
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "Sign up failed.");
            setIsSubmitting(false);
          },
        }
      );
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${import.meta.env.VITE_FRONTEND_DEV_URL}/dashboard`,
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
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Card className="relative border-border bg-card/80 shadow-lg overflow-hidden">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute top-4 left-4 z-10 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Create {roleLabel} account
          </CardTitle>
          <CardDescription>
            Sign up as a {roleLabel.toLowerCase()} to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
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
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                At least 6 characters
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-country">Country</Label>
              <select
                id="signup-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "text-foreground placeholder:text-muted-foreground"
                )}
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 font-medium"
            >
              {isSubmitting ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : (
                "Create account"
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
            onClick={handleGoogleSignUp}
            className="w-full h-10 border-border bg-background hover:bg-muted/50"
          >
            {isGoogleLoading ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            ) : (
              <>
                <FcGoogle className="size-5" aria-hidden />
                Sign up with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
