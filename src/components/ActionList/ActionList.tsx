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
        <button key={key} onClick={() => handleClick(item)}>
          {item.icon && <item.icon className={`${item.class}`} />}
        </button>
      ))}
    </div>
  );
};

export default ActionList;
