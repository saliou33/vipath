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

export const Dropdown = ({
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
      handleClick?.(item);
    } else if (unselectOpt) {
      setSelected(null);
      handleClick?.(null);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md px-4 py-2 bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="mr-2">{selected?.name || name}</span>
          {isOpen ? (
            <BiChevronUp className="h-5 w-5 bg-gray-100" />
          ) : (
            <BiChevronDown className="h-5 w-5 bg-gray-100" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {Array.from(items.values()).map((item, index) => (
              <button
                key={index}
                className={`${
                  selected === item
                    ? "bg-gray-600 text-white"
                    : "text-gray-200 hover:bg-gray-600 hover:text-white"
                } group flex items-center w-full px-4 py-2 text-sm transition-colors duration-200`}
                role="menuitem"
                tabIndex={-1}
                onClick={() => handleSelect(item)}
              >
                {item.icon && (
                  <item.icon className="bg-white" />
                )}
                <span className="px-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
