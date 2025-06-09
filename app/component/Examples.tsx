"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="flex items-center justify-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Examples....
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const data = [
    {
        category : 'Spirituality',
        title : 'Show direction to your soul',
        src : '/life.mp4'
    },
    {
        category : 'Truth',
        title : 'Share the Truth with everyone',
        src : '/truth.mp4'
    },
    {
        category: "Productivity",
        title: "Earn by Posting Short Clips",
        src: '/podcast.mp4',
    },
    
    {
        category : 'Gaming',
        title : 'Show Your Skills',
        src : '/game.mp4'
    },
    {
        category: "Music",
        title: "Make Reels Edits with YouClipper",
        src: "/music.mp4",
    },
    {
        category: "Product",
        title: "Promote Your Videos Effectively",
        src: "/productive.mp4",
    },
    {
        category: "Learning",
        title: "Get More Reach and Grow Your Audience",
        src: "/content.mp4",
    },
    {
        category: "Meme",
        title: "Share Memes and Spread Happiness",
        src: "/meme.mp4",
    },
    {
        category: "Fitness",
        title: "Help Everyone Get Fit and Healthy",
        src: "/gym.mp4",
    },
];
