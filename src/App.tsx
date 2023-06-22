import React from "react";
import "./App.css";
import Counter from "./container/features/main";
import DetailCard from "./components/Detailcard";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchRepo,
  fetchRepoFailure,
  fetchRepoSuccess,
  getRepoData,
} from "./redux/repo/repoActions";
import { AppDispatch } from "./redux/repoStore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface DetailCards {
  avatarUrl: string;
  name: string;
  description: string;
  stargazersCount: number;
  openIssuesCount: number;
  pushedAt: string;
  login: string;
}

function App() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const repoDataFromRedux = useSelector((state: any) => state?.repo);
  const [time, setTime] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    console.log("got this",event.target.value)
    setTime(event.target.value);
  };

  const finalData = repoDataFromRedux.map((item: any) => {
    return {
      avatarUrl: item.owner.avatar_url,
      name: item.name,
      description: item.description,
      stargazersCount: item.stargazers_count,
      openIssuesCount: item.open_issues_count,
      pushedAt: item.pushed_at,
      login: item.owner.login,
    };
  });

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
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []); //first render

  useEffect(() => {
    dispatch(getRepoData(repoDataFromRedux, page));
  }, [page]); // first render

  let opvalue;

  return (
    <div className="App">
      {/* <Counter /> */}
      
      <FormControl sx={{m:1,minWidth:80}}>
        <InputLabel id="demo-simple-select-label">Last</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Last"
          value={time}
          onChange={handleChange}
        >
          <MenuItem value="1 week">1 Week</MenuItem>
          <MenuItem value="2 weeks">2 Weeks</MenuItem>
          <MenuItem value="1 month">1 Month</MenuItem>
        </Select>
      </FormControl>

      {finalData?.map((repo: DetailCards) => {
        return <DetailCard RepoDetails={repo} />;
      })}
      {loading && <h1>Fetching more repos...</h1>}
    </div>
  );
}

export default App;
