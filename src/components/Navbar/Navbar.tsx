import { useContext, useState } from "react";
import { Context } from "../../context/context";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import {
  ItemType,
  algorithms,
  pointers,
  actions,
  PointerType,
} from "../../utils/contant";
import { Dropdown } from "../Dropdown/Dropdown";
import { ActionList } from "../ActionList/ActionList";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";
import { Guide } from "../Guide/Guide";
import { FaQuestion } from "react-icons/fa";

const Navbar = () => {
  const { dispatchActionInfos, dispatchAnimationInfos } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    return !hasSeenGuide;
  });

  const handleCloseGuide = () => {
    setShowGuide(false);
    localStorage.setItem('hasSeenGuide', 'true');
  };

  const handleSelectAlgo = (item: ItemType | null) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_algo,
      payload: { selectedAlgo: item as ItemType },
    });

    dispatchAnimationInfos({
      type: AnimationInfosActionType.clear,
    });
  };

  const handleSelectPointer = (item: ItemType | null) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_pointer,
      payload: {
        selectedPointer: item
          ? item
          : (pointers.get(PointerType.blank) as ItemType),
      },
    });
  };

  const handleActionClick = (item: ItemType) => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_action,
      payload: { animationAction: item },
    });
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Action buttons - visible in both desktop and mobile */}
            <div className="flex items-center md:space-x-4">
              <ActionList actions={actions} handleClick={handleActionClick} />

            </div>

            {/* Desktop dropdowns */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex gap-4">
                <Dropdown
                  name="Select Algorithm"
                  items={algorithms}
                  handleClick={handleSelectAlgo}
                  selectOpt={true}
                />
                <Dropdown
                  name="Draw Node"
                  items={pointers}
                  handleClick={handleSelectPointer}
                  unselectOpt={true}
                />

                <button
                  onClick={() => setShowGuide(true)}
                  className="flex justify-center items-center px-2 p-1.5 bg-gray-100 hover:text-white hover:bg-gray-400 rounded-md transition-colors"
                  title="Show Guide"
                >
                  <FaQuestion />
                </button>
              </div>

            </div>

            {/* Mobile menu button - only for dropdowns */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - only dropdowns */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex gap-4 items-center py-6 px-3">
              <Dropdown
                name="Select Algorithm"
                items={algorithms}
                handleClick={handleSelectAlgo}
                selectOpt={true}
              />
              <Dropdown
                name="Draw Node"
                items={pointers}
                handleClick={handleSelectPointer}
                unselectOpt={true}
              />

              <button
                onClick={() => setShowGuide(true)}
                className="flex justify-center items-center p-2 bg-gray-100 hover:text-white hover:bg-gray-400 rounded-md transition-colors"
                title="Show Guide"
              >
                <FaQuestion />
              </button>
            </div>
          </div>
        )}
      </nav>

      <Guide isOpen={showGuide} onClose={handleCloseGuide} />
    </>
  );
};

export default Navbar;
