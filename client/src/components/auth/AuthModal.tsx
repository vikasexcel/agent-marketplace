import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "signup" | "signin";
}

export default function AuthModal({
  open,
  onOpenChange,
  initialMode = "signup",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signup" | "signin">(initialMode);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoading2, setLoading2] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => setMode(mode === "signup" ? "signin" : "signup");

  const title = mode === "signup" ? "Create account" : "Welcome to Template";
  const subtitle =
    mode === "signup"
      ? "Sign up to get started with Template"
      : "Sign in to continue where you left off";
  const footerText =
    mode === "signup" ? "ALREADY HAVE AN ACCOUNT?" : "NEW TO Template?";
  const switchText =
    mode === "signup" ? "Sign in to your account" : "Sign up to get started";

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google" as const,
        callbackURL: `${import.meta.env.VITE_FRONTEND_DEV_URL}/dashboard`,
      });
      toast.success("Signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      setLoading2(true);
      await authClient.signUp.email(
        {
          email,
          password,
          name: email.split("@")[0], // derive name from email
          callbackURL: `${import.meta.env.VITE_FRONTEND_DEV_URL}/dashboard`,
        },
        {
          onRequest: () => {
            setLoading2(true);
          },
          onSuccess: () => {
            toast.success("Sign Up Successfully.")
            onOpenChange(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setLoading2(false);
          },
        }
      );
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading2(false);
    }
  };
  
  const handleEmailSignIn = async () => {
    try {
      setLoading2(true);
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: `${import.meta.env.VITE_FRONTEND_DEV_URL}/dashboard`,
        },
        {
          onRequest: () => {
            setLoading2(true);
          },
          onSuccess: () => {
            toast.success("Signed in successfully");
            onOpenChange(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setLoading2(false);
          },
        }
      );
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading2(false);
    }
  };
  
  const handleSubmit = async () => {
    if (mode === "signup") {
      await handleEmailSignUp();
    } else {
      await handleEmailSignIn();
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-card-foreground border border-border sm:max-w-md transition-all duration-300">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold flex justify-center items-center">
            {title}
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2 flex justify-center items-center">
            {subtitle}
          </p>
        </DialogHeader>

        {/* Input fields */}
        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-background text-foreground border border-border focus:ring-2 focus:ring-ring focus:outline-none placeholder:text-muted-foreground text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-background text-foreground border border-border focus:ring-2 focus:ring-ring focus:outline-none placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Submit Button (Sign Up / Sign In) */}
        <div className="mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading2}
            className="w-full bg-primary text-primary-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {isLoading2 ? (
              <LoaderCircle className="animate-spin" />
            ) : mode === "signup" ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border" />
          <span className="px-3 text-xs text-muted-foreground tracking-widest">
            OR
          </span>
          <div className="flex-grow h-px bg-border" />
        </div>

        {/* Google Sign-in Button */}
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            disabled={isLoading}
            className="w-full bg-transparent border border-border text-foreground hover:bg-muted flex items-center justify-center gap-2 transition-colors"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} />
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Continue with Google"
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border" />
          <span className="px-3 text-xs text-muted-foreground tracking-widest">
            {footerText}
          </span>
          <div className="flex-grow h-px bg-border" />
        </div>

        {/* Switch mode */}
        <p
          className="text-center text-muted-foreground text-sm cursor-pointer hover:underline transition-colors"
          onClick={toggleMode}
        >
          {switchText}
        </p>
      </DialogContent>
    </Dialog>
  );
}
