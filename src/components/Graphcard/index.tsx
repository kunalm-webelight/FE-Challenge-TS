import React, { useEffect, useRef, useState } from "react";
// ====================highcharts============================
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function Graphcard({ RepoDetails, index, isOpen }: any) {
  // const [data, setFirstData] = useState<number[]>([]);
  interface FirstDataState {
    text: string;
    yAxisText: string;
    seriesName: string;
    data: number[];
    categories: string[];
  }
  const [firstdata, setFirstData] = useState<FirstDataState>(
    {
      text: "",
      yAxisText: "",
      seriesName: "",
      data: [],
      categories: [],
    }
  );

  const [seriesData, setSeriesData] = useState(
    {
      data: [],
      categories: [],
    }
  );
  const { name, login } = RepoDetails || {};
  // const getApiData = async () => {
  //   const url = `https://api.github.com/repos/Chat2DB/Chat2DB/stats/commit_activity`;
  //   const data = await axios.get(url);
  //   const finaldata = data.data;
  //   finaldata.length > 0 &&
  //     finaldata?.map((item: any) => {
  //       arr.push(item?.total);
  //     });
  //   setFirstData([...arr]);
  // };

  const getCommitActivityAPI = async (url: string) => {
    const data = await axios.get(url);
    const finaldata = data.data;
    // console.log(finaldata);
    const arr: number[] = [];
    const week: string[] = [];
    finaldata.length > 0 &&
      finaldata.map((item: any) => {
        arr.push(item.total);
        week.push(new Date(item.week * 1000).toLocaleString());
      });
    setFirstData(prevdata => ({
      ...prevdata,
      data: arr,
      text: "Commits",
      yAxisText: "No Of Commits",
      seriesName: "Commit(s)",
      categories: week
    }));
  }

  const getDeletionsActivityAPI = async (url: string) => { //
    const data = await axios.get(url);
    const finaldata = data.data;
    const arr: number[] = [];
    const week: string[] = [];
    // console.log(finaldata);
    finaldata.length > 0 &&
      finaldata?.map((item: Array<number>) => {
        arr.push(Math.abs(item[2]));
        week.push(new Date(item[0] * 1000).toLocaleString());
      });
    setFirstData(prevdata => ({
      ...prevdata,
      data: arr,
      text: "Deletions",
      yAxisText: "No Of Deletions",
      seriesName: "Deletion(s)",
      categories: week,
    }));
  }
  const getAdditionsActivityAPI = async (url: string) => { //
    const data = await axios.get(url);
    const finaldata = data.data;

    const arr: number[] = [];
    const week: string[] = [];
    // console.log(finaldata);
    finaldata.length > 0 &&
      finaldata?.map((item: Array<number>) => {
        arr.push(item[1]);
        week.push(new Date(item[0] * 1000).toLocaleString());
      });
    setFirstData(prevdata => ({
      ...prevdata,
      data: arr,
      text: "Additions",
      yAxisText: "No Of Additions",
      seriesName: "Addition(s)",
      categories: week,
    }));
  }

  const getContributorsAPI = async (url: string) => { //
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Prepare data for Highcharts
        // x: item.weeks.map((week: any) => new Date(week.w * 1000).toLocaleString()),
        console.log(data);
        // const additionData = data.map((item: any) => (
        //   item.weeks.map((week: any) => week.a)
        // ));
        const additionData = data.map((obj: any) => ({
          name: obj.author.login,
          data: obj.weeks.map((week: any) => week.a)
        }));
        const catergoryData = data.map((obj: any) => (
          // new Date(obj.weeks.w * 1000).toLocaleString()
          obj.weeks.map((multipleweeks: any) => multipleweeks.w)
        ));
        console.log("graph data->", additionData);
        console.log("times ", catergoryData);
        setSeriesData(
          {
            ...seriesData,
            data: additionData,
            categories: catergoryData,
          }
        );
        // console.log(myseriesData);
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
      text: firstdata.text,
    },
    xAxis: {
      categories: firstdata.categories,
      allowDecimals: false,
      accessibility: {
        rangeDescription: "Range: 1 to 52.",
      },
    },
    yAxis: {
      title: {
        text: firstdata.yAxisText,
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y:,.0f}</b> in {point.x}th week",
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
        name: firstdata.seriesName,
        // type: "line",
        data: [...firstdata.data],
      },
    ],
  };

  // const DeleteActivityOptions = {
  //   chart: {
  //     type: "bar",
  //   },
  //   title: {
  //     text: "Deletions Bar chart",
  //   },
  //   xAxis: {
  //     allowDecimals: false,
  //     accessibility: {
  //       rangeDescription: "Range: 1 to 52.",
  //     },
  //   },
  //   yAxis: {
  //     title: {
  //       text: "Deletions",
  //     },
  //   },
  //   tooltip: {
  //     pointFormat: "<b>{point.y:,.0f}</b>Deletions in {point.x}th week",
  //   },
  //   plotOptions: {
  //     area: {
  //       pointStart: 1,
  //       marker: {
  //         enabled: false,
  //         symbol: "circle",
  //         radius: 2,
  //         states: {
  //           hover: {
  //             enabled: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   series: [
  //     {
  //       name: "commit(s)",
  //       // type: "line",
  //       data: [...data],
  //     },
  //   ],
  // };

  const contributorsActivityOptions = {//
    chart: {
      type: "line",
    },
    title: {
      text: 'GitHub Contributions'
    },
    xAxis: {
      categories: seriesData.categories,
      // type: 'datetime',
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
    series: [...seriesData.data]
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