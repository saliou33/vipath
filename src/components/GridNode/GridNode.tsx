import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  AnimationInfosAction,
  AnimationInfosActionType,
} from "../../context/reducers/AnimationInfos";

import { ItemType, NodeIconMap } from "../../utils/contant";

import {
  AnimationState,
  GridNodeType,
  IAnimationNode,
  IGridNode,
} from "../../utils/interface";

import "./GridNode.css";

type PropsType = {
  node: IGridNode;
  state: AnimationState;
  speed: number;
  animation: IAnimationNode;
  pointer: ItemType;
  isDrawing: boolean;
  pausedStep: number;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
  setPausedStep: Dispatch<SetStateAction<number>>;
  dispatch: Dispatch<AnimationInfosAction>;
};

const NODE_PLAY_CLASSES = "play node";
const PATH_PLAY_CLASSES = "play path";

const GridNode = ({
  node,
  animation,
  pointer,
  isDrawing,
  setIsDrawing,
  dispatch,
  pausedStep,
  setPausedStep,
  speed,
  state,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const [classes, setClasses] = useState("");
  const [timeouts] = useState<Array<number>>([]);
  const Icon = NodeIconMap[node.type];

  const updateValues = (values: Array<IGridNode>) => {
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

  useLayoutEffect(() => {
    const current = ref.current;

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

  // if no animation  clear timeouts
  const clearTimeouts = () => {
    while (timeouts.length > 0) {
      clearTimeout(timeouts.shift());
    }
  };

  const clear = () => {
    clearTimeouts();
    if (classes) {
      setClasses("");
    }
  };

  const pause = () => {
    if (timeouts.length > 0) {
      clearTimeouts();
      if (classes) {
        setPausedStep((step) =>
          animation.step > step ? animation.step : step
        );
      }
    }
  };

  const updateClasses = (classes: string) => {
    setClasses(classes);
    clearTimeout(timeouts.shift());
  };

  const animateStep = (classes: string, step: number) => {
    timeouts.push(
      setTimeout(() => {
        updateClasses(classes);
      }, speed * 25 * (step - pausedStep))
    );
  };

  const animate = () => {
    if (animation.step > 0) {
      if (!classes) {
        animateStep(NODE_PLAY_CLASSES, animation.step);
      }

      if (animation.inPath && animation.pathStep) {
        animateStep(PATH_PLAY_CLASSES, animation.pathStep);
      }
    }
  };

  switch (state) {
    case AnimationState.none:
      clear();
      break;
    case AnimationState.paused:
      pause();
      break;
    case AnimationState.played:
      animate();
      break;
  }

  return (
    <div ref={ref} className={`grid-node ${node.type} ${classes}`}>
      <span className="z-[700]">{Icon ? <Icon /> : null}</span>
    </div>
  );
};

export default GridNode;
