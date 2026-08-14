import { LucideIcon, Users } from "lucide-react";

export default function Statistic() {
  interface PerformanceCard {
    id: number;
    label: string;
    value: number;
    icon: LucideIcon;
  }

  const PerformanceCards: PerformanceCard[] = [
    {
      id: 1,
      label: "Ormawa",
      value: 1284,
      icon: Users,
    },
    {
      id: 2,
      label: "BEM",
      value: 760,
      icon: Users,
    },
    {
      id: 3,
      label: "DPM",
      value: 130,
      icon: Users,
    },
    {
      id: 4,
      label: "HIMA",
      value: 590,
      icon: Users,
    },
    {
      id: 5,
      label: "Ormawa",
      value: 899,
      icon: Users,
    },
  ];

  return (
    <div className="flex justify-between">
      {PerformanceCards.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex border border-[#A6A6A6] rounded-[12px] h-[132px] space-x-4 p-7 items-center"
          >
            <div className=" bg-[#E0E0E0] rounded-[8px] p-3">
              <Icon className="text-[#8A8A8A] text-[24px]" />
            </div>
            <div>
              <h1 className="text-[14px] text-[#434343] font-medium text-wrap">
                jumlah
              </h1>
              <h1 className="text-[14px] text-[#434343] font-medium text-wrap">
                {item.label}
              </h1>
              <p className="text-[24px] text-[#676767] font-bold">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
