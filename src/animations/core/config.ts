export const DURATION = {
  INSTANT: 0.1,
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
  DEBUG: 2.0, 
} as const;

export const EASING = {
  DEFAULT: "power2.out",
  SMOOTH: "power3.out",
  BOUNCE: "back.out(1.7)",
  SHARP: "power2.inOut",
  LINEAR: "none",
} as const;

export const ANIMATION_CONFIG = {
  reducedMotion: false,
};
