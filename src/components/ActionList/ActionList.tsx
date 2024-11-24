import { ItemList, ItemType } from "../../utils/contant";
import Tooltip from "../Tooltip/Tooltip";
import "./ActionList.css";

type PropsType = {
  actions: ItemList;
  handleClick: (item: ItemType) => void;
};

export const ActionList = ({ actions, handleClick }: PropsType) => {
  return (
    <div className="flex gap-2 items-center">
      {actions.map((item, key) => (
        <button
          key={key}
          onClick={() => handleClick(item)}
          className="tooltip-parent flex justify-center items-center bg-gray-700 hover:bg-gray-600 p-2 rounded-lg w-10 h-10 font-bold transition-colors duration-200 shadow-md border border-gray-600 hover:border-gray-500"
        >
          {item.icon && (
            <item.icon 
              className={`${item.styles} text-gray-200 hover:text-white transition-colors duration-200`} 
            />
          )}
          {item?.description && (
            <Tooltip text={item?.description} direction="bottom" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ActionList;
