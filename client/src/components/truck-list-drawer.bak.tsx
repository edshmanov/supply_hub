import { useState } from "react";
import { List, Plus, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/providers/language-provider";
import { useTruckList } from "@/providers/truck-list-provider";

interface TruckListDrawerProps {
  triggerClassName?: string;
}

export function TruckListDrawer({ triggerClassName }: TruckListDrawerProps) {
  const { trucks, addTruck, removeTruck, truckCount } = useTruckList();
  const { t } = useLanguage();
  const [newTruck, setNewTruck] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddTruck = () => {
    const trimmed = newTruck.trim();
    if (trimmed) {
      addTruck(trimmed);
      setNewTruck("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTruck();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          data-testid="button-truck-list"
          variant="outline"
          size="default"
          className={`${triggerClassName} relative h-12 px-4 font-bold`}
        >
          <List className="w-5 h-5 mr-2" />
          LIST
          {truckCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-sm font-bold"
              data-testid="badge-truck-count"
            >
              {truckCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Truck className="w-6 h-6" />
            {t.activeTrucks}
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-2 py-4">
          <Input
            value={newTruck}
            onChange={(e) => setNewTruck(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.truckNumber}
            className="flex-1 h-12 text-lg"
            data-testid="input-truck-number"
          />
          <Button
            onClick={handleAddTruck}
            size="icon"
            className="h-12 w-12"
            disabled={!newTruck.trim()}
            data-testid="button-add-truck"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {truckCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Truck className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">{t.noActiveTrucks}</p>
              <p className="text-sm mt-1">{t.addTruckHint}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {trucks.map((truck: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                  data-testid={`truck-item-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg">{truck}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTruck(index)}
                    data-testid={`button-remove-truck-${index}`}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
