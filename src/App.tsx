import React, { Fragment } from "react";
import "./App.css";
import DetailCard from "./components/Detailcard";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRepoData, setTime } from "./redux/repo/repoActions";
import { AppDispatch } from "./redux/repoStore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

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
  const timeFromRedux = useSelector((state: any) => state?.time);

  const fromDate = moment()
    .subtract(timeFromRedux, "days")
    .format("YYYY-MM-DD");
  console.log(fromDate,"fromDate")

  const toDate = moment()
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  console.log(toDate,"toDate")

  const handleChange = (event: SelectChangeEvent) => {
    const time = event.target.value;
    dispatch(setTime(time))
    console.log(repoDataFromRedux)
    setPage(0);
    dispatch(getRepoData([], 0, fromDate,toDate));
  };

  const finalData = repoDataFromRedux?.map((item: any) => {
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
  }, []); 

  useEffect(() => {
    dispatch(getRepoData(repoDataFromRedux, page, fromDate,toDate));
  }, [page]); 

  useEffect(() => {
    dispatch(getRepoData(repoDataFromRedux, page, fromDate,toDate));
  }, [timeFromRedux]); 


  return (
    <div className="App">
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Last</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Last"
          value={timeFromRedux}
          onChange={handleChange}
        >
          <MenuItem value={7}>1 Week</MenuItem>
          <MenuItem value={14}>2 Weeks</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
        </Select>
      </FormControl>

      {finalData?.map((repo: DetailCards, index: number) => {
        console.log("finalData",finalData)
        return (
          <Fragment key={index}>
            <DetailCard RepoDetails={repo} />;
          </Fragment>
        );
      })}
      {loading && <h1>Fetching more repos...</h1>}
    </div>
  );
}

export default App;
