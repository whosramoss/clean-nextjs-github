import { AnimationProps, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  animateRef: (node?: Element | null | undefined) => void;
  animate: AnimationProps["animate"];
  initial: string;
  variants: any;
};

export const useAnimationFadeIn = (
  threshold = 0,
  firstState = "visible",
  secondState = "hidden",
): Props => {
  const animate = useAnimation();

  const { ref: animateRef, inView } = useInView({
    threshold: threshold ?? 0,
    triggerOnce: true,
  });

  useEffect(() => {
    animate.start(inView ? firstState : secondState);
  }, [animate, inView]);

  const variants = {
    hidden: { opacity: 0, y: `4em` },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        delay: 0.8,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return { animateRef, animate, initial: secondState, variants };
};
