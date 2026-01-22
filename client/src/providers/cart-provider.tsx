import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Item, ItemGroup } from "@shared/schema";

export interface CartItem {
  itemId: string;
  itemName: string;
  groupId: string;
  groupName: string;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Item, group: ItemGroup) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Item, group: ItemGroup) => {
    setItems((prev) => {
      if (prev.some((i) => i.itemId === item.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          itemId: item.id,
          itemName: item.name,
          groupId: group.id,
          groupName: group.name,
          addedAt: new Date(),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (itemId: string) => items.some((i) => i.itemId === itemId),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        itemCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
