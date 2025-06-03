"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserProfileProps {
  imageUrl: string;
  size?: number;
  uname: string;
}

// Fix: make this a normal function that receives token
// async function getUserDetails(token: string) {
//   if (!token) return console.error("No token found");
//   console.log("Token is",token);

//   try {
//     const response = await axios.get("http://localhost:3001/api/video/test", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("HEY",response.data);
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//   }
// }

const UserProfile: React.FC<UserProfileProps> = ({
  imageUrl,
  uname,
  size = 40,
}) => {
  const [open, isOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession(); // ✅ Correct place to use hook
  // let token = session?.accessToken;
  // console.log(token, "is from google");

  useEffect(()=>{
    token = session?.accessToken
    console.log(session?.accessToken,"heeh");
  },[session])
  return (
    <>
      <div
        className="inline-block rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ width: size, height: size }}
        aria-label={uname}
        title={uname}
        onClick={() => isOpen(!open)}
      >
        <Image
          src={imageUrl || "/default-avatar.png"}
          alt={uname}
          width={size}
          height={size}
          className="object-cover"
          unoptimized={false}
          priority={true}
        />
      </div>
      {open && (
        <div className="absolute md:right-10 right-2 top-14 mt-2 w-40 bg-background shadow-lg border border-border rounded-xl z-50">
          <div className="px-4 py-2 border-b border-border text-foreground font-semibold">
            {uname}
          </div>
          <ul className="flex flex-col">
            <li>
              <div
                className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                onClick={async () => {
                  console.log("Div clicked");
                  // if (token) await getUserDetails(token);
                }}
              >
                Support
              </div>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserProfile;
