;
import { useEffect, useRef, useState } from "react";
import Utils from "src/shared/utils/utils";

type CursorValues = {
  cursorRef: React.RefObject<HTMLDivElement>;
  visible: boolean;
};

export const useAnimationCursor = (speed: number): CursorValues => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    function setMousePosition(event: MouseEvent) {
      if (positionRef.current && cursorRef.current) {
        if (!visible) setVisibility(true);

        const { clientX, clientY } = event;

        const mouseX = clientX;
        const mouseY = clientY;
        positionRef.current.mouseX = mouseX - cursorRef.current.clientWidth / 2;
        positionRef.current.mouseY =
          mouseY - cursorRef.current.clientHeight / 2;
      }
    }
    document.addEventListener("mousemove", setMousePosition);

    return () => {
      document.removeEventListener("mousemove", setMousePosition);
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = Utils.lerp(0, mouseX, 0.2);
        positionRef.current.destinationY = Utils.lerp(0, mouseY, 0.2);
      } else {
        positionRef.current.distanceX = Utils.lerp(destinationX, mouseX, 0.2);
        positionRef.current.distanceY = Utils.lerp(destinationY, mouseY, 0.2);
        if (
          Math.abs(positionRef.current.distanceX) +
          Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX = distanceX;
          positionRef.current.destinationY = distanceY;
        }
      }
      if (cursorRef && cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, [speed]);

  return { cursorRef, visible };
};