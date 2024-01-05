import { Dispatch, SetStateAction, useLayoutEffect, useRef } from "react";
import { BiCool, BiDollarCircle, BiDumbbell, BiMap } from "react-icons/bi";
import {
  AnimationInfosAction,
  AnimationInfosActionType,
} from "../../context/reducers/AnimationInfos";
import { ItemType } from "../../utils/contant";
import {
  CoordType,
  GridNodeIndexedArrayType,
  GridNodeType,
  IGridNode,
} from "../../utils/interface";
import "./GridNode.css";

type PropsType = {
  node: IGridNode;
  coord: CoordType;
  isDrawing: boolean;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
  pointer: ItemType;
  dispatch: Dispatch<AnimationInfosAction>;
};

const GridNode = ({
  node,
  coord,
  pointer,
  isDrawing,
  setIsDrawing,
  dispatch,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const updateValues = (values: GridNodeIndexedArrayType) => {
    dispatch({ type: AnimationInfosActionType.update, payload: values });
  };

  const updateNode = () => {
    const pointerType =
      GridNodeType[pointer.key.toString() as keyof typeof GridNodeType];

    const type = node.type != pointerType ? pointerType : GridNodeType.blank;

    if (type != node.type) {
      updateValues([
        {
          index: coord,
          node: {
            ...node,
            type,
          },
        },
      ]);
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
    <div ref={ref} className={`grid-node ${node.type}`}>
      {node.type == GridNodeType.start ? (
        <BiCool />
      ) : node.type == GridNodeType.weight ? (
        <BiDumbbell />
      ) : node.type == GridNodeType.goal ? (
        <BiMap />
      ) : node.type == GridNodeType.bridge ? (
        <BiDollarCircle />
      ) : null}
    </div>
  );
};

export default GridNode;
