export default function MessageError({ props }) {
  return (
    <p className="mt-2 bg-red-300 text-white p-2 rounded-sm">
      {props}{" "}
      <span role="img" aria-label="sad face">
        ��
      </span>
    </p>
  );
}
