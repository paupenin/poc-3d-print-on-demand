import { Download } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function OrderItems({
  items,
}: {
  items: {
    id: number;
    fileUrl: string;
    fileName: string;
    material: string;
    quantity: number;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Material</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-semibold">#{item.id}</TableCell>
            <TableCell>
              <Link href={item.fileUrl} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {item.fileName}
              </Link>
            </TableCell>
            <TableCell>{item.material.toUpperCase()}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
