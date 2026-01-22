import { createContext, useContext, useLayoutEffect, useState } from "react";

export type BaseTheme = "dark" | "midnight" | "slate" | "light";
export type Accent = "orange" | "white" | "red" | "cyan" | "green" | "blue" | "purple" | "yellow";

export interface ThemeConfig {
  id: BaseTheme;
  name: string;
  description: string;
  accents: Accent[];
  defaultAccent: Accent;
}

export const themeConfigs: ThemeConfig[] = [
  { 
    id: "dark", 
    name: "Dark Workshop", 
    description: "Deep black base",
    accents: ["orange", "white", "red", "cyan"],
    defaultAccent: "orange"
  },
  { 
    id: "midnight", 
    name: "Midnight Blue", 
    description: "Navy blue base",
    accents: ["cyan", "white", "orange", "green"],
    defaultAccent: "cyan"
  },
  { 
    id: "slate", 
    name: "Industrial Slate", 
    description: "Charcoal gray base",
    accents: ["green", "orange", "purple", "yellow"],
    defaultAccent: "green"
  },
  { 
    id: "light", 
    name: "Workshop Light", 
    description: "Light with warm tones",
    accents: ["orange", "blue", "green", "red"],
    defaultAccent: "orange"
  },
];

export const accentColors: Record<Accent, { name: string; color: string }> = {
  orange: { name: "Orange", color: "#F59E0B" },
  white: { name: "White", color: "#FFFFFF" },
  red: { name: "Red", color: "#EF4444" },
  cyan: { name: "Cyan", color: "#06B6D4" },
  green: { name: "Green", color: "#22C55E" },
  blue: { name: "Blue", color: "#3B82F6" },
  purple: { name: "Purple", color: "#A855F7" },
  yellow: { name: "Yellow", color: "#FACC15" },
};

type ThemeContextType = {
  theme: BaseTheme;
  accent: Accent;
  setTheme: (theme: BaseTheme) => void;
  setAccent: (accent: Accent) => void;
  currentConfig: ThemeConfig;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "supply-hub-theme";
const ACCENT_STORAGE_KEY = "supply-hub-accent";

function getStoredTheme(): BaseTheme {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && themeConfigs.some(t => t.id === stored)) {
      return stored as BaseTheme;
    }
  }
  return "dark";
}

function getStoredAccent(theme: BaseTheme): Accent {
  const config = themeConfigs.find(t => t.id === theme);
  if (!config) return "orange";
  
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
    if (stored && config.accents.includes(stored as Accent)) {
      return stored as Accent;
    }
  }
  return config.defaultAccent;
}

function applyTheme(theme: BaseTheme, accent: Accent) {
  const root = document.documentElement;
  root.classList.remove("dark");
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-accent", accent);
  if (theme !== "light") {
    root.classList.add("dark");
  }
}

// Apply theme immediately on script load to prevent FOUC
if (typeof window !== "undefined") {
  const theme = getStoredTheme();
  const accent = getStoredAccent(theme);
  applyTheme(theme, accent);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<BaseTheme>(getStoredTheme);
  const [accent, setAccentState] = useState<Accent>(() => getStoredAccent(getStoredTheme()));

  const currentConfig = themeConfigs.find(t => t.id === theme) || themeConfigs[0];

  const setTheme = (newTheme: BaseTheme) => {
    const config = themeConfigs.find(t => t.id === newTheme);
    const newAccent = config?.defaultAccent || "orange";
    
    setThemeState(newTheme);
    setAccentState(newAccent);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    localStorage.setItem(ACCENT_STORAGE_KEY, newAccent);
    applyTheme(newTheme, newAccent);
  };

  const setAccent = (newAccent: Accent) => {
    if (!currentConfig.accents.includes(newAccent)) return;
    
    setAccentState(newAccent);
    localStorage.setItem(ACCENT_STORAGE_KEY, newAccent);
    applyTheme(theme, newAccent);
  };

  // Sync on mount
  useLayoutEffect(() => {
    applyTheme(theme, accent);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, currentConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
