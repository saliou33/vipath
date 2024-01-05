import { useContext } from "react";
import { Context } from "../../context/context";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import { ItemType, algorithms, pointers, actions } from "../../utils/contant";
import Dropdown from "../Dropdown/Dropdown";
import ActionList from "../ActionList/ActionList";

const Navbar = () => {
  const { dispatchActionInfos } = useContext(Context);

  const handleSelectAlgo = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.select_algo,
      payload: { selectedAlgo: item },
    });
  };

  const handleSelectPointer = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.select_pointer,
      payload: { selectedPointer: item },
    });
  };

  return (
    <div className="p-4 bg-gray-800 flex justify-between">
      <ActionList actions={actions} />
      <div className="flex gap-4">
        <Dropdown
          name="Select Algorithm"
          items={algorithms}
          handleClick={handleSelectAlgo}
        />
        <Dropdown
          name="Draw Node"
          items={pointers}
          handleClick={handleSelectPointer}
        />
      </div>
    </div>
  );
};

export default Navbar;
