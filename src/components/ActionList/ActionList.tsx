import { ItemList, ItemType } from "../../utils/contant";
import "./ActionList.css";

type PropsType = {
  actions: ItemList;
  handleClick: (item: ItemType) => void;
};

const ActionList = ({ actions, handleClick }: PropsType) => {
  return (
    <div className="flex gap-2">
      {actions.map((item, key) => (
        <button
          key={key}
          onClick={() => handleClick(item)}
          className="flex justify-center items-center bg-slate-100 p-1 rounded-full w-10 h-10 font-bold hover:bg-slate-300 shadow-lg border border-slate-500"
        >
          {item.icon && <item.icon className={`${item.class}`} />}
        </button>
      ))}
    </div>
  );
};

export default ActionList;
