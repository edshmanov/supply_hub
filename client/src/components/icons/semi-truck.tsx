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
            {/* Front Cab Body - Solid Block */}
            <path d="M4 2h16a2 2 0 0 1 2 2v10H2V4a2 2 0 0 1 2-2z" />

            {/* Windshield - Negative space (background color) */}
            <path d="M5 5h14v4H5V5z" fill="var(--background)" stroke="var(--background)" strokeWidth="1" />
            <path d="M12 5v4" stroke="currentColor" strokeWidth="2" /> {/* Center pillar */}

            {/* Grille - Negative Space */}
            <path d="M7 11h10v6H7v-6z" fill="var(--background)" />
            <path d="M7 12h10" stroke="currentColor" strokeWidth="1" />
            <path d="M7 14h10" stroke="currentColor" strokeWidth="1" />
            <path d="M7 16h10" stroke="currentColor" strokeWidth="1" />

            {/* Bumper - Solid */}
            <path d="M2 18h20v4H2z" />

            {/* Lights - Negative Space Circles */}
            <circle cx="4.5" cy="16" r="1.5" fill="var(--background)" />
            <circle cx="19.5" cy="16" r="1.5" fill="var(--background)" />

            {/* Roof Lights - Negative Space */}
            <circle cx="8" cy="3.5" r="1" fill="var(--background)" />
            <circle cx="12" cy="3.5" r="1" fill="var(--background)" />
            <circle cx="16" cy="3.5" r="1" fill="var(--background)" />

            {/* Side Mirrors - Solid Ears */}
            <path d="M0 6h3v6H0z" />
            <path d="M21 6h3v6h-3z" />
        </svg>
    );
}
