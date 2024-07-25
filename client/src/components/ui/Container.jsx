export default function Container({ children }) {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      {children}
    </div>
  );
}
