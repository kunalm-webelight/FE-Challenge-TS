import {
  FETCH_REPO,
  FETCH_REPO_FAILURE,
  FETCH_REPO_SUCCESS,
} from "./repoTypes";

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
