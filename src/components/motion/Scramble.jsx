import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/<>*·";

/**
 * Terminal-style decode: scrambles random glyphs that resolve left-to-right
 * into the final text once in view. Renders the final text immediately under
 * reduced motion. Best with a monospace font (fixed-width = no layout shift).
 */
export default function Scramble({ text, className, speed = 28, revealEvery = 1 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    if (!inView) return;

    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / revealEvery);
      let s = "";
      for (let i = 0; i < text.length; i += 1) {
        if (i < revealed || text[i] === " ") s += text[i];
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (revealed >= text.length) {
        clearInterval(id);
        setOut(text);
      }
    }, speed);

    return () => clearInterval(id);
  }, [inView, reduce, text, speed, revealEvery]);

  return (
    <span ref={ref} className={className}>
      {out || " "}
    </span>
  );
}
