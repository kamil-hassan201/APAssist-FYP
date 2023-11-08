const InputWithLabel = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  readOnly = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default InputWithLabel;
