import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterJenis() {
  return (
    <Select>
      <SelectTrigger className="h-12! w-[148px] border-[#AFAFAF]">
        <SelectValue placeholder="Filter Jenis" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="bem">BEM</SelectItem>
        <SelectItem value="dpm">DPM</SelectItem>
        <SelectItem value="hima">HIMA</SelectItem>
        <SelectItem value="ukm">UKM</SelectItem>
      </SelectContent>
    </Select>
  );
}
