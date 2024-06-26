import React from "react";

interface AddressInputProps {
  placeholder: string;
  label: string;
  required?: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({
  placeholder,
    label,
  required = false,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="peer h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border-gray-300 focus:border-gray-900 focus:outline-none disabled:border-0 disabled:bg-gray-50"
        required={required}
      />
      <label className="absolute left-0 -top-2.5 text-sm font-normal text-gray-500 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-900 peer-focus:after:border-gray-900">
        {label}
      </label>
    </div>
  );
};

const AddressCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-8">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Put your address</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
        <AddressInput placeholder="e.g., Carrera 1 #59-23" label="Street/Carrera and Number (Mandatory)" required />
        <AddressInput placeholder="e.g., Salomia" label="Neighborhood (Mandatory)" required />
        <AddressInput placeholder="e.g., Apt 4B (Optional)"label="Apartment/Unit Number (Optional)" />
        <AddressInput placeholder="Any additional details & indications here" label="Additional Details (Optional)" />
      </form>
    </div>
  );
};

export default AddressCard;
