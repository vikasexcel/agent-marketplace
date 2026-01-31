import { authClient } from "@/lib/auth-client";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface CustomAvatarProps {
  data: {
    user: {
      name: string;
      email: string;
      image: string;
    };
  };
}
const CustomAvatar: React.FC<CustomAvatarProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      // Consider showing a toast notification to the user
    }
  };
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        id="avatarButton"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden border border-border focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <img
          src={data?.user.image}
          alt="User dropdown"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          id="userDropdown"
          className="absolute left-0 mt-2 w-44 z-10 bg-card text-card-foreground border border-border rounded-lg shadow-md divide-y divide-border animate-fade-in"
        >
          {/* User info */}
          <div className="px-4 py-3 text-sm">
            <div className="font-semibold">{data?.user.name}</div>
            <div className="truncate text-muted-foreground text-xs">
              {data?.user.email}
            </div>
          </div>
          {/* Sign out */}
          <div className="py-1">
            <button
              type="button"
              className="block px-4 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors duration-150"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAvatar;
