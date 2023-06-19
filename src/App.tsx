import React from "react";
import "./App.css";
import Counter from "./container/features/main";
import DetailCard from "./components/Detailcard";
function App() {
  return (
    <div className="App">
      <Counter />
      <DetailCard />
    </div>
  );
}

export default App;
