import * as React from "react";
import AllPost from "./Components/Posts/Posts";
import Headers from "./Components/Header/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Headers />
      <AllPost />
    </div>
  );
}

export default App;
