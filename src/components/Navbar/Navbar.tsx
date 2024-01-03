import { algorithms } from "../../utils/contant";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  return (
    <div className="py-5 px-2 bg-gray-800 flex">
      <Dropdown name="Select Algorithm" items={algorithms} />
    </div>
  );
};

export default Navbar;
