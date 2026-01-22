import { ArrowLeft, Check, X } from "lucide-react";
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
  const { isInCart, items: cartItems } = useCart();
  const { t } = useLanguage();
  
  if (!group) return null;

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
                {t.selectItems}
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
                onToggle={() => {
                  if (isInCart(item.id)) {
                    onRemoveFromCart(item.id);
                  } else {
                    onAddToCart(item, group);
                  }
                }}
                inCartText={t.added}
                tapToRemoveText={t.tapToRemove}
                tapToAddText={t.tapToAddItem}
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
            {itemsInCartFromThisGroup > 0 ? (
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
  onToggle: () => void;
  inCartText: string;
  tapToRemoveText: string;
  tapToAddText: string;
}

function VariantButton({ item, groupName, isInCart, onToggle, inCartText, tapToRemoveText, tapToAddText }: VariantButtonProps) {
  return (
    <button
      data-testid={`variant-button-${item.id}`}
      onClick={onToggle}
      className={`
        flex flex-col items-center justify-center gap-3
        min-h-[120px] p-6 rounded-2xl border-2 transition-all
        text-center active:scale-95
        ${isInCart 
          ? "border-primary bg-primary/10 hover:bg-red-500/10 hover:border-red-500" 
          : "border-border bg-card hover:bg-card/80"
        }
      `}
    >
      {isInCart ? (
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
          <span className="text-3xl font-bold">{item.name}</span>
          <span className="text-sm text-muted-foreground">
            {tapToAddText}
          </span>
        </>
      )}
    </button>
  );
}
