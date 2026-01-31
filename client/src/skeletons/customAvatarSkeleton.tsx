import React from "react";

const CustomAvatarSkeleton: React.FC = () => {
  return (
    <div
      className="relative bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Avatar skeleton */}
      <button
        id="avatarButton"
        className="w-10 h-10 rounded-full overflow-hidden border border-border animate-pulse focus:outline-none"
        aria-label="Loading user avatar"
        disabled
      >
        <div className="w-full h-full bg-muted animate-pulse" />
      </button>

      {/* Dropdown skeleton */}
      <div
        id="userDropdown"
        className="absolute left-0 mt-2 w-44 z-10 bg-card border border-border rounded-lg divide-y divide-border animate-pulse shadow-md"
        aria-label="Loading user dropdown"
      >
        {/* User info skeleton */}
        <div className="px-4 py-3 text-sm">
          <div className="h-4 bg-muted rounded mb-1 animate-pulse" />
          <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
        </div>

        {/* Menu skeleton (bottom section) */}
        <div className="py-1">
          <button
            type="button"
            className="block px-4 py-2 text-sm bg-muted rounded animate-pulse w-full text-transparent cursor-default"
            aria-label="Loading sign out button"
            disabled
          >
            <div className="h-4 bg-muted rounded animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAvatarSkeleton;
