export default function InputField(props) {
  return (
    <div className="flex mt-4">
      <div className="md:w-full">
        <input
          className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-200"
          type="text"
          placeholder="Title"
        />
      </div>
    </div>
  );
}
