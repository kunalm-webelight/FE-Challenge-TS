import React from "react";
import "./App.css";
import Counter from "./container/features/main";
import DetailCard from "./components/Detailcard";
const user={
  repoName:"DemoRepo",
  repoDesc:"This demo repo does Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed laboriosam aspernatur consequatur minima, at illo quae quisquam! Accusantium numquam voluptatum, voluptates blanditiis minus, quam earum voluptas illum, dolore labore magni!",
  noStars:"5",
  noIssues:"0",
  pushTime:"12:01AM",
  ownerName:"narutoUzumaki"
};
const test = "dusgfyfgyu"
function App() {
  return (
    <div className="App">
      <Counter />
      <DetailCard RepoDetails={user}/>
    </div>
  );
}

export default App;
//enum ,interface  examples  