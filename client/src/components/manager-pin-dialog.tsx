import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

interface ManagerPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ManagerPinDialog({ open, onOpenChange, onSuccess }: ManagerPinDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError("");
    
    try {
      const response = await apiRequest("POST", "/api/auth/validate-pin", { pin });
      const data = await response.json();
      if (data.valid) {
        setPin("");
        setError("");
        onSuccess();
        onOpenChange(false);
      }
    } catch {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setPin("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[360px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="text-xl">Manager Access</DialogTitle>
            </div>
            <DialogDescription>
              Enter the manager PIN to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="grid gap-2">
              <Label htmlFor="pin" className="text-base">
                PIN Code
              </Label>
              <div className="relative">
                <Input
                  id="pin"
                  data-testid="input-manager-pin"
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter PIN"
                  className="h-14 text-2xl text-center tracking-[0.5em] pr-12"
                  maxLength={4}
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPin(!showPin)}
                  data-testid="button-toggle-pin-visibility"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-destructive mt-1" data-testid="text-pin-error">
                  {error}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Default PIN: 1234
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              data-testid="button-cancel-pin"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              data-testid="button-submit-pin"
              disabled={pin.length < 4 || isValidating}
            >
              {isValidating ? "Validating..." : "Access Dashboard"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
