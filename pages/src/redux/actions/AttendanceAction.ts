import {
  errorAction,
  loadingAction,
  successSideEffectState,
  SideEffectSchema,
} from ".";

export const Actions = {
  POST_ATTENDANCE_DETAILS: "POST_ATTENDANCE_DETAILS",
  POST_ATTENDANCE_DETAILS_LOADING: "POST_ATTENDANCE_DETAILS_LOADING",
  POST_ATTENDANCE_DETAILS_ERROR: "POST_ATTENDANCE_DETAILS_ERROR",
  POST_ATTENDANCE_DETAILS_SUCCESS: "POST_ATTENDANCE_DETAILS_SUCCESS",
};

/**
 * Attendance Enquiey
 */
export interface IAttendancePayload {
  emp_id: string;
  month: string; //06
  year: string; //2021
}
export interface IAttendanceEnquiry {
  LDATE: string;
  SWIPE_IN: string;
  SWIPE_OUT: string;
  SHIFT: string;
  DAY_TYPE: string; //Color Coding
  FH: string;
  SH: any | null;
}
export interface IAttendanceList extends SideEffectSchema {
  status_code: string;
  message: string;
  attendance_enquiry_details: IAttendanceEnquiry[];
  week_offs: string[];
  public_holidays: any[];
}

export const postAttendanceAction = (
  access_token: string,
  payload: IAttendancePayload
) => {
  return {
    type: Actions.POST_ATTENDANCE_DETAILS,
    payload: { access_token, payload },
  };
};
export const postAttendanceLoadingAction = () =>
  loadingAction(Actions.POST_ATTENDANCE_DETAILS_LOADING);
export const postAttendanceErrorAction = (error: string) =>
  errorAction(Actions.POST_ATTENDANCE_DETAILS_ERROR, error);
export const postAttendanceSuccessAction = (data: IAttendanceList) => {
  const payload: IAttendanceList = {
    ...data,
    ...successSideEffectState,
  };
  return {
    type: Actions.POST_ATTENDANCE_DETAILS_SUCCESS,
    payload: payload,
  };
};
