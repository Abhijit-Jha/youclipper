"use client";

import { Check } from "lucide-react";
import { Button } from "../component/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WaitingListModal from "../component/ui/WaitingList";
// import { Button } from "@/components/ui/Button";

const plans = [
    {
        name: "Free",
        price: "₹0",
        description: "For casual creators who want to try out YouClipper.",
        features: [
            "Nothing Literally Nothing!!",
            "We Don't have server :(",
            "480p and 720p resolution support",
            "Basic trimming & editing",
            "Community support",
        ],
        cta: "Start for Free",
        // no onclick in this 
    },
    {
        name: "Pro",
        price: "₹499/mo",
        description: "For creators who want full control & speed.",
        features: [
            "Unlimited clips",
            "Full HD (1080p) support",
            "Faster processing (powered by FFmpeg)",
            "AI smart clip suggestions",
            "Priority email support",
        ],
        cta: "Join Waiting List",
        highlight: true,
    },
    {
        name: "Self-Host",
        price: "Free (Forever)",
        description:
            "Deploy YouClipper on your own server and control everything.",
        features: [
            "Host on your infrastructure",
            "Full access to codebase (MIT License)",
            "Custom branding support",
            "Community forum access",
        ],
        cta: "Get Started",
    },
];

export default function PricingPage() {
    const [open, setOpen] = useState(false);
    const route = useRouter();
    const onClickFunctions: { [key: string]: () => void } = {
        'Free': () => route.push('/clip'),
        'Pro': () => setOpen(true),
        'Self-Host': () => window.open("https://github.com/Abhijit-Jha/youclipper", "_blank")
    };
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">Simple, transparent pricing</h1>
                <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
                    We are currently not providing any premium Plans Join the waiting List for future access
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`rounded-xl p-6 border ${plan.highlight
                            ? "border-primary shadow-lg bg-primary/5"
                            : "border-white/10"
                            }`}
                    >
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                            <p className="text-muted-foreground mt-1">{plan.description}</p>
                        </div>
                        <div className="text-3xl font-bold text-white mb-4">
                            {plan.price}
                            <span className="text-sm text-muted-foreground font-normal">
                                {plan.name === "Pro" && " /month"}
                            </span>
                        </div>

                        <ul className="space-y-2 text-sm text-slate-300 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full ${plan.highlight
                                ? "bg-primary text-white hover:bg-primary/90"
                                : "border text-white border-white/20 bg-transparent hover:bg-white/10"
                                }`}
                            onClick={() => onClickFunctions[plan.name]?.()}
                        >
                            {plan.cta}
                        </Button>
                    </div>
                ))}
                {open && <WaitingListModal open={open} setOpen={setOpen} />}
            </div>
        </div>
    );
}
