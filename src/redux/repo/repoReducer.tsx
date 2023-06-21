import { FETCH_REPO,FETCH_REPO_FAILURE,FETCH_REPO_SUCCESS } from "./repoTypes";
// =============================INITIAL STATE======================================================
const initialstate = {
    loading: false,
    repo: [],
    error: "",
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
        default: return state;
    }
  };
  
  export default repoReducer