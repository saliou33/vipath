import "./Tooltip.css";

type PropsType = {
  text: string;
  direction: string;
};

const Tooltip = ({ text, direction }: PropsType) => {
  return <div className={`tooltip tooltip-${direction}`}>{text}</div>;
};

export default Tooltip;
