import * as React from "react";
import AllPost from "./Components/Posts/Posts";
import CreatePost from "./Components/Posts/NewPost";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CreatePost />
      <AllPost />
    </div>
  );
}

export default App;
