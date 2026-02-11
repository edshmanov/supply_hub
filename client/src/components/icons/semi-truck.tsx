import { LucideProps } from "lucide-react";

export function SemiTruckIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Cab Body */}
            <path d="M4 2v14h16V2" />

            {/* Roof Fairing */}
            <path d="M4 2h16" />

            {/* Windshield */}
            <rect x="6" y="5" width="12" height="5" rx="1" />

            {/* Grille */}
            <rect x="8" y="11" width="8" height="5" />
            <path d="M8 12h8" />
            <path d="M8 14h8" />
            <path d="M8 16h8" />

            {/* Bumper */}
            <path d="M2 17h20v5H2z" fill="currentColor" opacity="0.2" /> {/* Adding some fill for weight */}
            <path d="M2 17h20v5H2z" /> {/* Outline */}

            {/* Headlights */}
            <circle cx="4" cy="15" r="1.5" />
            <circle cx="20" cy="15" r="1.5" />

            {/* Mirrors */}
            <path d="M2 5v6" />
            <path d="M22 5v6" />
        </svg>
    );
}
