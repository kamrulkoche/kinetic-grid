"use client";

import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

/** Focal point of the wheel in the source still. object-position and transform-origin share it so the push-in lands on the runner at any aspect ratio. */
const WHEEL_FOCUS = "69% 44%";

type Props = {
  progress: MotionValue<number>;
  reduce?: boolean;
  preload?: boolean;
  sizes?: string;
};

/**
 * Layered stills driven by a 0→1 progress value that recreate the reference's scroll-scrubbed sequence:
 * wheel at rest → camera pushes into the wheel → dissolve to an aerial city → orange energy spreads across the grid.
 */
export function HeroScene({ progress, reduce = false, preload = false, sizes = "100vw" }: Props) {
  // 1. Wheel push-in
  const wheelScale = useTransform(progress, [0, 0.42], reduce ? [1, 1] : [1, 2.5]);
  const wheelBlur = useTransform(progress, [0.22, 0.42], reduce ? [0, 0] : [0, 7]);
  const wheelFilter = useMotionTemplate`blur(${wheelBlur}px)`;
  const wheelOpacity = useTransform(progress, [0.34, 0.5], [1, 0]);

  // 2. City arrival + settle
  const cityOpacity = useTransform(progress, [0.3, 0.48], [0, 1]);
  const cityScale = useTransform(progress, [0.3, 0.5, 1], reduce ? [1, 1, 1] : [1.55, 1.14, 1]);
  const cityRotate = useTransform(progress, [0.3, 0.55], reduce ? [0, 0] : [-7, 0]);
  const cityBlur = useTransform(progress, [0.3, 0.5], reduce ? [0, 0] : [10, 0]);
  const cityFilter = useMotionTemplate`blur(${cityBlur}px)`;

  // 3. Energy spread: a radial mask grows from the city core, revealing the lit layer over the dim blue base.
  const spread = useTransform(progress, [0.44, 0.92], [0, 135]);
  const mask = useMotionTemplate`radial-gradient(circle at 47% 42%, #000 ${spread}%, transparent calc(${spread}% + 22%))`;

  // 4. Transition bloom: warm flash as the camera passes through the wheel
  const bloom = useTransform(progress, [0.28, 0.4, 0.52], [0, 0.85, 0]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink-950">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: wheelScale, opacity: wheelOpacity, filter: wheelFilter, transformOrigin: WHEEL_FOCUS }}
      >
        <Image
          src="/images/hero-wheel.jpg"
          alt=""
          fill
          preload={preload}
          sizes={sizes}
          quality={80}
          className="object-cover"
          style={{ objectPosition: WHEEL_FOCUS }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ opacity: cityOpacity, scale: cityScale, rotate: cityRotate, filter: cityFilter }}
      >
        {/* Dim, blue-graded base */}
        <Image
          src="/images/hero-city.jpg"
          alt=""
          fill
          sizes={sizes}
          quality={80}
          className="object-cover [filter:saturate(0.15)_brightness(0.5)_contrast(1.1)]"
        />
        <div className="absolute inset-0 bg-[#0a2a63] mix-blend-color opacity-80" />
        {/* Lit layer revealed by the spreading mask */}
        <motion.div
          className="absolute inset-0"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <Image
            src="/images/hero-city.jpg"
            alt=""
            fill
            sizes={sizes}
            quality={80}
            className="object-cover [filter:saturate(1.25)_brightness(1.1)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(255,150,40,0.9),rgba(255,90,10,0.35)_35%,transparent_70%)] mix-blend-screen"
        style={{ opacity: bloom }}
      />
    </div>
  );
}
