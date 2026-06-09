function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`
        w-full
        bg-blue-500
        hover:bg-blue-600
        transition-all
        duration-300
        py-3
        rounded-xl
        font-semibold
        hover:scale-[1.02]
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;