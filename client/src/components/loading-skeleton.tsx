import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="space-y-8" data-testid="loading-skeleton">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4 min-h-20">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-12 w-36 rounded-xl" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RequestLoadingSkeleton() {
  return (
    <div className="space-y-3" data-testid="request-loading-skeleton">
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-11 w-11 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        </Card>
      ))}
    </div>
  );
}
