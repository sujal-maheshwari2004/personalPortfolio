import { motion, useReducedMotion } from "motion/react";

/**
 * Scroll-reveal wrapper. Fades + lifts children into view once.
 * Honors prefers-reduced-motion (renders static, no transform).
 */
export default function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its <Reveal>/motion children. */
export function RevealGroup({
  as = "div",
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Child item for use inside <RevealGroup>. */
export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
