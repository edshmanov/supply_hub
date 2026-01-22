import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { GroupButton } from "@/components/group-button";
import { VariantSelector } from "@/components/variant-selector";
import { ManagerPinDialog } from "@/components/manager-pin-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/providers/cart-provider";
import { useLanguage } from "@/providers/language-provider";
import { useToast } from "@/hooks/use-toast";
import type { ItemGroupWithItems, Item, ItemGroup } from "@shared/schema";

export default function TechnicianView() {
  const [, setLocation] = useLocation();
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ItemGroupWithItems | null>(null);
  const { addItem, removeItem, isInCart, itemCount } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: groups = [], isLoading } = useQuery<ItemGroupWithItems[]>({
    queryKey: ["/api/groups"],
    refetchInterval: 5000,
  });

  const handleGroupClick = (group: ItemGroupWithItems) => {
    if (group.isSingleItem && group.items.length === 1) {
      const item = group.items[0];
      if (!isInCart(item.id)) {
        addItem(item, group);
        toast({
          title: t.addedToCart,
          description: `${group.name}`,
        });
      } else {
        toast({
          title: t.alreadyInCart,
          description: `${group.name}`,
        });
      }
    } else {
      setSelectedGroup(group);
    }
  };

  const handleAddToCart = (item: Item, group: ItemGroup) => {
    if (!isInCart(item.id)) {
      addItem(item, group);
      toast({
        title: t.addedToCart,
        description: `${group.name} - ${item.name}`,
      });
    }
  };

  const handleCloseVariants = () => {
    setSelectedGroup(null);
  };

  const handleManagerAccess = () => {
    setShowPinDialog(true);
  };

  const handlePinSuccess = () => {
    setLocation("/manager");
  };

  const handleBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background pb-6" data-testid="technician-view">
      <Header
        title="Body Shop"
        showManagerLink
        showBackLink
        showCart
        showTruckList
        requestCount={itemCount}
        onManagerClick={handleManagerAccess}
        onBackClick={handleBack}
      />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groups.map((group) => (
              <GroupButton
                key={group.id}
                group={group}
                onClick={() => handleGroupClick(group)}
              />
            ))}
          </div>
        )}
      </main>

      <VariantSelector
        group={selectedGroup}
        open={selectedGroup !== null}
        onClose={handleCloseVariants}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={removeItem}
      />

      <ManagerPinDialog
        open={showPinDialog}
        onOpenChange={setShowPinDialog}
        onSuccess={handlePinSuccess}
      />
    </div>
  );
}
