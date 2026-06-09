function Input({
  label,
  className = "",
  ...props
}) {
  return (
    <div className="mb-5">

      <label className="block mb-2 text-slate-300">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          focus:outline-none
          focus:border-blue-500
          transition
          ${className}
        `}
      />

    </div>
  );
}

export default Input;