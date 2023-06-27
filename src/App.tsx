import React, { Fragment, useRef } from "react";
import "./App.css";
import DetailCard from "./components/Detailcard";
import Graphcard from "./components/Graphcard";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRepoData, setTime, setLoading } from "./redux/repo/repoActions";
//=====================dropdown imports====================
import { AppDispatch } from "./redux/repoStore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// =====================Moment=============================
import moment from "moment";
//=====================accordion imports====================
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
interface DetailCards {
  avatarUrl: string;
  name: string;
  description: string;
  stargazersCount: number;
  openIssuesCount: number;
  pushedAt: string;
  login: string;
  id: number;
}
interface ApiItemType {
  owner: { avatar_url: string; login: string };
  stargazers_count: number;
  name: string;
  description: string;
  open_issues_count: number;
  pushed_at: string;
  id: number;
}
interface StateType {
  loading: boolean;
  repo: [];
  error: string;
  time: number;
}

function App() {
  const [page, setPage] = useState(0);
  const [isOpen,setIsOpen] = useState<any>({
    index: null,
    label:"",
  });
  const loading = useSelector((state: StateType) => state?.loading);
  const dispatch: AppDispatch = useDispatch();
  const repoDataFromRedux = useSelector((state: StateType) => state?.repo);
  const timeFromRedux = useSelector((state: StateType) => state?.time);

  const getDate = (days: number) => {
    let date;
    if (days === 1) {
      date = moment().subtract(days, "day").format("YYYY-MM-DD");
    } else {
      date = moment().subtract(days, "days").format("YYYY-MM-DD");
    }
    return date;
  };
  const fromDate = getDate(timeFromRedux);

  const toDate = getDate(1);

  const handleChange = (event: SelectChangeEvent) => {
    const time = event.target.value;
    dispatch(setTime(time));
    setPage(0);
    const from_Date = getDate(parseInt(time));
    dispatch(getRepoData([], 0, from_Date, toDate));
  };
  const handleAccordionClick = (indexrec: number,lablerec:string)=>{
    setIsOpen({index:indexrec,label:lablerec});
    console.log(indexrec,lablerec);
  }
  const finalData = repoDataFromRedux?.map((item: ApiItemType) => {
    return {
      avatarUrl: item.owner.avatar_url,
      name: item.name,
      description: item.description,
      stargazersCount: item.stargazers_count,
      openIssuesCount: item.open_issues_count,
      pushedAt: item.pushed_at,
      login: item.owner.login,
      id: item.id,
    };
  });

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        dispatch(setLoading(true));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    dispatch(getRepoData(repoDataFromRedux, page, fromDate, toDate));
  }, [page]);

  return (
    <div className="App">
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Last</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Last"
          value={timeFromRedux.toString()}
          onChange={handleChange}
        >
          <MenuItem value={7}>1 Week</MenuItem>
          <MenuItem value={14}>2 Weeks</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
        </Select>
      </FormControl>

      {finalData?.map((repo: DetailCards,index :number) => {
        return (
          <Fragment key={repo.id}>
            {/* onClick={()=>{handleAccordionClick(index,"")}} */}
            <Accordion >
              <AccordionSummary
                expandIcon={
                <ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <DetailCard RepoDetails={repo} />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{gap:2, display:"flex"}}>  
                  <Typography onClick={()=>{handleAccordionClick(index,"commits")}}>Commits</Typography>
                  <Typography onClick={()=>{handleAccordionClick(index,"deletions")}}>Deletions</Typography>
                  <Typography onClick={()=>{handleAccordionClick(index,"additions")}}>Additions</Typography>
                </Box>

              <Graphcard RepoDetails={repo} index={index} isOpen={isOpen}/>
              </AccordionDetails>
            </Accordion>
          </Fragment>
        );
      })}
      {loading && <h1>Fetching more repos...</h1>}
    </div>
  );
}

export default App;
