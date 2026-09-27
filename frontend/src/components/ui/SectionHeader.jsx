import { motion } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  // Opt-in size for the <h2>. "default" is the original
  // (text-3xl / md:text-4xl / lg:text-5xl = 30 / 36 / 48 px).
  // "lg" is a moderate, balanced step that targets ~32-40 px on
  // desktop (text-2xl / md:text-3xl / lg:text-4xl = 24 / 30 / 36 px).
  titleSize = "default",
  // Optional extra classes appended to the eyebrow <span>. Useful for
  // per-section color overrides (e.g. forcing the orange brand color)
  // without changing the global `.sms-eyebrow` rule.
  eyebrowClassName = "",
}) {
  const isCenter = align === "center";
  const titleClass =
    titleSize === "lg"
      ? "text-2xl md:text-3xl lg:text-4xl"
      : "text-3xl md:text-4xl lg:text-5xl";
  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : ""} max-w-3xl ${light ? "text-white" : "text-charcoal-900"}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`sms-eyebrow ${eyebrowClassName}`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`mt-3 font-display ${titleClass} font-bold leading-tight ${light ? "text-white" : "text-charcoal-900"}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-white/80" : "text-charcoal-500"} ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
