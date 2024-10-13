import { materialPrices, OrderMaterial } from "~/lib/const";
import { formatCurrency } from "~/lib/utils";

// Material descriptions, used to display information about each
// material in a real application, this data could be localized.
const materialDescriptions = {
  [OrderMaterial.PLA]:
    "PLA is a biodegradable thermoplastic derived from renewable resources like corn starch or sugarcane.",
  [OrderMaterial.ABS]:
    "ABS is a common thermoplastic polymer used for 3D printing.",
  [OrderMaterial.PETG]:
    "PETG is a glycol-modified version of polyethylene terephthalate (PET).",
  [OrderMaterial.TPU]:
    "TPU is a flexible thermoplastic material with good durability.",
};

export default function MaterialInfo({
  material,
}: {
  material: OrderMaterial;
}) {
  return (
    <div className="flex flex-col gap-2 py-2 text-sm">
      <p>
        Material price: {formatCurrency(materialPrices[material])}
        <span className="text-xs">/per unit</span>
      </p>
      <p className="italic">{materialDescriptions[material]}</p>
    </div>
  );
}
