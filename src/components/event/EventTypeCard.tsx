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
  // description,
  icon: Icon,
  selected,
  onClick,
}: EventTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden rounded-xl
        border p-3 text-left
        transition-all duration-300
        active:scale-[0.98]
        sm:p-5
        ${
          selected
            ? "border-primary bg-gradient-to-br from-primary/[0.08] via-white to-white shadow-xl shadow-primary/10"
            : "border-zinc-200 bg-white hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
        }
      `}
    >
      {/* brillo decorativo */}
      <div
        className={`
          pointer-events-none absolute -right-8 -top-8 h-24 w-24
          rounded-full blur-3xl transition-opacity duration-500
          ${
            selected
              ? "bg-primary/20 opacity-100"
              : "bg-primary/10 opacity-0 group-hover:opacity-100"
          }
        `}
      />
    
      <div className="relative">
    
        {/* PARTE SUPERIOR */}
        <div className="flex items-start justify-between gap-0">
    
          {/* ICONO */}
          <div
            className={`
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-2xl transition-all duration-300
              sm:h-16 sm:w-16
              ${
                selected
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-zinc-100 text-brandDark group-hover:bg-zinc-900 group-hover:text-white"
              }
            `}
          >
            <Icon
              size={24}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
    
          {/* INDICADOR */}
          <div
            className={`
              rounded-full px-1.5 py-1 text-[9px] font-bold uppercase
              tracking-wider transition-all duration-300
              ${
                selected
                  ? "bg-primary text-white"
                  : "bg-zinc-100 text-zinc-400 opacity-0 group-hover:opacity-100"
              }
            `}
          >
            {selected ? "Elegido" : "Seleccionar"}
          </div>
    
        </div>
    
        {/* TEXTO */}
        <div className="mt-3">
    
          <h3 className="text-lg font-extrabold tracking-tight text-brandDark sm:text-xl">
            {title}
          </h3>
    
    
        </div>
    
        {/* PIE */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-2">
    
          <span
            className={`
              text-[8px] font-bold uppercase tracking-[0.16em]
              ${
                selected
                  ? "text-primary"
                  : "text-zinc-400"
              }
            `}
          >
            Tipo de evento
          </span>
    
          
    
        </div>
    
      </div>
    </button>
  );
}

export default EventTypeCard;