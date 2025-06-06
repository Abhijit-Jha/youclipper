import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react"
import { Loader } from 'lucide-react';

const ContinueWithGoogleModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-[95%] max-w-lg bg-background rounded-xl shadow-2xl p-10 text-center min-h-[26rem] flex items-center"
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-foreground transition"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex justify-center items-center h-full">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Welcome</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to continue and clip the moments that matter.
              <br />
              (Or just click because it's Google and you always do 😏)
            </p>
            <button
              onClick={() => {
                setIsLoading(true);
                signIn("google",{callbackUrl : '/clip'});
              }}
              disabled={isLoading}
              className={`w-full relative flex items-center justify-center gap-3 px-6 py-3 
                          bg-primary text-primary-foreground font-medium rounded-md transition 
                        ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/80'}`}
            >
              {/* Loader on top */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader className="h-5 w-5 animate-spin text-white" />
                </div>
              )}

              {/* Button Content under the loader */}
              <div className={`${isLoading ? 'opacity-60' : 'visible'} flex items-center gap-3`}>
                <FcGoogle className="h-6 w-6" />
                Continue with Google
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueWithGoogleModal;
