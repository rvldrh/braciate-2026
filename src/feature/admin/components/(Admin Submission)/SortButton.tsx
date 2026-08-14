import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function SortButton() {
  return (
    <Button
      variant="outline"
      className="h-12 w-[148px] gap-2 justify-between border-[#AFAFAF]"
    >
      <h1 className="text-gray-500">Urutkan</h1>
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
    </Button>
  );
}
