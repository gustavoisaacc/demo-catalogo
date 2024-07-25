export default function Button({ children }) {
  return (
    <button className="w-full px-4 py-2 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600">
      {children}
    </button>
  );
}
