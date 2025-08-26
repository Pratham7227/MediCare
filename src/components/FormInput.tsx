type FormInputProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
};

export default function FormInput({ label, type = 'text', name, value, onChange, error, helperText, required, accept }: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-blue-800 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        accept={accept}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-blue-900 ${error ? 'border-red-400' : 'border-blue-100'}`}
      />
      {helperText && <div className="text-xs text-gray-500 mt-1">{helperText}</div>}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}