export default function SelectInput({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="" disabled selected>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
