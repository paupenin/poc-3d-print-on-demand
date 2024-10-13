import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { OrderMaterial } from "~/lib/const";
import MaterialInfo from "../custom/material-info";
import { Checkbox } from "../ui/checkbox";

type FormOrderItem = {
  material: OrderMaterial;
  quantity: number;
  validated: boolean;
};

export default function PartConfiguration({
  item,
  onItemChange,
}: {
  item: FormOrderItem;
  onItemChange: (item: FormOrderItem) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quantity input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-sm">
          Quantity
        </label>
        <Input
          className="bg-background"
          type="number"
          value={item.quantity}
          min={1}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (isNaN(value) || value < 1) return;
            onItemChange({
              ...item,
              quantity: value,
            });
          }}
        />
      </div>

      {/* Material selection */}
      <div className="flex flex-col gap-2">
        <label htmlFor="material" className="text-sm">
          Material
        </label>
        <Select
          value={item.material}
          onValueChange={(value) => {
            if (value === null) return;
            onItemChange({
              ...item,
              material: value as OrderMaterial,
            });
          }}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder={item.material} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OrderMaterial).map((material) => (
              <SelectItem key={material} value={material}>
                {material.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Display selected material information */}
        <MaterialInfo material={item.material} />
      </div>

      {/* Validation checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="validatedCheckbox"
          checked={item.validated}
          onCheckedChange={(checked) => {
            onItemChange({ ...item, validated: !!checked });
          }}
        />
        <label
          htmlFor="validatedCheckbox"
          className="cursor-pointer text-sm font-medium leading-none"
        >
          I acknowledge that this part is ready for printing
        </label>
      </div>
    </div>
  );
}
