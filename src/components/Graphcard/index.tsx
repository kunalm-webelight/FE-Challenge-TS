import React, { useEffect, useRef, useState } from "react";
// ====================highcharts============================
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function Graphcard({ RepoDetails, index, isOpen }: any) {
  const [data, setData] = useState<number[]>([]);
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>([]);
  const { name, login } = RepoDetails || {};
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
    const arr: number[] = [];
    finaldata.length > 0 &&
      finaldata?.map((item: any) => {
        arr.push(item?.total);
      });
    setData([...arr]);
  };

  const getDeletionsActivityAPI = async (url: string) => { //
    const data = await axios.get(url);
    const finaldata = data.data;
    const arr: number[] = [];
    console.log(finaldata);
    finaldata.length > 0 &&
      finaldata?.map((item: Array<number>) => {
        arr.push(Math.abs(item[2]));
      });
    setData(arr);
  }
  const getAdditionsActivityAPI = async (url: string) => { //
    const data = await axios.get(url);
    const finaldata = data.data;

    const arr: number[] = [];
    console.log(finaldata);
    finaldata.length > 0 &&
      finaldata?.map((item: Array<number>) => {
        arr.push(item[1]);
      });
    setData(arr);
  }

  const getContributorsAPI = async (url: string) => { //
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Prepare data for Highcharts
        const myseriesData = data.map((item: any) => ({
          x: item.weeks.map((week: any) => new Date(week.w * 1000).toLocaleString()),
          y: item.weeks.map((week: any) => week.a),
          name: item.author.login
        }));
        setSeriesData(myseriesData);
        console.log(myseriesData);
        // console.log(new Date(week.w * 1000).toLocaleString());

      });
  };

  useEffect(() => {
    if (index === isOpen?.index) {
      // getApiData();
      if (isOpen.label === "commits") {

        const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/commit_activity`;
        getCommitActivityAPI(url);

      }
      else if (isOpen.label === "deletions") {
        const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/code_frequency`;
        getDeletionsActivityAPI(url);
      }
      else {
        const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/code_frequency`;
        getAdditionsActivityAPI(url);
      }
      const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/contributors`;
      getContributorsAPI(url);
    }
  }, [index, isOpen])

  const CommitActivityOptions = {
    chart: {
      type: "line",
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

  const DeleteActivityOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Deletions Bar chart",
    },
    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: "Range: 1 to 52.",
      },
    },
    yAxis: {
      title: {
        text: "Deletions",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y:,.0f}</b>Deletions in {point.x}th week",
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

  const contributorsActivityOptions = {//
    chart: {
      type: "line",
    },
    title: {
      text: 'GitHub Contributions'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Week'
      }
    },
    yAxis: {
      title: {
        text: 'Contributions'
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    series: [...seriesData]
  }
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={CommitActivityOptions}
      // {...props}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={contributorsActivityOptions}
      />
    </>
  );
}
