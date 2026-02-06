import { useLocation } from "wouter";
import { Menu, Wrench, Car, Package, Building2, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme, themeConfigs, accentColors } from "@/providers/theme-provider";

interface DepartmentCardProps {
  name: string;
  icon: typeof Wrench;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function DepartmentCard({ name, icon: Icon, description, isActive, onClick }: DepartmentCardProps) {
  return (
    <button
      data-testid={`button-department-${name.toLowerCase().replace(/\s/g, "-")}`}
      onClick={onClick}
      disabled={!isActive}
      className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all min-h-[200px] ${isActive
        ? "border-primary bg-card hover-elevate active-elevate-2 cursor-pointer"
        : "border-border bg-muted/30 cursor-not-allowed opacity-60"
        }`}
    >
      {!isActive && (
        <Badge
          className="absolute top-3 right-3 bg-muted text-muted-foreground"
          data-testid={`badge-coming-soon-${name.toLowerCase().replace(/\s/g, "-")}`}
        >
          Coming Soon
        </Badge>
      )}
      <div className={`p-4 rounded-xl mb-4 ${isActive ? "bg-primary/20" : "bg-muted"}`}>
        <Icon className={`w-12 h-12 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </button>
  );
}

function ThemeSettings() {
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
              className={`relative p-4 rounded-lg border-2 text-left transition-all hover-elevate ${theme === config.id
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
                className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all hover-elevate ${accent === accentId
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

import { SemiTruckIcon } from "@/components/icons/semi-truck";

function MainMenu() {
  const [, setLocation] = useLocation();

  const departments = [
    {
      name: "Body Shop",
      icon: SemiTruckIcon,
      description: "Paints, primers, and body repair supplies",
      isActive: true,
      path: "/body-shop",
    },
    {
      name: "Mechanics",
      icon: Wrench,
      description: "Tools and parts for mechanics",
      isActive: false,
      path: "/mechanics",
    },
    {
      name: "Assembly",
      icon: Package,
      description: "Assembly line materials",
      isActive: false,
      path: "/assembly",
    },
    {
      name: "Office",
      icon: Building2,
      description: "Office supplies and stationery",
      isActive: false,
      path: "/office",
    },
  ];

  const handleDepartmentClick = (dept: typeof departments[0]) => {
    if (dept.isActive) {
      setLocation(dept.path);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="main-menu">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Built Right Company</h1>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                data-testid="button-menu"
                variant="ghost"
                size="icon"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </SheetTitle>
              </SheetHeader>
              <ThemeSettings />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-muted-foreground">
            Select Department
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.name}
              {...dept}
              onClick={() => handleDepartmentClick(dept)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Inventory Management System v1.0
          </p>
        </div>
      </main>
    </div>
  );
}
