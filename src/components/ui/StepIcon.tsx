import { BatteryCharging, UtilityPole, Zap } from "lucide-react";
import type { StepIcon as Kind } from "@/lib/content";

const MAP = { zap: Zap, battery: BatteryCharging, pylon: UtilityPole } as const;

export function StepIcon({ kind, className = "" }: { kind: Kind; className?: string }) {
  const Icon = MAP[kind];
  return (
    <Icon
      aria-hidden
      strokeWidth={1.75}
      className={`text-amber-400 drop-shadow-[0_0_10px_rgba(255,178,30,0.75)] ${className}`}
    />
  );
}
