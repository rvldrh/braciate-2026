import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButton";

export interface Ormawa {
  id: number;
  nama: string;
  pic: string;
  kontak: string;
  jenis: string;
  status: "approved" | "pending" | "rejected";
}

export default function SubmissionTable() {
  const listOrmawa: Ormawa[] = [
    {
      id: 1,
      nama: "BEM Fakultas Ilmu Komputer",
      pic: "John Doe",
      kontak: "0867676767",
      jenis: "BEM",
      status: "approved",
    },
    {
      id: 2,
      nama: "DPM Fakultas Ilmu Komputer",
      pic: "Ghiffary Abdul",
      kontak: "0867676767",
      jenis: "DPM",
      status: "pending",
    },
    {
      id: 3,
      nama: "Kabinet Departemen Sistem Informasi",
      pic: "Imroatus",
      kontak: "0867676767",
      jenis: "HIMA",
      status: "rejected",
    },
    {
      id: 4,
      nama: "Nol Derajat Film",
      pic: "Muhammad Ibnu",
      kontak: "0867676767",
      jenis: "UKM",
      status: "approved",
    },
  ];
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
      <Table className="border-separate border-spacing-0 text-[14px]">
        <TableHeader className="">
          <TableRow className="text-white font-semibold font-inter bg-[#7F7F7F] hover:bg-[#7F7F7F]">
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              No
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Nama Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Kontak PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Jenis Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Status
            </TableHead>
            <TableHead className="text-white font-semibold text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#757575]">
          {listOrmawa.map((data) => (
            <TableRow key={data.id} className="text-center">
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.id}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.nama}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.pic}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.kontak}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.jenis}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                <StatusBadge status={data.status} />
              </TableCell>

              <TableCell className="">
                <ActionButtons />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
