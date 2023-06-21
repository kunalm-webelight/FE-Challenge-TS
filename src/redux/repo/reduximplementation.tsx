import moment from "moment";
import axios from "axios";
// ===============================================ACTION CONSTANTS===============================================
const FETCH_REPO = "FETCH_REPO";
const FETCH_REPO_SUCCESS = "FETCH_REPO_SUCCESS";
const FETCH_REPO_FAILURE = "FETCH_REPO_FAILURE";
// =====================================================================================================
//================================================ACTIONS======================================
const fetchRepo = () => {
  return {
    type: FETCH_REPO,
  };
};
const fetchRepoSuccess = (repo: any) => {
  return {
    type: FETCH_REPO_SUCCESS,
    payload: repo,
  };
};
const fetchRepoFailure = (err: any) => {
  return {
    type: FETCH_REPO_FAILURE,
    payload: err,
  };
};
// =====================================================================================================
const initialstate = {
  loading: false,
  repo: [],
  error: "",
};
interface ActionType {
  type: string;
  payload: any;
}
// ======================================API CALL===============================================
const getRepoData = async () => {
    // dispatch(fetchRepo())
    const today = new Date();
    const currentDate = moment(today).format("YYYY-MM-DD");
    const yesterday = moment(currentDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    let url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=0`;

    axios.get(url)
      .then((res) => {
        const jsondata = res.data;
        const data = jsondata.items;
        // dispatch(fetchRepoSuccess(data));
      })
      .catch((err)=>{
         console.log(err)
         //dispatch(fetchRepoFailure(err));
        });
  };
// ==============================================================================================
// ===============================================REDUCER FUNCTION===============================
const reducer = (state = initialstate, action: ActionType) => {
  switch (action.type) {
    case FETCH_REPO:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPO_SUCCESS:
      return {
        loading: false,
        repo: action.payload,
        error: "",
      };
    case FETCH_REPO_FAILURE:
      return {
        loading: false,
        repo: [],
        error: action.payload,
      };
  }
};
