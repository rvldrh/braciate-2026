import { CircleArrowRight } from "lucide-react";

export default function AddOrmawaButton() {
  return (
    <div className="w-fit">
      <button className="flex bg-[#858585] text-white p-3 space-x-15 rounded-[8px]">
        <h1 className="font-bold text-[16px]">Daftar Ormawa</h1>
        <CircleArrowRight className="text-[24px]" />
      </button>
    </div>
  );
}
