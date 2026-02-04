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
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const submitOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/orders/submit", { items });
      return response.json();
    },
    onSuccess: (data: { success: boolean; emailSent: boolean; emailError?: string }) => {
      if (data.success && data.emailSent) {
        setShowConfirm(false);
        setShowSuccess(true);
        // Clear cart after user closes success dialog
      } else if (data.success && !data.emailSent) {
        toast({
          title: t.orderSaved,
          description: `${t.orderSavedDesc} (${data.emailError || "Unknown error"})`,
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

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    setOpen(false);
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
            className={`${triggerClassName} h-20 w-20 rounded-full hover:bg-transparent`}
          >
            <TruckIcon className="w-16 h-16" />
            {itemCount > 0 && (
              <Badge
                className="absolute top-0 right-0 h-8 min-w-[2rem] rounded-full p-1 flex items-center justify-center text-lg font-bold border-2 border-background shadow-sm"
                variant="destructive"
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
            <SheetFooter className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="w-full h-16 text-lg font-bold"
                data-testid="button-clear-cart"
              >
                <Trash2 className="w-6 h-6 mr-2" />
                {t.clearAll}
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-full h-16 text-lg font-bold"
                data-testid="button-submit-order"
              >
                <Send className="w-6 h-6 mr-2" />
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
          <AlertDialogFooter className="grid grid-cols-2 gap-4 sm:space-x-0">
            <AlertDialogCancel
              data-testid="button-cancel-order"
              className="w-full h-16 text-lg font-bold mt-0"
            >
              {t.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSend}
              disabled={submitOrderMutation.isPending}
              data-testid="button-confirm-send"
              className="w-full h-16 text-lg font-bold"
            >
              {submitOrderMutation.isPending ? t.sending : t.sendToMicah}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccess} onOpenChange={(open) => !open && handleSuccessClose()}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader className="items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <TruckIcon className="w-10 h-10 text-green-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-green-600">{t.orderSent}</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              {t.orderSentDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={handleSuccessClose}
              className="w-full sm:w-1/2 h-14 text-lg font-bold bg-green-600 hover:bg-green-700"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
