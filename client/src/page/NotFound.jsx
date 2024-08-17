import { Link } from "react-router-dom";
import notfound from "../assets/not.png";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-300 to-orange-500 text-center p-5">
      <img
        src={notfound}
        alt="Monstruo hambriento"
        className="w-48 h-48 mb-8 animate-bounce"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        ¡404 - Página no encontrada!
      </h1>
      <p className="text-lg md:text-2xl text-white mb-8">
        Parece que este monstruo se ha comido la página que estabas buscando...
      </p>
      <Link
        to="/"
        className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
