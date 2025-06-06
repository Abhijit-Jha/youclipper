"use client";

import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addToWaitlist } from "@/app/lib/controller/addToWaiting";
import { toast, Toaster } from "sonner";

const WaitingListModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        // silently add to waitlist, no validation, no error shown
        await addToWaitlist(email);
        toast("Added to waitlist! Follow on X for updates.");
        setEmail("");
        setOpen(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-md relative"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h2 className="text-xl font-semibold text-center mb-4">
                            Join the Waiting List
                        </h2>

                        <Input
                            placeholder="youclipper@youclipper.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            className="mt-4 w-full bg-primary text-white"
                            onClick={handleSubmit}
                            disabled={email.trim() === ""}
                        >
                            Notify Me
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WaitingListModal;
