import Utils from "src/shared/utils/utils";
import React from "react";
import { motion, MotionProps } from "framer-motion";

type ContentBoxProps = {
  className?: string;
} & MotionProps

export default function ContentBox({ className, ...rest }: ContentBoxProps) {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={Utils.cn(
        "col-span-4 rounded-lg",
        className
      )}
      {...rest}
    />
  );
};
