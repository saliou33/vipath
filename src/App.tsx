import "./App.css";
import { useReducer } from "react";
import { Context } from "./context/context";
import {
  animationInfosReducer,
  initialAnimationsInfos,
} from "./context/reducers/AnimationInfos";
import Navbar from "./components/Navbar/Navbar";
import Visualizer from "./components/Visualizer/Visualizer";

const App = () => {
  const [animationInfos, dispatchAnimationInfos] = useReducer(
    animationInfosReducer,
    initialAnimationsInfos
  );

  return (
    <Context.Provider value={{ animationInfos, dispatchAnimationInfos }}>
      <div className="font-roboto flex flex-col h-screen">
        <Navbar />
        <Visualizer />
      </div>
    </Context.Provider>
  );
};

export default App;
