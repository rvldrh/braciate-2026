import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterStatus() {
  return (
    <Select>
      <SelectTrigger className="h-12! w-[148px] border-[#AFAFAF]">
        <SelectValue placeholder="Filter Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="disetujui">Disetujui</SelectItem>
        <SelectItem value="menunggu">Menunggu</SelectItem>
        <SelectItem value="ditolak">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
