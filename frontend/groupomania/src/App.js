import * as React from "react";
import Inscription from "./Components/Inscription/Inscription";
import AllPost from "./Components/Posts/Posts";
import NewPost from "./Components/Posts/NewPost";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Inscription />
      <NewPost />
      <AllPost />
    </div>
  );
}

export default App;
