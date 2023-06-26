import {
  FETCH_REPO,
  FETCH_REPO_FAILURE,
  FETCH_REPO_SUCCESS,
  SET_TIME,
  SET_LOADING,
} from "./repoTypes";
// =============================INITIAL STATE======================================================
const initialstate = {
  loading: false,
  repo: [],
  error: "",
  time: 7,
};
interface ActionType {
  type: string;
  payload: any;
}
// ==================================================================================================

// =============================================== REDUCER ======================================================
const repoReducer = (state = initialstate, action: ActionType) => {
  switch (action.type) {
    case FETCH_REPO:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPO_SUCCESS:
      return {
        ...state,
        loading: false,
        repo: action.payload,
        error: "",
      };
    case FETCH_REPO_FAILURE:
      return {
        ...state,
        loading: false,
        repo: [],
        error: action.payload,
      };
    case SET_TIME:
      return {
        ...state,
        repo:[],
        time: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading:action.payload,
      };
    default:
      return state;
  }
};

export default repoReducer;
