import { Package, CheckCircle } from "lucide-react";

interface EmptyStateProps {
  type: "no-items" | "no-requests";
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === "no-requests") {
    return (
      <div 
        data-testid="empty-state-no-requests"
        className="flex flex-col items-center justify-center py-16 px-6 text-center"
      >
        <div className="p-4 rounded-full bg-green-500/10 mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">All Stocked Up!</h3>
        <p className="text-muted-foreground max-w-sm">
          No restock requests at the moment. Technicians can flag items when supplies run low.
        </p>
      </div>
    );
  }

  return (
    <div 
      data-testid="empty-state-no-items"
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="p-4 rounded-full bg-muted mb-4">
        <Package className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Items Yet</h3>
      <p className="text-muted-foreground max-w-sm">
        Add supply items to get started. Technicians will be able to request restocks for these items.
      </p>
    </div>
  );
}
