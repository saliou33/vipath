import "./App.css";
import { useReducer } from "react";
import { Context } from "./context/context";
import {
  animationInfosReducer,
  initialAnimationsInfos,
} from "./context/reducers/AnimationInfos";
import Navbar from "./components/Navbar/Navbar";
import Visualizer from "./components/Visualizer/Visualizer";
import {
  actionInfosReducer,
  initialActionInfos,
} from "./context/reducers/ActionInfos";

const App = () => {
  const [animationInfos, dispatchAnimationInfos] = useReducer(
    animationInfosReducer,
    initialAnimationsInfos
  );

  const [actionInfos, dispatchActionInfos] = useReducer(
    actionInfosReducer,
    initialActionInfos
  );

  return (
    <Context.Provider
      value={{
        animationInfos,
        dispatchAnimationInfos,
        actionInfos,
        dispatchActionInfos,
      }}
    >
      <div className="font-lora text-[.8rem] flex flex-col h-screen">
        <Navbar />
        <Visualizer />
      </div>
    </Context.Provider>
  );
};

export default App;
