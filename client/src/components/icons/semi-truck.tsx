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
            <path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
            {/* Windshield */}
            <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
            {/* Grille */}
            <path d="M8 14h8V19H8z" />
            <path d="M8 16h8" />
            <path d="M8 18h8" />
            {/* Headlights */}
            <circle cx="6" cy="16" r="1.5" />
            <circle cx="18" cy="16" r="1.5" />
            {/* Roof Lights */}
            <path d="M7 4h1" />
            <path d="M11 4h2" />
            <path d="M16 4h1" />
            {/* Mirrors */}
            <path d="M2 8v4" />
            <path d="M22 8v4" />
        </svg>
    );
}
