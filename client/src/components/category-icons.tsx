import type { FC } from "react";

interface IconProps {
  className?: string;
}

export function BlockPaperIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M8 20H40" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 28H40" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="26" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="26" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="32" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="32" r="1.5" fill="currentColor"/>
      <circle cx="26" cy="32" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function ScuffRollIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="24" rx="8" ry="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="16" cy="24" rx="3" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M16 10C28 10 38 14 38 24C38 34 28 38 16 38" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M38 24L42 20M38 24L42 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DAPaperIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="36" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="16" r="1" fill="currentColor"/>
      <circle cx="32" cy="16" r="1" fill="currentColor"/>
      <circle cx="16" cy="32" r="1" fill="currentColor"/>
      <circle cx="32" cy="32" r="1" fill="currentColor"/>
    </svg>
  );
}

export function PrimerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="20" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="6" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M22 6V4C22 3 22.5 2 24 2C25.5 2 26 3 26 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="17" y="22" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M19 26H29" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

export function FillerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="36" rx="14" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M10 36V20C10 14 16 10 24 10C32 10 38 14 38 20V36" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="24" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M16 20C16 18 19 16 24 16C29 16 32 18 32 20" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function GlazeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 40L10 16H38L34 40H14Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="8" y="10" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 24C18 22 20 20 24 20C28 20 30 22 30 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 32H32" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function WaxGreaseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M20 18V12C20 10 21 8 24 8C27 8 28 10 28 12V18" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M18 26L22 30L30 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LacquerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="20" y="6" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="10" r="2" fill="currentColor"/>
      <path d="M18 22H30" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 28H30" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 34H26" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function TapeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M38 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 18L44 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PlasticSheetIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10H32L40 18V38H8V10Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M32 10V18H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 22H34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M14 28H34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M14 34H26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

export function SprayCanIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="18" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="8" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M24 6V8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
    </svg>
  );
}

export function PartsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24C8 16 12 8 24 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 8C36 8 40 16 40 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="6" y="22" width="36" height="18" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="14" cy="40" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="34" cy="40" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 28H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 28H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GlovesIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 42V26L12 20V12C12 10 13 8 15 8C17 8 18 10 18 12V22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M18 22V8C18 6 19 4 21 4C23 4 24 6 24 8V22" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M24 22V6C24 4 25 2 27 2C29 2 30 4 30 6V22" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M30 22V10C30 8 31 6 33 6C35 6 36 8 36 10V26L32 42H16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M16 34H32" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function WishlistIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 42L10 28C6 24 6 18 10 14C14 10 20 10 24 14C28 10 34 10 38 14C42 18 42 24 38 28L24 42Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <path d="M20 22L24 26L32 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PaintSuiteIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="16" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="22" y="20" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="14" y="6" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="18" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function HardenerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="16" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="20" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 26H28" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 22V30" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export function AcceleratorIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6L28 18H36L30 26L34 42L24 32L14 42L18 26L12 18H20L24 6Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

export function CupsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12L16 40H32L36 12H12Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M10 12H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 20H30" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function BuffingIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M24 6V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function ClearcoatIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 24C18 22 20 20 24 20C28 20 30 22 30 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 32H30" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function SprayBottleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="18" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M22 18V12H26V18" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M26 8H32L36 12L32 16H26V8Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M36 12H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 10L40 12L38 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PaintRoomIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="32" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M8 24H40" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="24" cy="20" r="2" fill="currentColor"/>
      <circle cx="32" cy="20" r="2" fill="currentColor"/>
      <path d="M16 6L24 16L32 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TackRagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14C14 10 22 12 26 16C30 20 32 28 28 34C24 40 14 40 10 34C6 28 6 18 10 14Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M28 34L38 28L42 32L34 42L28 34Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M16 22C18 20 22 22 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ReducersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 26H30" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 34H30" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function FillerMixingIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="36" rx="12" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M12 36V24C12 18 17 14 24 14C31 14 36 18 36 24V36" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M20 6L24 14L28 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 26L24 30L30 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MaskingIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M8 18H40" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 26H40" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 34H40" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 10V38" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 10V38" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function TouchUpCupsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 16L18 40H30L34 16H14Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="24" cy="16" rx="10" ry="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M34 24H40C42 24 44 26 44 28V32C44 34 42 36 40 36H34" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function PrimerGunIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20H28L32 16H42V24H32L28 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 20V32L22 36H26L30 32V20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="24" cy="10" rx="6" ry="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M24 14V16" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export function EvercoatIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="38" rx="14" ry="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M10 38V18C10 12 16 8 24 8C32 8 38 12 38 18V38" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="24" cy="18" rx="14" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M18 28H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GlueIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="20" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M20 20V14L24 10L28 14V20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <circle cx="24" cy="6" r="2" fill="currentColor"/>
      <path d="M20 30H28" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 36H28" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function PaintMasksIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20C12 14 17 10 24 10C31 10 36 14 36 20V30C36 36 31 40 24 40C17 40 12 36 12 30V20Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="18" cy="22" rx="3" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="30" cy="22" rx="3" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M20 32C22 34 26 34 28 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 24H12M36 24H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function AirToolsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="24" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M30 22H40L44 26L40 30H30" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M18 14V18M24 14V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function AirAccessoriesIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M24 8V14M24 34V40M8 24H14M34 24H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 16L12 12M32 32L36 36M32 16L36 12M16 32L12 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function OtherToolsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 38L20 28L24 32L14 42L10 38Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M20 28L28 20C30 18 32 18 34 20L28 14C30 12 32 12 34 14L40 20C42 22 42 26 40 28L32 36L24 32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function DAPadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="26" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="26" r="3" fill="currentColor"/>
      <path d="M24 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="4" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function BlackPaperIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="14" y="12" width="20" height="24" fill="currentColor" opacity="0.3"/>
      <path d="M18 20H30" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 26H30" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 32H26" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 28V14C4 12 5 10 8 10H28V28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <path d="M28 16H36L44 24V28H28V16Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <path d="M4 28H44V32C44 34 43 36 40 36H8C5 36 4 34 4 32V28Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="14" cy="36" r="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M18 36H32" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export const categoryIconMap: Record<string, FC<IconProps>> = {
  "block-paper": BlockPaperIcon,
  "scuff-roll": ScuffRollIcon,
  "da-paper": DAPaperIcon,
  "primer": PrimerIcon,
  "filler": FillerIcon,
  "glaze": GlazeIcon,
  "wax-grease": WaxGreaseIcon,
  "lacquer": LacquerIcon,
  "tape": TapeIcon,
  "plastic-sheet": PlasticSheetIcon,
  "spray-can": SprayCanIcon,
  "parts": PartsIcon,
  "gloves": GlovesIcon,
  "wishlist": WishlistIcon,
  "paint-suite": PaintSuiteIcon,
  "hardener": HardenerIcon,
  "accelerator": AcceleratorIcon,
  "cups": CupsIcon,
  "buffing": BuffingIcon,
  "clearcoat": ClearcoatIcon,
  "spray-bottle": SprayBottleIcon,
  "paint-room": PaintRoomIcon,
  "tack-rag": TackRagIcon,
  "reducers": ReducersIcon,
  "filler-mixing": FillerMixingIcon,
  "masking": MaskingIcon,
  "touchup-cups": TouchUpCupsIcon,
  "primer-gun": PrimerGunIcon,
  "evercoat": EvercoatIcon,
  "glue": GlueIcon,
  "paint-masks": PaintMasksIcon,
  "air-tools": AirToolsIcon,
  "air-accessories": AirAccessoriesIcon,
  "other-tools": OtherToolsIcon,
  "da-pad": DAPadIcon,
  "black-paper": BlackPaperIcon,
};
