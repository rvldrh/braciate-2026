interface Props {
  status: "approved" | "pending" | "rejected";
}

export function StatusBadge({ status }: Props) {
  const config = {
    approved: {
      label: "Disetujui",
      bg: "bg-[#7F7F7F]",
      circle: "bg-[#D9D9D9]",
      text: "text-white",
    },
    pending: {
      label: "Menunggu",
      bg: "bg-[#D9D9D9]",
      circle: "bg-[#7F7F7F]",
      text: "text-[#7F7F7F]",
    },
    rejected: {
      label: "Ditolak",
      bg: "bg-[#9B9B9B]",
      circle: "bg-[#D3D3D3]",
      text: "text-[#D3D3D3]",
    },
  };

  const current = config[status];

  return (
    <div
      className={`flex items-center justify-between rounded-full ${current.bg} px-1 text-[14px] border border-[#BEC8CF]`}
    >
      <span className={`${current.text}`}>{current.label}</span>
      <div className={`h-2 w-2 rounded-full ${current.circle}`} />
    </div>
  );
}
