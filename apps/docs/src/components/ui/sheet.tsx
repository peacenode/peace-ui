"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, type PanInfo } from "motion/react"

import { cn } from "@/lib/utils"

type SheetDetent = "peek" | "half" | "full"

const OFFSETS: Record<SheetDetent | "closed", number> = {
  full: 0,
  half: 42,
  peek: 80,
  closed: 98,
}

const spring = { type: "spring" as const, stiffness: 400, damping: 35 }

function Sheet({
  children,
  className,
  defaultDetent = "peek",
  onDetentChange,
  onClose,
}: {
  children: React.ReactNode
  className?: string
  defaultDetent?: SheetDetent
  onDetentChange?: (detent: SheetDetent) => void
  onClose?: () => void
}) {
  const [detent, setDetent] = useState<SheetDetent>(defaultDetent)
  const [targetY, setTargetY] = useState<number | null>(null)
  const [closing, setClosing] = useState(false)

  const toPx = useCallback(
    (vh: number) => (vh / 100) * window.innerHeight,
    []
  )

  useEffect(() => {
    setTargetY(toPx(OFFSETS[defaultDetent]))
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") snapTo("closed")
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const snapTo = useCallback(
    (d: SheetDetent | "closed") => {
      if (d === "closed") {
        setClosing(true)
        setTargetY(toPx(OFFSETS.closed))
        setTimeout(() => onClose?.(), 400)
        return
      }
      setDetent(d)
      onDetentChange?.(d)
      setTargetY(toPx(OFFSETS[d]))
    },
    [toPx, onDetentChange, onClose]
  )

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.y
      const order: (SheetDetent | "closed")[] = ["full", "half", "peek", "closed"]

      if (Math.abs(velocity) > 400) {
        const dir = velocity > 0 ? 1 : -1
        const idx = order.indexOf(detent)
        const next = Math.max(0, Math.min(order.length - 1, idx + dir))
        snapTo(order[next])
      } else {
        // Snap to nearest based on current visual position
        const point = info.point.y
        const nearest = (["full", "half", "peek"] as SheetDetent[])
          .map((d) => ({ d, dist: Math.abs(point - toPx(OFFSETS[d])) }))
          .sort((a, b) => a.dist - b.dist)[0]
        snapTo(nearest.d)
      }
    },
    [detent, snapTo, toPx]
  )

  if (targetY === null) return null

  return (
    <motion.div
      className={cn(
        "fixed inset-x-2 bottom-0 z-[60] h-[96vh] rounded-t-2xl bg-background shadow-elevated border border-border/40 flex flex-col overflow-hidden",
        className
      )}
      initial={{ y: toPx(OFFSETS.closed) }}
      animate={{ y: targetY }}
      transition={spring}
      drag={closing ? false : "y"}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (detent === "peek") snapTo("half")
      }}
    >
      {children}
    </motion.div>
  )
}

function SheetHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-handle"
      className={cn(
        "mx-auto w-10 h-1 rounded-full bg-muted-foreground/30 mt-2.5 mb-1 shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("px-5 py-2 shrink-0", className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("flex-1 overflow-y-auto px-5 pb-5", className)}
      {...props}
    />
  )
}

export { Sheet, SheetHandle, SheetHeader, SheetBody }
export type { SheetDetent }
