import {
  FETCH_REPO,
  FETCH_REPO_FAILURE,
  FETCH_REPO_SUCCESS,
} from "./repoTypes";
import moment from "moment";
import axios from "axios";
import { AppDispatch } from '../repoStore'; // Adjust the path to your store file


export const fetchRepo = () => {
  return {
    type: FETCH_REPO,
  };
};
export const fetchRepoSuccess = (repo: any) => {
  return {
    type: FETCH_REPO_SUCCESS,
    payload: repo,
  };
};
export const fetchRepoFailure = (err: any) => {
  return {
    type: FETCH_REPO_FAILURE,
    payload: err,
  };
};

export const getRepoData = (prevdata:[],page:number) => {
  // dispatch(fetchRepo()); 
  // const today = new Date();
  // const currentDate = moment(today).format("YYYY-MM-DD");
  // const yesterday = moment(currentDate)
  // .subtract(1, "day")
  // .format("YYYY-MM-DD");
  // let url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=0`;
  
  // axios
  // .get(url)
  // .then((res) => {
  //   const jsondata = res.data;
  //   const data = jsondata.items;
  //   dispatch(fetchRepoSuccess([...prevData,...data]))
  //   setrepoData((prevdata)=>[...prevdata,...data]);
  //   setLoading(false);
  //   myFunction(data);
  // })
  // .catch((err) =>{
  //   console.log(err)
  //     dispatch(fetchRepoFailure(err))
  //   } );
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRepo());
    
    const today = new Date();
    const currentDate = moment(today).format("YYYY-MM-DD");
    const yesterday = moment(currentDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    let url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=${page}`;

    try {
      const response = await axios.get(url);
      const data = response.data.items;
      dispatch(fetchRepoSuccess([...prevdata,...data]));
    } catch (error) {
      dispatch(fetchRepoFailure(error));
    }
  };

};