import { useState, useEffect, lazy, Suspense } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  RectangleHorizontal,
  CreditCard,
  TextCursorInput,
  AppWindow,
  Menu,
  LayoutList,
  ChevronsUpDown,
  MessageSquare,
  Info,
  PanelBottom,
  ChevronDown,
  Loader,
  Check,
  Terminal,
  Code,
  X,
} from "lucide-react"

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

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  button: RectangleHorizontal,
  card: CreditCard,
  input: TextCursorInput,
  dialog: AppWindow,
  "dropdown-menu": Menu,
  tabs: LayoutList,
  select: ChevronsUpDown,
  popover: MessageSquare,
  tooltip: Info,
  sheet: PanelBottom,
  accordion: ChevronDown,
  skeleton: Loader,
}

const components = [
  { name: "Button", slug: "button", desc: "Press feedback with active:scale" },
  { name: "Input", slug: "input", desc: "Smooth focus transitions" },
  { name: "Card", slug: "card", desc: "Layered shadow and soft border" },
  { name: "Dialog", slug: "dialog", desc: "Spring enter/exit with frosted backdrop" },
  { name: "Sheet", slug: "sheet", desc: "iOS-like spring slide from edge" },
  { name: "Dropdown Menu", slug: "dropdown-menu", desc: "Elevated shadows, rounded corners" },
  { name: "Tabs", slug: "tabs", desc: "Clean transitions with modern radii" },
  { name: "Select", slug: "select", desc: "Elevated shadow, rounded content" },
  { name: "Popover", slug: "popover", desc: "Direction-aware enter, elevated shadow" },
  { name: "Tooltip", slug: "tooltip", desc: "Smooth fade+scale" },
  { name: "Accordion", slug: "accordion", desc: "Smooth height animation" },
  { name: "Skeleton", slug: "skeleton", desc: "Gradient shimmer animation" },
]

function CopyButton({
  text,
  icon: Icon,
  label,
}: {
  text: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
      title={text}
    >
      {copied ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  )
}

export default function ComponentCatalog() {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash && demos[hash]) setSelected(hash)
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  useEffect(() => {
    if (!selected) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [selected])

  const open = (slug: string) => {
    setSelected(slug)
    window.history.pushState(null, "", `/#${slug}`)
  }

  const close = () => {
    setSelected(null)
    window.history.pushState(null, "", "/")
  }

  const comp = components.find((c) => c.slug === selected)
  const Demo = selected ? demos[selected] : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {components.map(({ name, slug, desc }) => {
          const Icon = icons[slug] || RectangleHorizontal
          return (
            <button
              key={slug}
              onClick={() => open(slug)}
              className="text-left rounded-xl border border-border/60 p-4 hover:border-muted-foreground hover:bg-accent/50 transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">{name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && comp && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-black/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.div
              key="sheet"
              className="fixed inset-x-0 bottom-0 z-50 h-[85vh] bg-background border-t rounded-t-[1.25rem] shadow-lg flex flex-col"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              <div className="mx-auto w-10 h-1 rounded-full bg-muted-foreground/25 mt-3 mb-1" />

              <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-2.5">
                  {(() => {
                    const Icon = icons[comp.slug] || RectangleHorizontal
                    return <Icon className="size-5 text-muted-foreground" />
                  })()}
                  <h3 className="text-lg font-semibold">{comp.name}</h3>
                </div>
                <div className="flex items-center gap-0.5">
                  <CopyButton
                    text={`npx @peacenode/ui add ${comp.slug}`}
                    icon={Terminal}
                    label="npx"
                  />
                  <CopyButton
                    text={`import { ${comp.name.replace(/ /g, "")} } from "@/components/ui/${comp.slug}"`}
                    icon={Code}
                    label="import"
                  />
                  <button
                    onClick={close}
                    className="ml-2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8">
                <p className="text-sm text-muted-foreground mb-6">{comp.desc}</p>
                <div className="rounded-xl border border-border/60 p-6">
                  {Demo && (
                    <Suspense
                      fallback={
                        <div className="h-20 animate-pulse bg-muted rounded-lg" />
                      }
                    >
                      <Demo />
                    </Suspense>
                  )}
                </div>
                <div className="mt-6 bg-muted/50 border border-border/60 rounded-xl px-4 py-3 font-mono text-xs text-muted-foreground">
                  import {"{"} {comp.name.replace(/ /g, "")} {"}"} from
                  "@/components/ui/{comp.slug}"
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
