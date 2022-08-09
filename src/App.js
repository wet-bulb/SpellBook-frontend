import React from "react";
import { useState } from "react";
import VEditor from "./Components/VEditor";
import ViewPost from "./Components/ViewPost";
import Feed from "./Components/Feed";
import SignIn from "./Components/SignIn";
import "./App.css";
// import "./Styles/8.bit-blue.css";

// function useForceUpdate() {
//   const [value, setValue] = useState(0);
//   return () => setValue((value) => value + 1);
// }

const App = () => {
  const [value, setValue] = useState(0);
  const [wizard, setWizard] = useState(null);

  const forceUpdate = () => {
    setValue((value) => value + 1);
  };
  if (!wizard) {
    return <SignIn setWizard={setWizard} />;
  }
  return (
    <div className="speak">
      <VEditor key={value} update={forceUpdate} wizard={wizard} />
      <Feed updateDependency={value} />
    </div>
  );
};

export default App;
