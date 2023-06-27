import React, { useEffect, useRef, useState } from "react";
// ====================highcharts============================
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function Graphcard({ RepoDetails, index, isOpen }: any) {
  const [data, setData] = useState<number[]>([]);
  const { name, login } = RepoDetails || {};
  const arr: number[] = [];
  // const getApiData = async () => {
  //   const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/commit_activity`;
  //   const data = await axios.get(url);
  //   const finaldata = data.data;
  //   finaldata.length > 0 &&
  //     finaldata?.map((item: any) => {
  //       arr.push(item?.total);
  //     });
  //   setData([...arr]);
  // };

  const getCommitActivityAPI = async (url: string) => {
    const data = await axios.get(url);
    const finaldata = data.data;
    finaldata.length > 0 &&
      finaldata?.map((item: any) => {
        arr.push(item?.total);
      });
    setData([...arr]);
  };

  const getContributorsAPI = async (url: string) => {
    const data = await axios.get(url);
  };

  useEffect(() => {
    if (index === isOpen?.index) {
      // getApiData();
      if (isOpen.label === "commits") {

        const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/commit_activity`;
        getCommitActivityAPI(url);

      } 
      else if (isOpen.label === "deletions") 
      {
        const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/code_frequency`;
      } 
      else
      {
      }
      const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/contributors`;
      getContributorsAPI(url);
    }
  },[index,isOpen])

  const CommitActivityOptions = {
    chart: {
      type: "area",
    },
    title: {
      text: "My chart",
    },
    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: "Range: 1 to 52.",
      },
    },
    yAxis: {
      title: {
        text: "Commits",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y:,.0f}</b>commits in {point.x}th week",
    },
    plotOptions: {
      area: {
        pointStart: 1,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "commit(s)",
        // type: "line",
        data: [...data],
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={CommitActivityOptions}
      // {...props}
    />
  );
}
