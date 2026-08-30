export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] p-5 bg-white space-y-3">
      <SkeletonBlock className="h-10 w-10 rounded-full" />
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-3 w-1/2" />
    </div>
  );
}

export function GridSkeleton({ count = 6, cardClassName = "" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} className={cardClassName} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-8 w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20" />
        ))}
      </div>
      <SkeletonBlock className="h-48 w-full" />
    </div>
  );
}
