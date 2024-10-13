import { Check, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";

export default function OrderItemBox({
  name,
  open,
  validated,
  onActiveItemChange,
  children,
}: {
  name: string;
  open: boolean;
  validated: boolean;
  onActiveItemChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <Collapsible
      className="w-full overflow-hidden rounded-lg border"
      open={open}
      onOpenChange={onActiveItemChange}
    >
      <CollapsibleTrigger className="flex w-full items-center gap-2 bg-background px-4 py-2">
        <Check
          className={cn(
            "h-6 w-6",
            validated ? "text-green-600" : "text-gray-400",
          )}
        />
        <span className="grow text-left text-xs font-semibold">{name}</span>
        {!open && <ChevronDown className="h-6 w-6" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full bg-background px-4 pb-6">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
