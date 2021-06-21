export default function Alert(props) {
  return (
    <div className="py-1 px-1 text-red-700">
      <p>{props.children}</p>
    </div>
  );
}
