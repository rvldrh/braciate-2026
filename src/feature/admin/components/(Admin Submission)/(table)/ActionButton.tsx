import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Detail
      </Button>

      <Button
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Edit
      </Button>

      <Button
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Hapus
      </Button>
    </div>
  );
}
