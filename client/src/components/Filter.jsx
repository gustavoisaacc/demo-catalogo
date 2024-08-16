import { MENULI } from "../utils/navegate";

export default function Filter() {
  return (
    <div>
      <select className=" py-2 px-3 w-full">
        <option value="">All Categories</option>
        {MENULI.map((list, i) => {
          return (
            <option value={list.path} key={i}>
              {list.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
