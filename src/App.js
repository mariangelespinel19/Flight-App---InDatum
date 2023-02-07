import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./components/Home";

// the Home component was imported from the components folder to be exported to the localHost3000 port
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
