import { useContext, useEffect } from "react";
import { ItemType, algorithms, pointers } from "../../utils/contant";
import Dropdown from "../Dropdown/Dropdown";
import { Context } from "../../context/context";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";

const Navbar = () => {
  const { actionInfos, dispatchActionInfos } = useContext(Context);

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

  useEffect(() => {
    console.log(actionInfos);
  }, [actionInfos]);

  return (
    <div className="py-4 px-2 bg-gray-800 flex gap-4">
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
  );
};

export default Navbar;
