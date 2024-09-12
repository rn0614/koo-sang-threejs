import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    let lastScollY = window.scrollY;

    const updateScrollDirection = () => {
      const curScrollY = window.scrollY;
      const direction = curScrollY > lastScollY ? "down" : "up";
      if (
        (direction !== scrollDirection && curScrollY - lastScollY > 10) ||
        curScrollY - lastScollY < -10
      ) {
        setScrollDirection(direction);
      }
      lastScollY = curScrollY > 0 ? curScrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}
