import "./GridNode.css";
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from "react";
import { IconType } from "react-icons";
import { GridNodeType, IGridNode } from "../../utils/interface";
import { BiCool, BiMap, BiDumbbell, BiDollarCircle } from "react-icons/bi";

type PropsType = {
  node: IGridNode;
  isDrawing: boolean;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
};

type NodeUI = {
  icon?: IconType;
  classes?: string;
};

const getNodeUI = (node: IGridNode): NodeUI | null => {
  const o = {
    classes: "grid-node ",
  };

  switch (node.type) {
    case GridNodeType.start:
      return {
        classes: o.classes + "start",
        icon: BiCool,
      };
    case GridNodeType.goal:
      return {
        classes: o.classes + "goal",
        icon: BiMap,
      };
    case GridNodeType.weight:
      return {
        classes: o.classes + "weight",
        icon: BiDumbbell,
      };
    case GridNodeType.bridge:
      return {
        classes: o.classes + "bridge",
        icon: BiDollarCircle,
      };
  }

  return o;
};

const GridNode = ({ node, isDrawing, setIsDrawing }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseDown = () => {};
  const handleMouseUp = () => {};
  const handleMouseEnter = () => {};

  useLayoutEffect(() => {
    const current = ref.current;

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

  const nodeUI = getNodeUI(node);

  return (
    <div ref={ref} className={nodeUI?.classes}>
      {nodeUI?.icon && <nodeUI.icon />}
    </div>
  );
};

export default GridNode;
