import { Button } from "@/registry/peace-v1/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/peace-v1/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
