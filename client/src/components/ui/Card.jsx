import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-white p-2 w-[40%] round-mdmx-auto w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
      {children}
    </div>
  );
}
