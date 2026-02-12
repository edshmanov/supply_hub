import { ArrowLeft, Check, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/providers/cart-provider";
import { useLanguage } from "@/providers/language-provider";
import { useMode } from "@/providers/mode-provider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { TruckIcon } from "./category-icons";
import type { ItemGroupWithItems, Item, ItemGroup } from "@shared/schema";

interface VariantSelectorProps {
  group: ItemGroupWithItems | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: Item, group: ItemGroup) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export function VariantSelector({
  group,
  open,
  onClose,
  onAddToCart,
  onRemoveFromCart,
}: VariantSelectorProps) {
  const { isInCart } = useCart();
  const { t } = useLanguage();
  const { isTakeMode } = useMode();
  const { toast } = useToast();

  if (!group) return null;

  const handleTakeItem = async (item: Item) => {
    try {
      await apiRequest("POST", "/api/usage/record", {
        itemName: item.name,
        itemId: item.id,
        quantity: 1
      });

      toast({
        title: isTakeMode ? "Item Taken" : "Recorded",
        description: `Took 1x ${item.name}`,
        duration: 2000,
        className: "bg-orange-500 text-white border-none"
      });
    } catch (e) {
      console.error("Failed to record usage:", e);
      toast({
        title: "Error",
        description: "Failed to record item usage",
        variant: "destructive"
      });
    }
  };

  const itemsInCartFromThisGroup = group.items.filter(item => isInCart(item.id)).length;

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-3xl bg-background border-t-2 border-border flex flex-col [&>button:last-of-type]:hidden"
      >
        <SheetHeader className="pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              data-testid="button-back-variants"
              className="h-14 px-5 text-lg font-semibold gap-2"
            >
              <ArrowLeft className="w-6 h-6" />
              {t.back}
            </Button>
            <div className="flex-1">
              <SheetTitle className="text-2xl font-bold">{group.name}</SheetTitle>
              <p className="text-muted-foreground text-base mt-1">
                {isTakeMode
                  ? <span className="text-orange-600 font-bold flex items-center gap-1"><ClipboardList className="w-4 h-4" /> TAKE MODE: Select items to record usage</span>
                  : t.selectItems
                }
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {group.items.map((item) => (
              <VariantButton
                key={item.id}
                item={item}
                groupName={group.name}
                isInCart={isInCart(item.id)}
                isTakeMode={isTakeMode}
                onToggle={() => {
                  if (isTakeMode) {
                    handleTakeItem(item);
                  } else {
                    if (isInCart(item.id)) {
                      onRemoveFromCart(item.id);
                    } else {
                      onAddToCart(item, group);
                    }
                  }
                }}
                inCartText={t.added}
                tapToRemoveText={t.tapToRemove}
                tapToAddText={isTakeMode ? "TAP TO TAKE" : t.tapToAddItem}
              />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 pb-6 border-t border-border">
          <Button
            onClick={onClose}
            data-testid="button-done-variants"
            className="w-full h-16 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90"
          >
            {itemsInCartFromThisGroup > 0 && !isTakeMode ? (
              <>
                <Check className="w-6 h-6 mr-2" />
                {t.done} ({itemsInCartFromThisGroup} {t.added.toLowerCase()})
              </>
            ) : (
              t.done
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface VariantButtonProps {
  item: Item;
  groupName: string;
  isInCart: boolean;
  isTakeMode: boolean;
  onToggle: () => void;
  inCartText: string;
  tapToRemoveText: string;
  tapToAddText: string;
}

function VariantButton({ item, groupName, isInCart, isTakeMode, onToggle, inCartText, tapToRemoveText, tapToAddText }: VariantButtonProps) {
  return (
    <button
      data-testid={`variant-button-${item.id}`}
      onClick={onToggle}
      className={`
        flex flex-col items-center justify-center gap-3
        min-h-[120px] p-6 rounded-2xl border-2 transition-all
        text-center active:scale-95
        ${isTakeMode
          ? "border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-500"
          : isInCart
            ? "border-primary bg-primary/10 hover:bg-red-500/10 hover:border-red-500"
            : "border-border bg-card hover:bg-card/80"
        }
      `}
    >
      {isInCart && !isTakeMode ? (
        <>
          <div className="p-3 rounded-full bg-primary/20">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xl font-bold">{item.name}</span>
          <Badge className="bg-primary text-primary-foreground">
            <TruckIcon className="w-4 h-4 mr-1" />
            {inCartText}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {tapToRemoveText}
          </span>
        </>
      ) : (
        <>
          {isTakeMode ? (
            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mb-1">
              <ClipboardList className="w-8 h-8" />
            </div>
          ) : null}
          <span className={`text-3xl font-bold ${isTakeMode ? 'text-orange-900' : ''}`}>{item.name}</span>
          <span className={`text-sm ${isTakeMode ? 'text-orange-700 font-medium' : 'text-muted-foreground'}`}>
            {tapToAddText}
          </span>
        </>
      )}
    </button>
  );
}
