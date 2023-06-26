import React, { useRef } from "react";
// ====================highcharts============================
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function Graphcard({ RepoDetails }: any) {
  // console.log(RepoDetails)
  const {name,login}=RepoDetails;
  const arr:number[]= [];
  const getApiData = async() => {
    const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/commit_activity`;
    const data = await axios.get(url);
    console.log("data",data.data);
    const finaldata = data.data;
    finaldata.map((item:any)=>{
        console.log("total",item.total);
    });
    // arr.push(data);
    // console.log(arr)
  };
  getApiData();
  const Myoptions = {
    title: {
      text: "My chart",
    },
    series: [
      {
        type: "line",
        data: [3, 1, 7],
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={Myoptions}
      // {...props}
    />
  );
}
