import {Actions, IToken, IEmployeeManager, ILeaveValidate, ILeave, ILeaveQuota, ILeaveHistoryList, IMasterList, ILeaveRequestApprovalHistoryList, ILeaveRequestApprovalList} from "../actions/LeaveActions"
import { combineReducers } from "redux";

export  const getEmployeeManagerReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.GET_EMPLOYEE_MANAGER_DATA_LOADING:
    case Actions.GET_EMPLOYEE_MANAGER_DATA_ERROR:
    case Actions.GET_EMPLOYEE_MANAGER_DATA_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postValidTokenReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_VALID_USER_TOKEN_LOADING:
    case Actions.POST_VALID_USER_TOKEN_ERROR:
    case Actions.POST_VALID_USER_TOKEN_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postValidLeaveReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_VALID_LEAVE_LOADING:
    case Actions.POST_VALID_LEAVE_ERROR:
    case Actions.POST_VALID_LEAVE_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postLeaveReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_LEAVE_LOADING:
    case Actions.POST_LEAVE_ERROR:
    case Actions.POST_LEAVE_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}

export  const postQuotaLeaveReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_QUOTA_LEAVE_LOADING:
    case Actions.POST_QUOTA_LEAVE_ERROR:
    case Actions.POST_QUOTA_LEAVE_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postLeaveHistoryReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_LEAVE_HISTORY_LOADING:
    case Actions.POST_LEAVE_HISTORY_ERROR:
    case Actions.POST_LEAVE_HISTORY_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postLeaveMasterReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_LEAVE_MASTER_LOADING:
    case Actions.POST_LEAVE_MASTER_ERROR:
    case Actions.POST_LEAVE_MASTER_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postLeaveApprovalHistoryReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_LEAVE_APPROVAL_HISTORY_LOADING:
    case Actions.POST_LEAVE_APPROVAL_HISTORY_ERROR:
    case Actions.POST_LEAVE_APPROVAL_HISTORY_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export  const postLeaveApprovalReducer=(
  state={},
  action: any
)=> {
  switch (action.type) {
    case Actions.POST_LEAVE_APPROVAL_LOADING:
    case Actions.POST_LEAVE_APPROVAL_ERROR:
    case Actions.POST_LEAVE_APPROVAL_SUCCESS:
    return {
        ...state,
        ...action.payload
    };
    default:
     return state;
  }
}
export interface ILeaveData{
    employeeManager: IEmployeeManager,
    tokenData: IToken,
    vaildLeave: ILeaveValidate,
    applyLeave:ILeave,
    leaveQuota: ILeaveQuota,
    leaveHistory: ILeaveHistoryList,
    leaveMaster: IMasterList,
    leaveApprovalHistory: ILeaveRequestApprovalHistoryList,
    leaveApproval: ILeaveRequestApprovalList
  }
  const leaveData = combineReducers({
    employeeManager: getEmployeeManagerReducer,
    tokenData: postValidTokenReducer,
    vaildLeave:postValidLeaveReducer,
    applyLeave:postLeaveReducer,
    leaveQuota: postQuotaLeaveReducer,
    leaveHistory:postLeaveHistoryReducer,
    leaveMaster: postLeaveMasterReducer,
    leaveApprovalHistory:postLeaveApprovalHistoryReducer,
    leaveApproval:postLeaveApprovalReducer
  });
export default leaveData;