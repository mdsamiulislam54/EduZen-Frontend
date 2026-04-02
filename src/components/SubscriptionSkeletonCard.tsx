import { Skeleton } from "@/components/ui/skeleton";

export const title = "Multi-line List Items";

const SubscriptionSkeletonCard = () => (
  <div className="grid grid-cols-5 gap-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <div className="flex flex-col gap-2 rounded-md border p-4" key={i}>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export default SubscriptionSkeletonCard;
