import { all } from "redux-saga/effects";
import {
  watchEmployeeManagerData,
  watchApplyLeaveData,
  watchValidLeaveData,
  watchValidTokenData,
  watchQuotaLeaveData,
  watchLeaveHistoryData,
  watchLeaveMasterData,
  watchLeaveRequestApprovalHistoryData,
  watchLeaveRequestApprovalData,
} from "./leaveSaga";
import { watchAttendanceData } from "./attendanceSaga";
function* rootSaga() {
  yield all([
    watchEmployeeManagerData(),
    watchApplyLeaveData(),
    watchValidLeaveData(),
    watchValidTokenData(),
    watchQuotaLeaveData(),
    watchLeaveHistoryData(),
    watchLeaveMasterData(),
    watchLeaveRequestApprovalHistoryData(),
    watchLeaveRequestApprovalData(),

    watchAttendanceData(),
  ]);
}
export default rootSaga;
