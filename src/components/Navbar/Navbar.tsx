import { useContext } from "react";
import { Context } from "../../context/context";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import { ItemType, algorithms, pointers, actions } from "../../utils/contant";
import Dropdown from "../Dropdown/Dropdown";
import ActionList from "../ActionList/ActionList";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";

const Navbar = () => {
  const { dispatchActionInfos, dispatchAnimationInfos } = useContext(Context);

  const handleSelectAlgo = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_algo,
      payload: { selectedAlgo: item },
    });

    dispatchAnimationInfos({
      type: AnimationInfosActionType.clear,
    });
  };

  const handleSelectPointer = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_pointer,
      payload: { selectedPointer: item },
    });
  };

  const handleActionClick = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_action,
      payload: { animationAction: item },
    });
  };

  return (
    <div className="p-4 bg-gray-800 flex justify-between">
      <ActionList actions={actions} handleClick={handleActionClick} />
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
