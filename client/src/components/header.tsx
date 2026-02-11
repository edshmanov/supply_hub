import { Package, Lock, ArrowLeft, Trash2, Menu, Palette, Info, HelpCircle, Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcherContent } from "./theme-switcher";
import { CartDrawer } from "./cart-drawer";
import { TruckListDrawer } from "./truck-list-drawer";
import { useLanguage } from "@/providers/language-provider";

interface HeaderProps {
  title: string;
  showManagerLink?: boolean;
  showBackLink?: boolean;
  showCart?: boolean;
  showTruckList?: boolean;
  requestCount?: number;
  onManagerClick?: () => void;
  onBackClick?: () => void;
  onClearAll?: () => void;
  isClearingAll?: boolean;
}

export function Header({
  title,
  showManagerLink,
  showBackLink,
  showCart,
  showTruckList,
  requestCount = 0,
  onManagerClick,
  onBackClick,
  onClearAll,
  isClearingAll
}: HeaderProps) {
  const { language, setLanguage, t, languageNames, languages } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2 relative">
        {/* Left Side: Back, Logo, Title */}
        <div className="flex items-center gap-2 pr-20">
          {showBackLink && onBackClick && (
            <Button
              data-testid="button-back"
              variant="ghost"
              size="icon"
              onClick={onBackClick}
              className="mr-0 shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="p-1.5 rounded-lg bg-primary/20 shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg md:text-2xl font-bold tracking-tight truncate">{title}</h1>
          {requestCount > 0 && !showCart && (
            <Badge
              data-testid="badge-request-count"
              className="bg-destructive text-destructive-foreground ml-2 px-2 py-0.5 text-xs font-bold"
            >
              {requestCount}
            </Badge>
          )}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1">
          {showTruckList && (
            <div className="mr-14 md:mr-0"> {/* Spacing for mobile absolute cart */}
              <TruckListDrawer />
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                data-testid="button-menu"
                variant="ghost"
                size="icon"
                className="mr-16 md:mr-0" // Push menu left on mobile to avoid overlap
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            Developed by Ed Shmanov.. */
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t.settings}
                </SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t.language}
                  </h3>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang}
                        variant={language === lang ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLanguage(lang)}
                        className="flex-1 font-semibold"
                        data-testid={`button-lang-${lang}`}
                      >
                        {lang.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {t.appearance}
                  </h3>
                  <ThemeSwitcherContent />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {t.information}
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        <strong>Built Right Company</strong><br />
                        {t.version}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        {t.helpText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cart Drawer - Absolute Positioned on Mobile to prevent squishing */}
          {showCart && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:static md:transform-none">
              <CartDrawer triggerClassName="relative" />
            </div>
          )}

          {onClearAll && requestCount > 0 && (
            <Button
              data-testid="button-clear-all"
              variant="destructive"
              onClick={onClearAll}
              disabled={isClearingAll}
              className="px-4 hidden md:flex" // Hide on mobile if crowded
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isClearingAll ? "Clearing..." : "Clear All"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
