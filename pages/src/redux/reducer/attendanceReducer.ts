import { combineReducers } from "redux";
import { Actions, IAttendanceList } from "./../actions/AttendanceAction";

export const postAttendanceReducer = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.POST_ATTENDANCE_DETAILS_LOADING:
    case Actions.POST_ATTENDANCE_DETAILS_ERROR:
    case Actions.POST_ATTENDANCE_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export interface IAttendanceData {
  attendance: IAttendanceList;
}
const attendanceData = combineReducers({
  attendance: postAttendanceReducer,
});
export default attendanceData;
