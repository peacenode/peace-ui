import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-shimmer bg-gradient-to-r from-accent/60 via-accent to-accent/60 bg-[length:200%_100%] rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
