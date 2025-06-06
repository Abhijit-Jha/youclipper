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
import { useCombineJobStore, useDownloadJobStore, useTrimJobStore } from "../contexts/jobIdContext";
import { combinedVideoPathStore, finalVideoPathStore, trimmedVideoPathStore } from "../contexts/pathContext";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session, status } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(status == 'authenticated');

  const { trimCompleted } = useTrimJobStore();
  const { downloadCompleted } = useDownloadJobStore();
  const { combineCompleted } = useCombineJobStore();
  const { trimmedVideoPath } = trimmedVideoPathStore();
  const { combinedVideoPath } = combinedVideoPathStore();
  const { finalVideoPath } = finalVideoPathStore();

  // const [token,setToken] = useState();
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
    setIsAuthenticated(status == 'authenticated');
    console.log("Authentiaced", status);
    // setToken(session?.user.id) //works
    console.log(session)
  }, [session, status])

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
            {/* <div>
              {JSON.stringify(videoEditorState)}
            </div> */}
            {/* {JSON.stringify({ combineCompleted, trimCompleted, downloadCompleted, trimmedVideoPath, combinedVideoPath, finalVideoPath })} */}
            <Link
              href="/pricing"
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            {!isAuthenticated ? (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/80 text-background font-medium"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign up
              </Button>
            ) : (
              <UserProfile imageUrl={session?.user?.image || ""} uname={session?.user?.name || "User"} />
            )}


          </div>
        </nav>

      </motion.header >
      {IsLoginModalOpen && (
        <ContinueWithGoogleModal onClose={() => setIsLoginModalOpen(false)} />
      )
      }
    </>
  );
};