import "./App.css";
import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("info"));
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
