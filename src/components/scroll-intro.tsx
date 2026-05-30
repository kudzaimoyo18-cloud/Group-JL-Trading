"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

type IntroDict = {
  title: string;
  subtitle: string;
  scrollHint: string;
};

/**
 * Full-screen intro that "scrubs" the video as the user scrolls.
 *
 * Desktop (fine pointer + motion allowed): a tall spacer creates scroll
 * distance; a sticky stage pins the video and we map scroll progress to
 * video.currentTime via rAF. Text + scrim fade out as you progress.
 *
 * Mobile / reduced-motion / no-JS: the same video simply autoplays muted
 * on loop at normal height — no scrubbing, still cinematic.
 */
export function ScrollIntro({ dict }: { dict: IntroDict }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrubMode, setScrubMode] = useState(false);
  const [progress, setProgress] = useState(0);

  // Decide mode after mount (avoids SSR/clientmismatch). Scrub only on
  // wide, fine-pointer devices that allow motion.
  useEffect(() => {
    if (reduce) return;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(pointer: fine)").matches;
    setScrubMode(ok);
  }, [reduce]);

  // Autoplay loop fallback when not scrubbing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || scrubMode) return;
    v.play().catch(() => {});
  }, [scrubMode]);

  // Scrub: tie video.currentTime to scroll progress through the wrapper.
  useEffect(() => {
    if (!scrubMode) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let raf = 0;
    let duration = video.duration || 0;
    const onMeta = () => (duration = video.duration || 0);
    video.addEventListener("loadedmetadata", onMeta);

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrollable > 0 ? passed / scrollable : 0;
      setProgress(p);
      if (duration > 0) {
        // leave a hair of tail so the last frame doesn't snap to poster
        const t = Math.min(p * duration, duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrubMode]);

  // Text fades out over the first ~45% of the scrub.
  const textOpacity = scrubMode ? Math.max(0, 1 - progress / 0.45) : 1;

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={scrubMode ? { height: "260vh" } : undefined}
      aria-label={dict.title}
    >
      <div
        className={
          scrubMode
            ? "sticky top-0 h-screen w-full overflow-hidden"
            : "relative h-[78vh] w-full overflow-hidden sm:h-[88vh]"
        }
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/intro-scrub.mp4"
          poster="/video/intro-poster.jpg"
          muted
          playsInline
          loop={!scrubMode}
          autoPlay={!scrubMode}
          preload="auto"
        />

        {/* legibility scrim */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.04 260 / 0.45) 0%, oklch(0.18 0.04 260 / 0.25) 40%, oklch(0.18 0.04 260 / 0.7) 100%)",
          }}
        />

        {/* overlay copy */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity, transition: scrubMode ? "none" : "opacity 0.4s" }}
        >
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            {dict.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 drop-shadow sm:text-xl">
            {dict.subtitle}
          </p>
        </div>

        {/* scroll hint */}
        <div
          className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-1 text-white/80"
          style={{ opacity: textOpacity, transition: scrubMode ? "none" : "opacity 0.4s" }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em]">
            {dict.scrollHint}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
