import { Button } from "@/registry/peace-v1/ui/button"
import { Spinner } from "@/registry/peace-v1/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      Submit
    </Button>
  )
}
