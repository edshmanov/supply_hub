import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocation } from "wouter";

interface ModeContextType {
    isTakeMode: boolean;
    toggleMode: () => void;
    setTakeMode: (value: boolean) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
    const [isTakeMode, setIsTakeMode] = useState(false);
    const [location] = useLocation();

    // Mode should reset when changing pages usually, but maybe persistent for session?
    // Let's keep it persistent.

    const toggleMode = () => setIsTakeMode((prev) => !prev);
    const setTakeMode = (value: boolean) => setIsTakeMode(value);

    return (
        <ModeContext.Provider value={{ isTakeMode, toggleMode, setTakeMode }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    const context = useContext(ModeContext);
    if (context === undefined) {
        throw new Error("useMode must be used within a ModeProvider");
    }
    return context;
}
