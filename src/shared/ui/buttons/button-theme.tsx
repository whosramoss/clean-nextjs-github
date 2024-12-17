"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useAnimationFadeIn } from "src/shared/hooks/useAnimationFadeIn";
import Utils from "src/shared/utils/utils";

export enum ThemeEnum {
  light = "light",
  dark = "dark",
  system = "system",
}

interface ButtonThemeProps {
  className?: string
}

export default function ButtonTheme({ className }: ButtonThemeProps) {
  const { theme, setTheme } = useTheme();
  const { animateRef, animate, initial, variants } = useAnimationFadeIn(0.1);

  const style = {
    default: `h-10 w-20 content-center rounded-lg justify-items-center cursor-pointer `,
    light: `bg-primary dark:bg-transparent text-third`,
    dark: `dark:bg-primary bg-transparent text-third`,
  };

  function handleTheme(e: any) {
    e.preventDefault();
    if (theme === ThemeEnum.system) {
      setTheme(ThemeEnum.light);
    } else {
      setTheme(theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light);
    }
  }

  return (
    <motion.div
      // ref={animateRef}
      // initial={initial}
      // animate={animate}
      // variants={variants}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      className={Utils.cn("flex w-20 gap-[4px] rounded-lg bg-[#696c7157] px-1 py-1 backdrop-blur-3xl", className)}
    >
      <div onClick={handleTheme} className={`${style.default} ${style.light}`}>
        <FiSun />
      </div>
      <div onClick={handleTheme} className={`${style.default} ${style.dark}`}>
        <FiMoon />
      </div>
    </motion.div>
  );
}
