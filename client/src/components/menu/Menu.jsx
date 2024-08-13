import { Link } from "react-router-dom";
import { ROUTES_PRIVATE, ROUTES_PUBLIC } from "../../utils/navegate";
import { useAuth } from "../../context";
import { useState } from "react";

import "./menu.css";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, signout } = useAuth();

  return (
    <nav className="nadvar text-white p-5 m-auto w-[95%]">
      <div className="nav-logo">coode</div>
      <div className={`nav-item ${isOpen && "open"} flex gap-5 `}>
        {!isAuth ? (
          <div className="flex">
            {ROUTES_PUBLIC.map((item) => {
              return (
                <>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={item.path}
                    key={item.name}
                  >
                    {item.name}
                  </Link>
                </>
              );
            })}
          </div>
        ) : (
          <div className={`nav-item ${isOpen && "open"} flex gap-5 `}>
            {ROUTES_PRIVATE.map((item) => {
              return (
                <div key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </div>
              );
            })}
            <button onClick={() => signout()}>logout</button>
          </div>
        )}
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen((state) => !state)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
