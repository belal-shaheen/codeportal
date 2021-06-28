export default function InputField({ name, label, placeholder = "" }) {
  return (
    <div className="flex mt-4">
      <div className="md:w-full">
        <label className="font-bold mx-1">{label}</label>
        <input
          className="bg-white-200 appearance-none border-4 mt-1 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-200"
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
