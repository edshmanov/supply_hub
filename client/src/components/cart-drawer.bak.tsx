import { useState } from "react";
import { X, Send, Trash2 } from "lucide-react";
import { TruckIcon } from "./category-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/providers/cart-provider";
import { useLanguage } from "@/providers/language-provider";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  triggerClassName?: string;
}

export function CartDrawer({ triggerClassName }: CartDrawerProps) {
  const { items, removeItem, clearCart, itemCount } = useCart();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  const submitOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/orders/submit", { items });
      return response.json();
    },
    onSuccess: (data: { success: boolean; emailSent: boolean; emailError?: string }) => {
      if (data.success && data.emailSent) {
        toast({
          title: t.orderSent,
          description: t.orderSentDesc,
        });
        clearCart();
        setShowConfirm(false);
        setOpen(false);
      } else if (data.success && !data.emailSent) {
        toast({
          title: t.orderSaved,
          description: t.orderSavedDesc,
          variant: "destructive",
        });
        setShowConfirm(false);
      }
    },
    onError: () => {
      toast({
        title: t.error,
        description: t.errorDesc,
        variant: "destructive",
      });
      setShowConfirm(false);
    },
  });

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirmSend = () => {
    submitOrderMutation.mutate();
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            data-testid="button-cart"
            variant="ghost"
            size="lg"
            className={`${triggerClassName} h-12 w-12`}
          >
            <TruckIcon className="w-8 h-8" />
            {itemCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-sm font-bold"
                data-testid="badge-cart-count"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <TruckIcon className="w-6 h-6" />
              {t.order} ({itemCount})
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {itemCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <TruckIcon className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">{t.orderEmpty}</p>
                <p className="text-sm mt-1">{t.tapToAdd}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedItems).map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      {groupName}
                    </h3>
                    <div className="space-y-1">
                      {groupItems.map((item) => (
                        <div
                          key={item.itemId}
                          className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                          data-testid={`cart-item-${item.itemId}`}
                        >
                          <span className="font-medium">
                            {item.groupName === item.itemName
                              ? item.itemName
                              : `${item.groupName} - ${item.itemName}`}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.itemId)}
                            data-testid={`button-remove-${item.itemId}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {itemCount > 0 && (
            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="w-full"
                data-testid="button-clear-cart"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.clearAll}
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-full"
                data-testid="button-submit-order"
              >
                <Send className="w-4 h-4 mr-2" />
                {t.submitOrder}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirmOrder}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.confirmOrderText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-order">{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSend}
              disabled={submitOrderMutation.isPending}
              data-testid="button-confirm-send"
            >
              {submitOrderMutation.isPending ? t.sending : t.sendToMicah}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
