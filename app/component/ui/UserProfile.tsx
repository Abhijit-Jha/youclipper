"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserProfileProps {
  imageUrl: string;
  size?: number;
  uname: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  imageUrl,
  uname,
  size = 40,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <div
        className="inline-block rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ width: size, height: size }}
        aria-label={uname}
        title={uname}
        onClick={() => setOpen(!open)}
      >
        <Image
          src={imageUrl || "/default-avatar.png"}
          alt={uname}
          width={size}
          height={size}
          className="object-cover"
          unoptimized={false}
          priority={true}
        />
      </div>
      {open && (
        <div className="absolute md:right-10 right-2 top-14 mt-2 w-40 bg-background shadow-lg border border-border rounded-xl z-50">
          <div className="px-4 py-2 border-b border-border text-foreground font-semibold">
            {uname}
          </div>
          <ul className="flex flex-col">
            <li>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
