import type { LucideIcon } from "lucide-react";

interface EventTypeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

function EventTypeCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}: EventTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
        selected
          ? "border-primary bg-primary/5 shadow-lg shadow-red-500/10"
          : "border-zinc-200 bg-white hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
          selected
            ? "bg-primary text-white"
            : "bg-zinc-100 text-brandDark group-hover:bg-primary/10 group-hover:text-primary"
        }`}
      >
        <Icon size={24} />
      </div>

      <h3 className="mt-4 font-bold text-brandDark">
        {title}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        {description}
      </p>
    </button>
  );
}

export default EventTypeCard;