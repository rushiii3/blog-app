import { Skeleton } from "@/components/ui/skeleton";
const SkeletonUi = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-all hover:shadow-md">
      <Skeleton className="h-48 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Skeleton className="h-3.5 w-[100px]" />
          <span>•</span>
          <Skeleton className="h-3.5 w-[100px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
export default function LoadingUI() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <SkeletonUi key={value} />
      ))}
    </div>
  );
}
