"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypewriterEffect = () => {
  const [text, setText] = useState("");
  const fullText = "Snip. Share. Shine.";
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % 1);
        return;
      }

      const timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    }

    if (text === fullText) {
      setIsWaiting(true);
      return;
    }

    const timeout = setTimeout(() => {
      setText(fullText.slice(0, text.length + 1));
    }, text.length === 0 ? 500 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isWaiting, fullText, index]);

  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="text-2xl md:text-4xl font-handwritten"
    >
      <span className="typewriter-container">
        <span className="typewriter-text font-handwritten text-primary">
          {text}
        </span>
      </span>
    </motion.h2>
  );
};