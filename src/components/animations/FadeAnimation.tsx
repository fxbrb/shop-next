"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export type TextFadeProps = {
  direction: "up" | "down";
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
};

export const FadeAnimation = (props: TextFadeProps) => {
  const FADE = {
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
    hidden: { opacity: 0, y: props.direction === "down" ? -18 : 18 },
  };
  const ref = useRef(null);
  useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: props.staggerChildren,
          },
        },
      }}
      className={`space-y-4 ${props.className}`}
    >
      {React.Children.map(props.children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
};
