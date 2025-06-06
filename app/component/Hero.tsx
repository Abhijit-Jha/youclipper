"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Loader2 } from "lucide-react";
import { TypewriterEffect } from "./ui/type-writter-effect";
import { Button } from "./ui/Button";
import SignUpModal from "./ui/Modal";
import ContinueWithGoogleModal from "./ui/Modal";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getToken } from "next-auth/jwt";

export const HeroSection = () => {
  const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(status == 'authenticated');
  }, [status, session])
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl w-full mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold leading-tight mb-6"
        >
          Why Share a Whole Video? <br />
          <span className="text-primary">Clip What Counts.</span>
        </motion.h1>

        <div className="my-6 h-12">
          <TypewriterEffect />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-foreground/70 mb-8"
        >
          Built for creators, educators, and meme lovers alike.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            className="bg-primary hover:bg-primary/80 text-background font-medium text-lg px-8 py-6"
            onClick={() => {
              isLoading(true);
              if (isAuthenticated) {
                router.push('/clip');
                isLoading(false);
              } else {
                setIsLoginModalOpen(true);
                isLoading(false);
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
              </>
            ) : (
              ""
            )}
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-primary/30 hover:border-primary/60 text-foreground/90 font-medium text-lg px-8 py-6"
            onClick={() => window.open('https://github.com/Abhijit-Jha/youclipper', '_blank')}
          >
            <Github className="mr-2 h-5 w-5" />
            Star on GitHub
          </Button>

        </motion.div>
      </motion.div>
      <div className="">
        {IsLoginModalOpen && <ContinueWithGoogleModal onClose={() => setIsLoginModalOpen(false)} />}
      </div>
    </div>
  );
};