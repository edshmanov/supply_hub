import { Package } from "lucide-react";
import { TruckIcon, categoryIconMap } from "./category-icons";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/providers/cart-provider";
import { useLanguage } from "@/providers/language-provider";
import type { ItemGroupWithItems } from "@shared/schema";

interface GroupButtonProps {
  group: ItemGroupWithItems;
  onClick: () => void;
}

export function GroupButton({ group, onClick }: GroupButtonProps) {
  const { isInCart } = useCart();
  const { t } = useLanguage();
  const CustomIcon = categoryIconMap[group.icon];

  const cartCount = group.items.filter(item => isInCart(item.id)).length;
  const hasItemsInCart = cartCount > 0;

  return (
    <button
      data-testid={`group-button-${group.id}`}
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center gap-3
        w-full aspect-square min-h-[140px]
        rounded-2xl border-2 transition-all duration-200
        text-center p-4
        active:scale-95
        ${hasItemsInCart
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:bg-card/80"
        }
      `}
    >
      {hasItemsInCart && (
        <Badge
          data-testid={`badge-group-cart-${group.id}`}
          className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 text-sm font-bold"
        >
          {cartCount}
        </Badge>
      )}

      <div className={`p-4 rounded-xl ${hasItemsInCart ? "bg-primary/20" : "bg-muted"}`}>
        {CustomIcon ? (
          <CustomIcon className={`w-10 h-10 ${hasItemsInCart ? "text-primary" : "text-foreground"}`} />
        ) : (
          <Package className={`w-10 h-10 ${hasItemsInCart ? "text-primary" : "text-foreground"}`} />
        )}
      </div>

      <span className="text-lg font-semibold leading-tight">{group.name}</span>

      {!group.isSingleItem && (
        <span className="text-sm text-muted-foreground">
          {group.items.length} {t.variants}
        </span>
      )}

      {hasItemsInCart && group.isSingleItem && (
        <div className="flex items-center gap-1 text-primary text-sm font-medium">
          <TruckIcon className="w-4 h-4" />
          <span>{t.inCart}</span>
        </div>
      )}
    </button>
  );
}
