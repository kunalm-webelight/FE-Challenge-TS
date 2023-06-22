import React from "react";
import "./App.css";
import Counter from "./container/features/main";
import DetailCard from "./components/Detailcard";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';
import { fetchRepo, fetchRepoFailure, fetchRepoSuccess,getRepoData } from './redux/repo/repoActions';
import { AppDispatch } from "./redux/repoStore";
import { createLogicalAnd } from "typescript";

interface DetailCards {
  avatarUrl: string,
  name: string,
  description: string,
  stargazersCount: number,
  openIssuesCount: number,
  pushedAt: string,
  login: string,
}


function App() {
  // const [repoData, setrepoData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const repoDataFromRedux = useSelector((state:any)=> state?.repo);

 
  const finalData = repoDataFromRedux.map((item: any) => {
    return {
    avatarUrl: item.owner.avatar_url,
    name: item.name,
    description: item.description,
    stargazersCount: item.stargazers_count,
    openIssuesCount: item.open_issues_count,
    pushedAt: item.pushed_at,
    login: item.owner.login,
}});


  // const getRepoData = async () => {
  //   dispatch(fetchRepo());
  //   const today = new Date();
  //   const currentDate = moment(today).format("YYYY-MM-DD");
  //   const yesterday = moment(currentDate)
  //     .subtract(1, "day")
  //     .format("YYYY-MM-DD");
  //   let url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=${page}`;
  //   //loading overloaded data from redux, need to handle it
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res,"res")
  //       const jsondata = res.data;
  //       const data = jsondata.items;
  //       dispatch(fetchRepoSuccess(data))
  //       // setrepoData((prevdata)=>[...prevdata,...data]);
  //       // setLoading(false);
  //     })
  //     .catch((err) =>{
  //       console.log(err)
  //       dispatch(fetchRepoFailure(err))
  //     } );
  // };

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
    // getRepoData();
    dispatch(getRepoData(page));
  }, [page]); // first render

  return (
    <div className="App">
      <Counter />

      {finalData?.map((repo: DetailCards) => {
        return <DetailCard RepoDetails={repo} />;
      })}
      {loading&&<h1>Fetching more repos...</h1>}
    </div>
  );
}

export default App;
//enum ,interface  examples
