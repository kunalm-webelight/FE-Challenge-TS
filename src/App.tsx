import React from "react";
import "./App.css";
import Counter from "./container/features/main";
import DetailCard from "./components/Detailcard";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
function App() {
  const [repoData, setrepoData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRepoData = async () => {
    const today = new Date();
    const currentDate = moment(today).format("YYYY-MM-DD");
    const yesterday = moment(currentDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    let url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=${page}`;

    axios
      .get(url)
      .then((res) => {
        const jsondata = res.data;
        const data = jsondata.items;
        setrepoData((prevdata)=>[...prevdata,...data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleInfiniteScroll = async () => {
    try {
      if((window.innerHeight+document.documentElement.scrollTop + 1)>=document.documentElement.scrollHeight){
        setLoading(true);
        setPage((prev)=>prev+1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return()=>window.removeEventListener("scroll",handleInfiniteScroll);
  }, []); //first render

  useEffect(() => {
    getRepoData();
  }, [page]); // first render

  return (
    <div className="App">
      <Counter />

      {repoData?.map((repo) => {
        return <DetailCard RepoDetails={repo} />;
      })}
      {loading&&<h1>Fetching more repos...</h1>}
    </div>
  );
}

export default App;
//enum ,interface  examples
