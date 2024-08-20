import { useAuth } from "../../context";

export const Button = ({ variant, onClick, className, children }) => {
  const { loading } = useAuth;
  // Definir estilos base y variantes
  const baseStyle =
    "px-4 py-2 rounded font-semibold transition duration-300 ease-in-out focus:outline-none";
  const variantStyles = {
    default: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  // Combinar clases de estilos
  const combinedClassName = `${baseStyle} ${
    variantStyles[variant] || variantStyles.default
  } ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName}>
      {loading ? "cargando..." : children}
    </button>
  );
};
