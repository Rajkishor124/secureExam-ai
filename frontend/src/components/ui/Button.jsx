function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "w-full py-3 px-6 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-900 shadow-md hover:shadow-lg",
    secondary:
      "bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50 focus:ring-blue-900",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600 shadow-md",
    ghost:
      "bg-transparent text-blue-900 hover:bg-blue-50 focus:ring-blue-900",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;