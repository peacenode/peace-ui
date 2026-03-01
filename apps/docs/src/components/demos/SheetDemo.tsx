import { useState } from "react"
import { Sheet, SheetHandle, SheetHeader, SheetBody } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const items = [
  { label: "Search nearby", icon: "S" },
  { label: "Restaurants", icon: "R" },
  { label: "Coffee", icon: "C" },
  { label: "Gas stations", icon: "G" },
  { label: "Hotels", icon: "H" },
  { label: "Parking", icon: "P" },
]

export default function SheetDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Sheet
      </Button>
      {open && (
        <Sheet defaultDetent="half" onClose={() => setOpen(false)}>
          <SheetHandle />
          <SheetHeader>
            <h3 className="font-semibold">Explore</h3>
            <p className="text-sm text-muted-foreground">
              Drag up to expand, down to dismiss
            </p>
          </SheetHeader>
          <div className="px-5 pb-3">
            <Input placeholder="Search..." />
          </div>
          <SheetBody>
            <div className="space-y-1">
              {items.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </SheetBody>
        </Sheet>
      )}
    </>
  )
}
