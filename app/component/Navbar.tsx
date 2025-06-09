"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import ContinueWithGoogleModal from "./ui/GoogleModal";
import { useSession } from "next-auth/react";
import UserProfile from "./ui/UserProfile";

// Skeleton components
const ButtonSkeleton = () => (
  <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
);

const UserProfileSkeleton = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
  </div>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(status === 'authenticated');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsAuthenticated(status === 'authenticated');
  }, [session, status]);

  const renderAuthSection = () => {
    if (status === 'loading') {
      return <ButtonSkeleton />;
    }

    if (!isAuthenticated) {
      return (
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/80 text-background font-medium"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Sign up
        </Button>
      );
    }

    return (
      <UserProfile
        imageUrl={session?.user?.image || ""}
        uname={session?.user?.name || "User"}
      />
    );
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="sm:text-4xl text-2xl font-bold font-handwritten">YouClipper</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            {renderAuthSection()}
          </div>
        </nav>
      </motion.header>
      {IsLoginModalOpen && (
        <ContinueWithGoogleModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};