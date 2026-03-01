# peace-ui

Animated components for React. A drop-in [shadcn/ui](https://ui.shadcn.com) fork with physics-based motion and modern visual defaults.

Same API. Better feel.

## Quick Start

```bash
npx @peacenode/ui init
npx @peacenode/ui add button dialog tabs
```

## What's Different

Every component gets tasteful motion and visual polish out of the box:

- **Button** — press feedback with `active:scale`, animated focus ring
- **Dialog** — spring enter/exit, frosted glass backdrop
- **Sheet** — iOS-like spring slide from edge
- **Accordion** — smooth spring height animation
- **Tabs** — clean transitions with modern radii
- **Dropdown Menu** — elevated shadows, rounded corners
- **Skeleton** — gradient shimmer replacing pulse

15 components total. All respect `prefers-reduced-motion`.

## How It Works

- **CSS** for hover, focus, color transitions (GPU-composited, zero JS overhead)
- **Motion** for enter/exit, height animation, layout shifts (spring physics)
- **Visual** — larger radii, layered shadows, frosted glass overlays

Spring configs and animation presets live in `lib/motion.ts`, installed automatically with `init`.

## Compatibility

- Next.js 14+ (App Router and Pages Router)
- Vite + React
- Remix
- Any React 18+ project with Tailwind CSS

## Documentation

Visit [peace-ui.dev](https://peace-ui.dev) for docs and component demos.

## License

MIT
