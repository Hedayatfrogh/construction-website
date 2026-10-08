import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Lightweight image/video carousel.
// items: [{ type: "image", src, alt } | { type: "video", src, poster, alt }]
export default function MediaSlider({
  items = [],
  interval = 10000,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
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
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        dir="ltr"
        className="relative overflow-hidden rounded-2xl shadow-sms-soft bg-charcoal-900 aspect-[4/3] sm:aspect-video"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={item.src} className="h-full w-full shrink-0" aria-hidden={i !== index}>
              {item.type === "video" ? (
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
        <div dir="ltr" className="mt-5 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src}
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
        </div>
      )}
    </div>
  );
}
