import AddOrmawaButton from "../components/(Admin Submission)/AddOrmawaButton";
import FilterJenis from "../components/(Admin Submission)/FilterJenis";
import SearchBar from "../components/(Admin Submission)/SearchBar";
import SortButton from "../components/(Admin Submission)/SortButton";
import Statistic from "../components/(Admin Submission)/Statistic";
import TableOrmawa from "../components/(Admin Submission)/(table)/SubmissionTable";
import FilterStatus from "../components/(Admin Submission)/FilterStatus";

export default function SubmissionContainer() {
  return (
    <div className="py-15 pl-6 pr-[100px] font-inter flex flex-col gap-8 bg-white">
      <div className="space-y-2 text-[#7F7F7F]">
        <h1 className="text-[32px] font-extrabold">Statistik Pendaftaran</h1>
        <p className="text-[20px] font-bold">Hasil pendaftaran ormawa</p>
      </div>
      <Statistic />
      <AddOrmawaButton />
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <FilterJenis />
        <FilterStatus />
        <SortButton />
      </div>
      <TableOrmawa />
    </div>
  );
}
