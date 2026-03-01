import { lazy, Suspense } from "react"

const demos: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  button: lazy(() => import("./ButtonDemo")),
  card: lazy(() => import("./CardDemo")),
  input: lazy(() => import("./InputDemo")),
  skeleton: lazy(() => import("./SkeletonDemo")),
  tabs: lazy(() => import("./TabsDemo")),
  accordion: lazy(() => import("./AccordionDemo")),
  dialog: lazy(() => import("./DialogDemo")),
  tooltip: lazy(() => import("./TooltipDemo")),
  select: lazy(() => import("./SelectDemo")),
  "dropdown-menu": lazy(() => import("./DropdownMenuDemo")),
  popover: lazy(() => import("./PopoverDemo")),
  sheet: lazy(() => import("./SheetDemo")),
}

export default function ComponentPreview({ name }: { name: string }) {
  const Demo = demos[name]
  if (!Demo) return null

  return (
    <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-lg" />}>
      <Demo />
    </Suspense>
  )
}
