import { Dispatch, SetStateAction, useLayoutEffect, useRef } from "react";
import { BiCool, BiDollarCircle, BiDumbbell, BiMap } from "react-icons/bi";
import {
  AnimationInfosAction,
  AnimationInfosActionType,
} from "../../context/reducers/AnimationInfos";
import { ItemType } from "../../utils/contant";
import { ArrayGridNode, GridNodeType, IGridNode } from "../../utils/interface";
import "./GridNode.css";

type PropsType = {
  node: IGridNode;
  isDrawing: boolean;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
  pointer: ItemType;
  dispatch: Dispatch<AnimationInfosAction>;
};

const GridNode = ({
  node,
  pointer,
  isDrawing,
  setIsDrawing,
  dispatch,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const updateValues = (values: ArrayGridNode) => {
    dispatch({ type: AnimationInfosActionType.update, payload: values });
  };

  const updateNode = () => {
    const pointerType =
      GridNodeType[pointer.key.toString() as keyof typeof GridNodeType];

    const type = node.type != pointerType ? pointerType : GridNodeType.blank;

    if (type != node.type) {
      updateValues([{ ...node, type }]);
    }
  };

  const handleMouseDown = () => {
    if (!isDrawing) {
      updateNode();
      setIsDrawing(true);
    }
  };
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };
  const handleMouseEnter = () => {
    if (isDrawing) {
      updateNode();
    }
  };

  useLayoutEffect(() => {
    const current = ref.current;

    //make sure that the edge node are immutable
    if (node.type == GridNodeType.end || node.type == GridNodeType.start)
      return () => [];

    if (current) {
      current.addEventListener("mousedown", handleMouseDown);
      current.addEventListener("mouseenter", handleMouseEnter);
      current.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (current) {
        current.removeEventListener("mousedown", handleMouseDown);
        current.removeEventListener("mouseup", handleMouseUp);
        current.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  });

  return (
    <div ref={ref} className={`grid-node ${node.type} ${node.class}`}>
      <span className="z-[700]">
        {node.type == GridNodeType.start ? (
          <BiCool />
        ) : node.type == GridNodeType.weight ? (
          <BiDumbbell />
        ) : node.type == GridNodeType.end ? (
          <BiMap />
        ) : node.type == GridNodeType.bridge ? (
          <BiDollarCircle />
        ) : null}
      </span>
    </div>
  );
};

export default GridNode;
