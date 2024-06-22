import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-gray/80 dark:bg-midnight/80", className)}
      {...props}
    />
  )
}

export { Skeleton }
