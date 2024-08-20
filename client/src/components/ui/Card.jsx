export default function Card({ children }) {
  return (
    <div className="bg-white w-[90%] round-mdmx-auto md:w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
      {children}
    </div>
  );
}
