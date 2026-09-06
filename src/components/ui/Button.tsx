import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-red-500/20",

    secondary:
      "bg-brandDark text-white hover:bg-brandDarkSoft",

    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-0.5
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0
        disabled:hover:shadow-none
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;