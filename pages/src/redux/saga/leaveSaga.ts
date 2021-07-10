import { put, call, take, delay } from "redux-saga/effects";
import * as axios from "axios";
import * as actionCreators from "../actions/LeaveActions";
import { httpGet, httpPost } from "../../services";


function* getEmployeeManagerData(payload:{empId:string, access_token:string}) {
  try {
    yield put(actionCreators.getEmployeeManagerLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5001/cet_syncing/get_user_and_manager_details_temp/",{},{empId:payload.empId},config)
    yield put(actionCreators.getEmployeeManagerSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.getEmployeeManagerErrorAction(error.response.data.error));
  }
}

function* getValidTokenData(payload:{empId:string, token:string}) {
  try {
    yield put(actionCreators.postTokenLoadingAction());
    const config={
      headers:{
      Authorization: `${payload.token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5001/cet_syncing/validate_user_token/",{},{empId:payload.empId},config)
    yield getEmployeeManagerData({access_token:data.token.access_token,empId:payload.empId });
    yield postQuotaLeaveData({emp_id: payload.empId, access_token: data.token.access_token});
    yield put(actionCreators.postTokenSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postTokenErrorAction(error.response.data.error));
  }
}

function* postValidLeaveData(payload:{access_token: string, leaveData: actionCreators.ILeaveValidPayload}) {
  try {
    yield put(actionCreators.postValidLeaveLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/validate_leave_request/",{},payload.leaveData,config)
    yield put(actionCreators.postValidLeaveSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postValidLeaveErrorAction(error.response.data.error));
  }
}

function* postApplyLeaveData(payload) { 
  try {
    yield put(actionCreators.postLeaveLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    } 
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/create_leave_request_edp/",{},payload.payload,config)
    yield put(actionCreators.postLeaveSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postLeaveErrorAction(error.response.data.error));
  }
}


function* postQuotaLeaveData(payload:{emp_id:string, access_token:string}) {
  try {
    yield put(actionCreators.postQuotaLeaveLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/get_leave_quota/",{},{emp_id:payload.emp_id},config)
    yield put(actionCreators.postQuotaLeaveSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postQuotaLeaveErrorAction(error.response.data.error));
  }
}
function* postLeaveHistoryData(payload:{access_token:string, payload: actionCreators.ILeaveHistoryPayload }) {
   
  try {
    yield put(actionCreators.postLeaveHistoryLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
 
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/get_leave_requests/",{},payload.payload,config)
    yield put(actionCreators.postLeaveHistorySuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postLeaveHistoryErrorAction(error.response.data.error));
  }
}
function* postLeaveMasterData(payload:{access_token:string, payload: actionCreators.ILeaveHistoryPayload }) {
  try {
    yield put(actionCreators.postLeaveMasterLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/get_leave_requests_master/",{},payload.payload,config)
    yield put(actionCreators.postLeaveMasterSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postLeaveMasterErrorAction(error.response.data.error));
  }
}
function* postLeaveRequestApprovalHistoryData(payload:{access_token:string, payload: actionCreators.ILeaveRequestApprovalHistoryPayLaod }) {
  try {
    yield put(actionCreators.postLeaveRequestApprovalHistoryLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/get_leave_requests_approval/",{},payload.payload,config)
    yield put(actionCreators.postLeaveRequestApprovalHistorySuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postLeaveRequestApprovalHistoryErrorAction(error.response.data.error));
  }
}
//we can reject approve leave request for manager purpose
function* postLeaveRequestApprovalData(payload:{access_token:string, payload: actionCreators.ILeaveRequestApprovalPayLaod }) {
  try {
    yield put(actionCreators.postLeaveRequestApprovalLoadingAction());
    const config={
      headers:{
      Authorization: `Bearer ${payload.access_token}`
      }
    }
    const data= yield httpPost("https://empappqa.tatamotors.com:5002/leave_requests/leave_request_approval/",{},payload.payload,config)
    yield put(actionCreators.postLeaveRequestApprovalSuccessAction(data));
  } catch (error) {
    yield put(actionCreators.postLeaveRequestApprovalErrorAction(error.response.data.error));
  }
}
export  function* watchEmployeeManagerData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.GET_EMPLOYEE_MANAGER_DATA);
  yield call(getEmployeeManagerData, payload);
  }
}
export  function* watchValidTokenData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_VALID_USER_TOKEN);
  yield call(getValidTokenData, payload);
  }
}
export  function* watchValidLeaveData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_VALID_LEAVE);
  yield call(postValidLeaveData, payload);
  }
}
export  function* watchApplyLeaveData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_LEAVE);
  yield call(postApplyLeaveData, payload);
  }
}

export  function* watchQuotaLeaveData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_QUOTA_LEAVE);
  yield call(postQuotaLeaveData, payload);
  }
}
export  function* watchLeaveHistoryData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_LEAVE_HISTORY);
  yield call(postLeaveHistoryData, payload);
  }
}
export  function* watchLeaveMasterData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_LEAVE_MASTER);
  yield call(postLeaveMasterData, payload);
  }
}

export  function* watchLeaveRequestApprovalHistoryData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_LEAVE_APPROVAL_HISTORY);
  yield call(postLeaveRequestApprovalHistoryData, payload);
  }
}

export  function* watchLeaveRequestApprovalData() {
  while(true){
  const {payload}= yield take(actionCreators.Actions.POST_LEAVE_APPROVAL);
  yield call(postLeaveRequestApprovalData, payload);
  }
}

