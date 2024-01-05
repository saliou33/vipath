import { ItemList } from "../../utils/contant";
import "./ActionList.css";

type PropsType = {
  actions: ItemList;
};

const ActionList = ({ actions }: PropsType) => {
  return (
    <div className="flex gap-2">
      {actions.map((item, key) => (
        <button key={key}>
          {item.icon && <item.icon className={`text-[2rem] ${item.class}`} />}
        </button>
      ))}
    </div>
  );
};

export default ActionList;
