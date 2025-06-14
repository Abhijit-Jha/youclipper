"use client";
import { useQueueStatusStore } from "@/app/contexts/extra";
import { cn } from "@/app/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={cn("w-6 h-6", className)}
    >
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const CheckFilled = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("w-6 h-6", className)}
    >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
        />
    </svg>
);

const Spinner = ({ className }: { className?: string }) => (
    <svg
        className={cn("w-6 h-6 animate-spin text-lime-500", className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
        />
    </svg>
);

type LoadingState = {
    text: string;
};

const LoaderCore = ({
    loadingStates,
    value = 0,
}: {
    loadingStates: LoadingState[];
    value?: number;
}) => {
    const { statusOfYourJob } = useQueueStatusStore();

    return (
        <div className="flex flex-col max-w-xl mx-auto justify-start relative">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0);

                return (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, y: -(value * 40) }}
                        animate={{ opacity, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {index > value ? (
                            <CheckIcon className="text-white" />
                        ) : value === index && statusOfYourJob === "processing" ? (
                            <Spinner />
                        ) : (
                            <CheckFilled
                                className={cn(
                                    "text-white",
                                    value === index &&
                                    "text-lime-500 opacity-100"
                                )}
                            />
                        )}
                        <span
                            className={cn(
                                " dark:text-white text-sm sm:text-base",
                                value === index && "text-lime-400"
                            )}
                        >
                            {loadingState.text}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
    loadingStates,
    loading,
    step = 0,
}: {
    loadingStates: LoadingState[];
    loading?: boolean;
    step?: number;
}) => {
    const { currentWaitingJobs, statusOfYourJob } = useQueueStatusStore();
    
    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full absolute inset-0 z-10 flex items-center justify-center"
                >
                    <div className="relative px-4 sm:px-6">

                        <LoaderCore value={step} loadingStates={loadingStates} />

                        {/* Updated UX Card */}
                        <div className="mt-6 w-full max-w-sm mx-auto text-center bg-zinc-900/80 px-6 py-4 rounded-lg shadow-md backdrop-blur-md">
                            <p className="text-sm text-gray-200">
                                <span className="font-semibold text-white">
                                    Queue Position:
                                </span>{" "}
                                {currentWaitingJobs}
                            </p>
                            <p className="text-sm text-gray-200 mt-1">
                                <span className="font-semibold text-white">
                                    Status:
                                </span>{" "}
                                {statusOfYourJob}
                            </p>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
