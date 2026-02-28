import { registryItemSchema, type Registry } from "peace-ui/schema"
import { z } from "zod"

import { themes } from "../_legacy-themes"
import { examples } from "./examples/_registry"
import { hooks } from "./hooks/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const DEPRECATED_ITEMS = [
  "toast",
  "toast-demo",
  "toast-destructive",
  "toast-simple",
  "toast-with-action",
  "toast-with-title",
]

// Shared between index and style for backward compatibility.
const PEACE_V1_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react", "radix-ui", "motion"],
  devDependencies: ["tw-animate-css", "peace-ui"],
  registryDependencies: ["utils", "motion"],
  css: {
    '@import "tw-animate-css"': {},
    '@import "peace-ui/tailwind.css"': {},
    "@layer base": {
      "*": {
        "@apply border-border outline-ring/50": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    },
  },
  cssVars: {},
  files: [],
}

export const registry = {
  name: "peace-ui",
  homepage: "https://peace-ui.dev",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        ...PEACE_V1_STYLE,
      },
      {
        name: "style",
        ...PEACE_V1_STYLE,
      },
      ...ui,
      ...lib,
      ...hooks,
      ...themes,
      ...examples,
    ].filter((item) => {
      return !DEPRECATED_ITEMS.includes(item.name)
    })
  ),
} satisfies Registry
