export default function TextInput({ label, id, name, value, onChange, error }) {
  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
          error ? "border-red-500" : ""
        }`}
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
