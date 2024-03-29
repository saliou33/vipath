import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/context";

type PropsType = {
  parentRef: RefObject<HTMLDivElement>;
};

const PointerIndicator = ({ parentRef }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    actionInfos: { selectedPointer },
  } = useContext(Context);
  const [show, setShow] = useState(false);
  const [coord, setCoord] = useState<number[]>([0, 0]);

  // style pointer
  useEffect(() => {
    const current = parentRef.current;

    const handleMouseOver = (e: MouseEvent) => {
      if (current?.contains(e.target as Node)) {
        setShow(true);
        setCoord([e.pageX + 20, e.pageY + 20]);
      }
    };
    const handleMouseOut = () => {
      setShow(false);
    };

    if (current) {
      current.addEventListener("mouseover", handleMouseOver);
      current.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      current?.removeEventListener("mouseover", handleMouseOver);
      current?.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    show && (
      <div
        className="absolute z-[9999]"
        ref={ref}
        style={{ left: coord[0] + "px", top: coord[1] + "px" }}
      >
        {selectedPointer?.icon && <selectedPointer.icon />}
      </div>
    )
  );
};

export default PointerIndicator;
