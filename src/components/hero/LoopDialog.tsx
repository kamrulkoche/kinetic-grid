"use client";

import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "../ui/Dialog";
import { HeroScene } from "./HeroScene";

const LOOP_SECONDS = 9;

/** "Watch the Loop": plays the hero sequence on a timer instead of scroll. */
export function LoopDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const progress = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [playing, setPlaying] = useState(true);
  const bar = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!open) return;
    progress.set(0);
    controls.current = animate(progress, [0, 1], {
      duration: LOOP_SECONDS,
      ease: [0.45, 0, 0.55, 1],
      repeat: Infinity,
      repeatDelay: 0.6,
    });
    return () => controls.current?.stop();
  }, [open, progress]);

  const toggle = useCallback(() => {
    const c = controls.current;
    if (!c) return;
    if (playing) c.pause();
    else c.play();
    setPlaying(!playing);
  }, [playing]);

  const close = useCallback(() => {
    setPlaying(true); // next open starts playing
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={close} label="The Kinetic Grid loop" className="max-w-5xl">
      <div className="relative aspect-[4/5] w-full sm:aspect-video">
        <HeroScene progress={progress} sizes="(min-width: 1024px) 1024px, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/30" />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-4 sm:p-6">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause loop" : "Play loop"}
            className="btn-amber grid size-11 shrink-0 place-items-center rounded-full"
          >
            {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Motion / Voltage / Possibility</p>
            <div className="mt-2 h-px w-full bg-white/20">
              <motion.div className="h-full origin-left bg-amber-400" style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
