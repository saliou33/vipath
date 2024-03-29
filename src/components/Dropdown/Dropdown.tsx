import { useEffect, useRef, useState } from "react";
import { ItemList, ItemType } from "../../utils/contant";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type PropsType = {
  name: string;
  items: ItemList;
  selectOpt?: boolean;
  unselectOpt?: boolean;
  handleClick?: (item: ItemType | null) => void;
};

const Dropdown = ({
  name,
  items,
  selectOpt,
  unselectOpt,
  handleClick,
}: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ItemType | null>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  if (selectOpt && !selected) {
    if (items.size > 0) {
      setSelected(items.values().next().value);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: ItemType) => {
    if (selected != item) {
      setSelected(item);
      return handleClick && handleClick(item);
    } else if (unselectOpt) {
      setSelected(null);
      return handleClick && handleClick(null);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 bg-slate-100 rounded-sm"
      >
        <span>{name}</span>
        {isOpen ? <BiChevronUp /> : <BiChevronDown />}
      </button>

      {isOpen && (
        <ul className="absolute z-[300] rounded-sm bg-slate-300 bg-opacity-90 flex flex-col translate-y-2 min-w-fit max-w-24 w-full">
          {items.map((item, key) => (
            <li
              key={key}
              onClick={() => handleSelect(item)}
              className={`flex items-center gap-2 cursor-pointer px-2 hover:bg-slate-400 ${
                selected?.key == item.key && "bg-slate-500 text-white"
              }`}
            >
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
