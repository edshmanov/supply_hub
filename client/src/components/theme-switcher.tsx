import { Check } from "lucide-react";
import { useTheme, themeConfigs, accentColors } from "@/providers/theme-provider";

export function ThemeSwitcherContent() {
  const { theme, accent, setTheme, setAccent, currentConfig } = useTheme();

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Base Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {themeConfigs.map((config) => (
            <button
              key={config.id}
              data-testid={`button-theme-${config.id}`}
              onClick={() => setTheme(config.id)}
              className={`relative p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                theme === config.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {theme === config.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="font-medium text-sm">{config.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {config.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Accent Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {currentConfig.accents.map((accentId) => {
            const accentInfo = accentColors[accentId];
            return (
              <button
                key={accentId}
                data-testid={`button-accent-${accentId}`}
                onClick={() => setAccent(accentId)}
                className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all hover-elevate ${
                  accent === accentId
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border border-border/50"
                  style={{ backgroundColor: accentInfo.color }}
                />
                <span className="text-xs mt-2 text-muted-foreground">
                  {accentInfo.name}
                </span>
                {accent === accentId && (
                  <div className="absolute top-1 right-1">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Theme preferences are saved automatically.
        </p>
      </div>
    </div>
  );
}
