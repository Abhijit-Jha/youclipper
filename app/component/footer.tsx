"use client";

import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { addToWaitlist } from "../lib/controller/addToWaiting";

const socials = [
    {
        icon: <Github className="h-5 w-5" />,
        link: "https://github.com/Abhijit-Jha/youclipper",
        label: "GitHub",
        color: "hover:text-primary/80",
    },
    {
        icon: <Twitter className="h-5 w-5" />,
        link: "https://X.com/youclipper",
        label: "Twitter",
        color: "hover:text-blue-400",
    },
    {
        icon: <Linkedin className="h-5 w-5" />,
        link: "https://www.linkedin.com/in/abhijit-jha1/",
        label: "LinkedIn",
        color: "hover:text-blue-500",
    },
];

const quickLinks = [
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "https://github.com/Abhijit-Jha/youclipper#readme" },
    { name: "Self Host", href: "https://github.com/Abhijit-Jha/youclipper/blob/master/README.md#-ready-to-self-host-lets-get-started" },
    { name: "Star", href: "https://github.com/Abhijit-Jha/youclipper" },
    { name: "Support", href: "https://X.com/youclipper" }, // TODO:Change Link
];

const features = [
    { icon: <Zap className="h-4 w-4" />, text: "Lightning Fast" },
    { icon: <Shield className="h-4 w-4" />, text: "Secure & Private" },
    { icon: <Clock className="h-4 w-4" />, text: "24/7 Support" },
];

const technologies = [
    {
        name: "yt-dlp",
        href: "https://github.com/yt-dlp/yt-dlp",
    },
    {
        name: "FFmpeg",
        href: "https://ffmpeg.org/",
    },
    {
        name: "ffmpeg-static",
        href: "https://www.npmjs.com/package/ffmpeg-static",
    },
    {
        name: "bullMQ",
        href: "https://docs.bullmq.io/",
    },
    {
        name: "Redis",
        href: "https://redis.io/",
    },
    {
        name: "Next.js",
        href: "https://nextjs.org/",
    },
];

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addToWaitlist(email);
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    return (
        <footer className="relative text-white overflow-hidden">
            <div className="relative">
                <div className="container mx-auto px-6 pt-16 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Brand + Newsletter */}
                        <div className="lg:col-span-6 space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
                                    YouClipper
                                </h2>
                                <p className="text-slate-300 mt-2 text-lg">
                                    The ultimate YouTube video clipping tool for creators
                                </p>
                                <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                                    Transform your YouTube content into engaging clips with our
                                    powerful, AI-driven platform. Clip, edit, and share in
                                    seconds.
                                </p>
                            </div>

                            {/* Feature highlights */}
                            <div className="flex flex-wrap gap-4">
                                {features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/10"
                                    >
                                        <span className="text-primary">{feature.icon}</span>
                                        <span className="text-xs text-slate-300">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Newsletter */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
                                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={async () => await addToWaitlist(email)}
                                        className="px-4 py-2.5 bg-primary rounded-lg font-medium transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        {isSubscribed ? (
                                            <>
                                                <Star className="h-4 w-4" />
                                                Subscribed!
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Quick Links & Technologies Used */}
                        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    {quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                                className="text-slate-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies Used */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                                    Technologies Used
                                </h3>
                                <ul className="space-y-3">
                                    {technologies.map(({ name, href }) => (
                                        <li key={name}>
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-300 hover:text-primary/80 transition-colors hover:translate-x-1 transform inline-block text-sm"
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-6">
                                <p className="text-slate-400 text-sm">
                                    &copy; {new Date().getFullYear()} YouClipper. All rights reserved.
                                </p>
                                <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                                    <span>Made with</span>
                                    <span className="text-red-400 animate-pulse cursor-crosshair">❤️</span>
                                    <span>by</span>
                                    <Link
                                        href="https://github.com/Abhijit-Jha"
                                        target="_blank"
                                        className="text-primary hover:text-primary/80 font-bold"
                                    >
                                        Abhijit Jha
                                    </Link>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="flex items-center gap-4">
                                <span className="text-slate-400 text-sm hidden md:block">Follow us:</span>
                                <div className="flex gap-3">
                                    {socials.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.link}
                                            aria-label={social.label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-full backdrop-blur-sm border border-white/10 text-slate-300 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:border-primary group`}
                                        >
                                            <span className="group-hover:rotate-12 transform transition-transform duration-200 inline-block">
                                                {social.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
