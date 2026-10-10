import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Lightweight image/video/text carousel.
// items: [{ type: "image", src, alt } | { type: "video", src, poster, alt }
//         | { type: "text", title, eyebrow?, text?, points?, src? }]
export default function MediaSlider({
  items = [],
  interval = 10000,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  showCountdown = false,
  frameClass = "aspect-[4/3] sm:aspect-video",
  contentDir,
}) {
  const seconds = Math.max(1, Math.round(interval / 1000));
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const touchStartX = useRef(null);
  const videoRefs = useRef([]);
  const count = items.length;

  const goTo = useCallback(
    (i) => {
      if (!count) return;
      setIndex(((i % count) + count) % count);
      setCycle((c) => c + 1);
    },
    [count]
  );

  // Pause any video that is no longer on screen.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index && !v.paused) v.pause();
    });
    setVideoPlaying(false);
  }, [index]);

  // The active dot's fill animation is the countdown; the slide advances when it ends.
  const paused = hovered || videoPlaying;
  const advance = () => setIndex((i) => (i + 1) % count);

  // Numeric countdown shown beside the dots; display only, the animation drives advancing.
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => { setRemaining(seconds); }, [index, cycle, seconds]);
  useEffect(() => {
    if (!showCountdown || paused || count < 2) return;
    const id = setInterval(() => setRemaining((r) => Math.max(1, r - 1)), 1000);
    return () => clearInterval(id);
  }, [showCountdown, paused, count, index, cycle]);

  if (!count) return null;

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1), true);
  };

  return (
    <div
      className="mx-auto w-full max-w-[96rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => { if (e.target.matches?.(":focus-visible")) setHovered(true); }}
      onBlur={() => setHovered(false)}
    >
      <div
        dir="ltr"
        className={`relative overflow-hidden rounded-2xl shadow-sms-soft bg-charcoal-900 ${frameClass}`}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={item.src || item.title || i} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
              {item.type === "text" ? (
                <div className={`grid h-full w-full bg-white ${item.src ? "sm:grid-cols-[2fr_3fr]" : ""}`}>
                  {item.src && (
                    <img src={item.src} alt={item.title || ""} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="hidden sm:block h-full w-full object-cover" />
                  )}
                  <div dir={contentDir} className="flex flex-col justify-center px-14 py-8 sm:px-16">
                    {item.eyebrow && <div className="sms-eyebrow">{item.eyebrow}</div>}
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight text-charcoal-900">{item.title}</h3>
                    {item.text && <p className="mt-3 max-w-3xl text-sm sm:text-base text-charcoal-600 leading-relaxed">{item.text}</p>}
                    {item.points?.length > 0 && (
                      <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl text-sm text-charcoal-700">
                        {item.points.map((p) => (
                          <li key={p} className="flex gap-2"><span className="text-smsorange-500">›</span>{p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : item.type === "video" ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={() => setVideoPlaying(false)}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label={prevLabel}
              onClick={() => goTo(index - 1, true)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-smsorange-500 text-white grid place-items-center shadow-sms-soft hover:bg-smsorange-600 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => goTo(index + 1, true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-smsorange-500 text-white grid place-items-center shadow-sms-soft hover:bg-smsorange-600 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div dir="ltr" className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src || item.title || i}
              type="button"
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i, true)}
              className={`relative h-2.5 overflow-hidden rounded-full bg-charcoal-300 transition-all ${
                i === index ? "w-10" : "w-2.5 hover:bg-charcoal-400"
              }`}
            >
              {i === index && (
                <span
                  key={`${index}-${cycle}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-smsorange-500"
                  style={{
                    animation: `sms-dot-progress ${seconds}s linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                  onAnimationEnd={advance}
                />
              )}
            </button>
          ))}
          {showCountdown && (
            <span aria-live="off" className="ml-2 min-w-[2.5rem] rounded-full bg-smsorange-50 px-2 py-0.5 text-center text-xs font-semibold tabular-nums text-smsorange-600">
              {remaining}s
            </span>
          )}
        </div>
      )}
      {items[index]?.caption && (
        <p className="mt-3 text-center font-display text-base font-semibold text-charcoal-800">{items[index].caption}</p>
      )}
    </div>
  );
}
