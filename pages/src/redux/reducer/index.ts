import { combineReducers, Action } from "redux";
import leaveData,{ILeaveData} from "./leaveReducer"
import attendanceData,{IAttendanceData} from "./attendanceReducer"

// Default reducer

function defaultReducer(state = {}, _action: any) {
    return state;
  }
export interface RootSchema {
    default: {};
    leaveData: ILeaveData;
    attendanceData:IAttendanceData;
  }

const rootReducer = combineReducers({
    default: defaultReducer,
    leaveData:leaveData,
    attendanceData: attendanceData
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;