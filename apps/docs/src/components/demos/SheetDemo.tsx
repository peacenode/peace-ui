import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-[1.25rem]"
        showCloseButton={false}
      >
        <div className="mx-auto w-10 h-1 rounded-full bg-muted-foreground/25 mt-2 mb-4" />
        <SheetHeader>
          <SheetTitle>Explore</SheetTitle>
          <SheetDescription>
            A bottom sheet — like Apple Maps or mobile navigation.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-3">
          <Input placeholder="Search..." />
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
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
      </SheetContent>
    </Sheet>
  )
}
