import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Package, Clock, CheckCircle, Trash2 } from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/empty-state";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ItemGroupWithItems, Item } from "@shared/schema";

export default function ManagerDashboard() {
  const [, setLocation] = useLocation();
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: groups = [], isLoading } = useQuery<ItemGroupWithItems[]>({
    queryKey: ["/api/groups"],
    refetchInterval: 5000,
  });

  // Flatten all requested items with group info
  const requestedItems: Array<{ item: Item; groupName: string }> = [];
  groups.forEach(group => {
    group.items.forEach(item => {
      if (item.isRequested) {
        requestedItems.push({ item, groupName: group.name });
      }
    });
  });

  // Sort by request time (newest first)
  requestedItems.sort((a, b) => {
    if (!a.item.requestedAt || !b.item.requestedAt) return 0;
    return new Date(b.item.requestedAt).getTime() - new Date(a.item.requestedAt).getTime();
  });

  const clearRequestMutation = useMutation({
    mutationFn: async (itemId: string) => {
      setPendingItemId(itemId);
      return apiRequest("POST", `/api/items/${itemId}/clear`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/groups"] });
      toast({
        title: "Item Marked as Ordered",
        description: "The request has been cleared.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear request. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setPendingItemId(null);
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/items/clear-all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/groups"] });
      toast({
        title: "All Requests Cleared",
        description: "The order has been placed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear requests. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMarkOrdered = (itemId: string) => {
    clearRequestMutation.mutate(itemId);
  };

  const handleClearAll = () => {
    clearAllMutation.mutate();
  };

  const handleBack = () => {
    setLocation("/body-shop");
  };

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return "Unknown";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="min-h-screen bg-background" data-testid="manager-dashboard">
      <Header
        title="Manager"
        showBackLink
        onBackClick={handleBack}
        requestCount={requestedItems.length}
        onClearAll={handleClearAll}
        isClearingAll={clearAllMutation.isPending}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Pending Requests</h2>
            <span className="text-muted-foreground">
              {requestedItems.length} item{requestedItems.length !== 1 ? 's' : ''}
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : requestedItems.length === 0 ? (
            <Card className="border border-border">
              <EmptyState type="no-requests" />
            </Card>
          ) : (
            <div className="space-y-3">
              {requestedItems.map(({ item, groupName }) => (
                <Card
                  key={item.id}
                  data-testid={`request-item-${item.id}`}
                  className="flex items-center justify-between p-4 border border-border"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-3 rounded-lg bg-destructive/20">
                      <Package className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-lg font-semibold truncate">
                        {groupName} • {item.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTimeAgo(item.requestedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    data-testid={`button-mark-ordered-${item.id}`}
                    variant="outline"
                    onClick={() => handleMarkOrdered(item.id)}
                    disabled={pendingItemId === item.id}
                    className="ml-4"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {pendingItemId === item.id ? "..." : "Mark Ordered"}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
