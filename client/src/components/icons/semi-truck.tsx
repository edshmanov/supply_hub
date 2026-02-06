import { LucideProps } from "lucide-react";

export function SemiTruckIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            {...props}
        >
            {/* Front Grille area - Maximized size */}
            <path d="M4 2h16c1.1 0 2 .9 2 2v9h-2V6H4v7H2V4c0-1.1.9-2 2-2z" /> {/* Top/Sides of Cab */}
            <rect x="6" y="8" width="12" height="10" rx="1" /> {/* Main Grille */}
            <path d="M7 10h10v1H7zM7 12h10v1H7zM7 14h10v1H7zM7 16h10v1H7z" fill="var(--background)" />

            {/* Bumper */}
            <path d="M2 18h20v4H2z" />

            {/* Lights */}
            <circle cx="4" cy="16" r="2" />
            <circle cx="20" cy="16" r="2" />

            {/* Mirrors */}
            <rect x="0" y="6" width="2" height="6" rx="0.5" />
            <rect x="22" y="6" width="2" height="6" rx="0.5" />

            {/* Roof Lights */}
            <circle cx="8" cy="4" r="1" fill="var(--background)" />
            <circle cx="12" cy="4" r="1" fill="var(--background)" />
            <circle cx="16" cy="4" r="1" fill="var(--background)" />
        </svg>
    );
}
