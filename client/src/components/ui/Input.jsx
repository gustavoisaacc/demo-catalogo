import { forwardRef } from "react";

const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
  />
));

export default Input;
