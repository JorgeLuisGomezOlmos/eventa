import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border border-zinc-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;