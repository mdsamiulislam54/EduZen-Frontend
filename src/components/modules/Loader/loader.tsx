import { Skeleton } from "@/components/ui/skeleton";

export const title = "Multi-line List Items";

const Loader = ({length=16}) => (
  <div className={`grid  ${length > 16 ? 'grid-cols-10' : length === 4 ? 'grid-cols-4' : 'grid-cols-1' } gap-4`}>
    {Array.from({ length: length}).map((_, i) => (
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

export default Loader;
