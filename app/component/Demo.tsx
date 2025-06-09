import React from 'react';
import { Play, Sparkles } from 'lucide-react';

const Demo = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

            <div className="relative text-center mb-12">
                <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent mb-4">
                    Demo
                </h2>
            </div>

            {/* Main video container with multiple animated borders */}
            <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-amber-500/30 to-primary/30 rounded-3xl blur-2xl animate-pulse-glow opacity-60" />

                {/* Main video container */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10 pointer-events-none" />


                    {/* Video element */}
                    <video
                        className="w-full h-auto relative z-10 transform group-hover:scale-[1.02] transition-transform duration-700"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Demo Video"
                        title="Demo"
                    >
                        <source src="/demo.mp4" type="video/mp4" />
                        <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <p className="text-gray-400">Your browser does not support the video tag.</p>
                        </div>
                    </video>

                    {/* Bottom gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />
                </div>

                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary rounded-tl-lg animate-corner-glow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-amber-400 rounded-tr-lg animate-corner-glow-delayed" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-primary rounded-bl-lg animate-corner-glow-delayed" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-amber-400 rounded-br-lg animate-corner-glow" />
            </div>

            {/* Bottom decorative elements */}
            <div className="flex justify-center mt-8 space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
        </div>
    );
};

export default Demo;