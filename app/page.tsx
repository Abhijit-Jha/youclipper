"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { HeroSection } from "./component/Hero";
import { Button } from "./component/ui/Button";
import { Github, Lightbulb, Server, Twitter } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { VideoInput } from "./component/VideoInput";
import { useRouter } from "next/navigation";
import TrimOptions from "./component/ui/TrimOptions";
import DownloadOption from "./component/ui/DownloadOption";
import { Footer } from "./component/ui/footer";
export const features = [
  {
    title: "Fast Processing",
    description:
      "Experience lightning-fast video clipping and rendering powered by optimized backend processing.",
    link: "#fast-processing",
  },
  {
    title: "Open Source",
    description:
      "YouClipper is fully open-source, allowing transparency, flexibility, and contributions from developers worldwide.",
    link: "https://github.com/Abhijit-Jha/youclipper",
  },
  {
    title: "HD Output",
    description:
      "Download high-definition output videos with clarity preserved, suitable for sharing and publishing.",
    link: "#hd-output",
  },
  {
    title: "Privacy First",
    description:
      "All video processing is secure and handled responsibly—your content stays yours.",
    link: "#privacy",
  },
  {
    title: "No Watermark",
    description:
      "Your output videos are clean and professional—no forced branding or watermarks added.",
    link: "#no-watermark",
  },
  {
    title: "Low Pricing",
    description:
      "Affordable pricing plans tailored for everyone—from casual users to content creators.",
    link: "#pricing",
  },
  {
    title: "Easy to Use",
    description:
      "Intuitive UI with guided steps makes trimming and downloading videos effortless for everyone.",
    link: "#how-it-works",
  },
  {
    title: "Cross-Platform",
    description:
      "Built to work smoothly across all major browsers and devices—desktop or mobile.",
    link: "#cross-platform",
  },
];


const downloadOptions = [
  { title: "Video / 144p", resolution: "256×144", premium: false, quality: "144p", type: "video" },
  { title: "Video / 360p", resolution: "640×360", premium: false, quality: "360p", type: "video" },
  { title: "Video / 720p", resolution: "1280×720", premium: true, quality: "720p", type: "video" },
  { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
  { title: "Audio", resolution: "—", premium: false, quality: "audio", type: "audio" },
];


export default function Home() {
  const route = useRouter();
  const content = [
    {
      title: "Get Started Instantly",
      description:
        "Sign up with your Google account to unlock the full potential of YouClipper. No lengthy forms—just one click and you're in. Fast, secure, and seamless access to your personalized clipping experience.",
      content: (
        <VideoInput
          onVideoSubmit={() => {
            route.push("/clip");
          }}
        />
      ),
    },
    {
      title: "Select the Clip Window",
      description:
        "Easily choose the start and end points of your video. Whether you're trimming a tutorial, a highlight reel, or a meme, YouClipper gives you precise control with a simple drag interface.",
      content: (
        <div className="flex items-center p-10">
          <TrimOptions duration={100000} />
        </div>
      ),
    },
    {
      title: "Pick Your Quality",
      description:
        "Choose your desired video quality—from 144p to full HD. Download clean, watermark-free clips instantly. Some high-quality options may require a premium upgrade, but signing in with Google gives you access to free standard resolutions.",
      content: (
        <div className="max-h-96 overflow-y-scroll overflow-x-hidden space-y-4 scrollbar-hide">
          {downloadOptions.map((data, index) => (
            <DownloadOption
              onClick={() => {
                route.push("/clip");
              }}
              key={index}
              title={data.title}
              premium={data.premium}
              quality={data.quality}
              type={data.type}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center text-xl font-bold ">
          Why <span className="text-primary ml-1">YouClipper</span>?
        </div>

        <div className="md:max-w-5xl mx-auto md:px-8">
          <HoverEffect items={features} />
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">See It in <span className="text-primary ml-1">Action</span></h2>
          <div className="w-full py-4">
            <StickyScroll content={content} />
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      {/* GitHub & Community Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Power to the Community 🚀
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-base sm:text-lg">
          YouClipper is open-source. Star it, fork it, or self-host it. Whether you're a hobbyist or a pro dev, you're welcome to contribute, suggest features, or just vibe with us online.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            className="border-primary/40 hover:border-primary/60 text-foreground font-medium text-base px-6 py-4 flex items-center gap-2 hover:bg-primary/10 transition"
            onClick={() =>
              window.open("https://github.com/Abhijit-Jha/youclipper", "_blank")
            }
          >
            <Github className="h-5 w-5" />
            Star
          </Button>

          <Button
            variant="ghost"
            className="border border-gray-300 text-foreground/80 hover:text-foreground px-6 py-4 flex items-center gap-2 hover:bg-white/5 transition"
            onClick={() =>
              window.open(
                "https://github.com/Abhijit-Jha/youclipper#self-hosting",
                "_blank"
              )
            }
          >
            <Server className="h-5 w-5" />
            Self-Host
          </Button>

          <Button
            variant="ghost"
            className="border border-gray-300 text-foreground/80 hover:text-foreground px-6 py-4 flex items-center gap-2 hover:bg-white/5 transition"
            onClick={() =>
              window.open(
                "https://github.com/Abhijit-Jha/youclipper/issues",
                "_blank"
              )
            }
          >
            <Lightbulb className="h-5 w-5" />
            Suggest a Feature
          </Button>

          <Button
            variant="ghost"
            className="border border-gray-300 text-foreground/80 hover:text-foreground px-6 py-4 flex items-center gap-2 hover:bg-white/5 transition"
            onClick={() =>
              window.open("https://twitter.com/AbhijitJha_dev", "_blank")
            }
          >
            <Twitter className="h-5 w-5 text-sky-400" />
            Follow on Twitter
          </Button>
        </div>
      </section>


      {/* Footer Section */}
      <Footer />
    </div>
  );
}
