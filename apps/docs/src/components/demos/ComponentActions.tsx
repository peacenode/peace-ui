import { useState } from "react"
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
} from "lucide-react"

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
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
      title={text}
    >
      {copied ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  )
}

export default function ComponentActions({
  name,
  slug,
}: {
  name: string
  slug: string
}) {
  const Icon = icons[slug] || RectangleHorizontal
  const displayName = name.replace(/ /g, "")
  const importStatement = `import { ${displayName} } from "@/components/ui/${slug}"`
  const npxCommand = `npx @peacenode/ui add ${slug}`

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <Icon className="size-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <div className="flex gap-0.5">
        <CopyButton text={npxCommand} icon={Terminal} label="npx" />
        <CopyButton text={importStatement} icon={Code} label="import" />
      </div>
    </div>
  )
}
