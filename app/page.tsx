// "use client";
// import { useEffect, useState } from "react";
// import Input from "./components/ui/Input";
// import Button from "./components/ui/Button";
// import { parseISODurationToSeconds, formatSecondsToHHMMSS, convertHHMMSSToSeconds } from "./components/utils/handleTimeUnits";
// import { getVideoDetails } from "./components/utils/fetchVideoDetails";

import { BackgroundEffect } from "./component/BackgroundEffect";
import { HeroSection } from "./component/Hero";
import { Navbar } from "./component/Navbar";

// export default function Home() {
//   const [youtubeVideoURL, setYoutubeVideoURL] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [error, setError] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [videoDetails, setVideoDetails] = useState<any>({
//   });
//   const [clippingWindow, setClippingWindow] = useState({
//     startTime: "00:00:00",
//     endTime: videoDetails?.videoDetails?.duration ? formatSecondsToHHMMSS(videoDetails.videoDetails.duration) : "00:00:00"
//   });
//   const [loading, setLoading] = useState(false);


//   const handleDownloadLogic = ({ startTime, endTime, videoId }: { startTime: string, endTime: string, videoId: string }) => {
//     const startTimeInSec = convertHHMMSSToSeconds(startTime);
//     const endTimeInSec = convertHHMMSSToSeconds(endTime);

//     //Logic to handle -ve clipping
//     if (startTimeInSec > endTimeInSec) {
//       console.log("Some Error");
//       return;
//     }

//     //Logic to handle  minimum 15 second clip
//     if(endTimeInSec - startTimeInSec <15){
//       console.log(`You cant clip ${endTimeInSec-startTimeInSec} seconds clip`)
//       return;
//     }
//     console.log(clippingWindow, " Clipping time")

//     //Logic to Download the clip 

//   }

//   const fetchVideoDetails = async () => {
//     try {
//       setLoading(true);
//       const res = await getVideoDetails(videoId);
//       const video = res.data.videoDetails[0];

//       const durationInSeconds = parseISODurationToSeconds(video.duration);
//       setVideoDetails({
//         videoDetails: {
//           ...video,
//           duration: durationInSeconds
//         }
//       });

//       setClippingWindow((prev) => ({
//         ...prev,
//         endTime: formatSecondsToHHMMSS(durationInSeconds),
//       }));


//       setError("");
//     } catch (err) {
//       setError("Failed to fetch video details");
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     if (!youtubeVideoURL) {
//       setVideoId("");
//       setError("");
//       setShowDetails(false);
//       return;
//     }

//     const extractVideoId = (input: string): string | null => {
//       if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
//       const regex =
//         /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//       const match = input.match(regex);
//       return match ? match[1] : null;
//     };

//     const id = extractVideoId(youtubeVideoURL);
//     if (id) {
//       setVideoId(id);
//       setError("");
//     } else {
//       setVideoId("");
//       setError("❌ Invalid YouTube URL or Video ID");
//     }
//   }, [youtubeVideoURL]);

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl border border-white rounded-xl p-4 space-y-6">
//         {!showDetails ? (
//           <div className="flex flex-col items-center space-y-4">
//             <Input setterFunction={setYoutubeVideoURL} />
//             {error && <div className="text-red-500 text-sm">{error}</div>}
//             <Button
//               onClick={() => {
//                 fetchVideoDetails();
//                 setShowDetails(true);
//               }}
//               disabled={!videoId || loading}
//             >
//               {loading ? "Fetching..." : "Fetch video details"}
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold">Video Preview</h2>
//             <iframe
//               className="w-full h-96 rounded-md"
//               src={`https://www.youtube.com/embed/${videoId}`}
//               title="YouTube video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//             {videoDetails?.videoDetails?.duration && (
//               <div className="p-4 bg-white/10 rounded-lg flex flex-col md:flex-row md:items-end gap-6">
//                 <div className="flex flex-col flex-1">
//                   <label htmlFor="start-time" className="text-sm text-gray-300 mb-1 font-medium">
//                     🎬 Start Time
//                   </label>
//                   <input
//                     type="time"
//                     step="1"
//                     id="start-time"
//                     name="start-time"
//                     className="bg-white text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                     min="00:00:00"
//                     max={formatSecondsToHHMMSS(videoDetails.videoDetails.duration)}
//                     required
//                     defaultValue="00:00:00"
//                     onChange={(e) =>
//                       setClippingWindow((prev) => ({
//                         ...prev,
//                         startTime: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>

//                 <div className="flex flex-col flex-1">
//                   <label htmlFor="end-time" className="text-sm text-gray-300 mb-1 font-medium">
//                     🛑 End Time
//                   </label>
//                   <input
//                     type="time"
//                     step="1"
//                     id="end-time"
//                     name="end-time"
//                     className="bg-white text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                     min="00:00:00"
//                     max={formatSecondsToHHMMSS(videoDetails.videoDetails.duration)}
//                     defaultValue={formatSecondsToHHMMSS(videoDetails.videoDetails.duration)}
//                     onChange={(e) =>
//                       setClippingWindow((prev) => ({
//                         ...prev,
//                         endTime: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//             )}

//             <button
//               className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
//               onClick={() => setShowDetails(false)}
//             >
//               ⬅️ Go Back
//             </button>
//             <button
//               className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
//               onClick={() => handleDownloadLogic({...clippingWindow,videoId})}
//             >
//               Download
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




export default function Home() {
  return (
    // <main className="relative min-h-screen overflow-hidden">
    //   <BackgroundEffect />
    //   <div className="relative z-10">
    //     <Navbar />
    //     <div className="container mx-auto px-4 py-8">
    <HeroSection />
    //     </div>
    //   </div>
    // </main>
  );
}
