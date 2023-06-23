import {
  FETCH_REPO,
  FETCH_REPO_FAILURE,
  FETCH_REPO_SUCCESS,
  SET_TIME,
} from "./repoTypes";
import moment from "moment";
import axios from "axios";
import { AppDispatch } from "../repoStore";
import { useSelector } from "react-redux";

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
export const setTime = (time: string) => {
  return {
    type: SET_TIME,
    payload: time,
  };
};

export const getRepoData =
  (prevdata: [], page: number, time: string) =>
  async (dispatch: AppDispatch) => {

    // dispatch(setTime());

    dispatch(fetchRepo());

      let url = `https://api.github.com/search/repositories?q=created:>${time}&sort=stars&order=desc&page=${page}`;
      
    try {
      const response = await axios.get(url);
      const data = response.data.items;
      dispatch(fetchRepoSuccess([...prevdata, ...data]));
    } catch (error) {
      dispatch(fetchRepoFailure(error));
    }
  };
