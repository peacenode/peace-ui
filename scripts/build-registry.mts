/**
 * Registry Build Script
 *
 * Reads component source files from registry/peace-v1/ui/,
 * inlines their content into JSON following the shadcn registry-item schema,
 * and outputs to apps/docs/public/r/styles/peace-v1/.
 *
 * Run: npx tsx scripts/build-registry.mts
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs"
import { join, basename } from "path"

const REGISTRY_DIR = join(import.meta.dirname, "..", "registry", "peace-v1")
const OUTPUT_DIR = join(
  import.meta.dirname,
  "..",
  "apps",
  "docs",
  "public",
  "r",
  "styles",
  "peace-v1"
)

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true })

// Read UI components
const uiDir = join(REGISTRY_DIR, "ui")
const uiFiles = readdirSync(uiDir).filter(
  (f) => f.endsWith(".tsx") && !f.startsWith("_")
)

for (const file of uiFiles) {
  const name = basename(file, ".tsx")
  const content = readFileSync(join(uiDir, file), "utf-8")

  const registryItem = {
    $schema: "https://peace-ui.dev/schema/registry-item.json",
    name,
    type: "registry:ui",
    files: [
      {
        path: `ui/${file}`,
        type: "registry:ui",
        content,
      },
    ],
  }

  writeFileSync(
    join(OUTPUT_DIR, `${name}.json`),
    JSON.stringify(registryItem, null, 2)
  )
}

// Read lib files
const libDir = join(REGISTRY_DIR, "lib")
const libFiles = readdirSync(libDir).filter(
  (f) => f.endsWith(".ts") && !f.startsWith("_")
)

for (const file of libFiles) {
  const name = basename(file, ".ts")
  const content = readFileSync(join(libDir, file), "utf-8")

  const registryItem = {
    $schema: "https://peace-ui.dev/schema/registry-item.json",
    name,
    type: "registry:lib",
    files: [
      {
        path: `lib/${file}`,
        type: "registry:lib",
        content,
      },
    ],
  }

  writeFileSync(
    join(OUTPUT_DIR, `${name}.json`),
    JSON.stringify(registryItem, null, 2)
  )
}

const totalItems = uiFiles.length + libFiles.length
console.log(
  `Built ${totalItems} registry items → ${OUTPUT_DIR}`
)
