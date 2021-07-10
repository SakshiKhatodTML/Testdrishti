import { put, call, take, delay } from "redux-saga/effects";
import * as axios from "axios";
import * as actionCreators from "../actions/AttendanceAction";
import { httpGet, httpPost } from "../../services";

function* postAttendanceData(payload: {
  access_token: string;
  payload: actionCreators.IAttendancePayload;
}) {
  console.log(payload.access_token);

  try {
    yield put(actionCreators.postAttendanceLoadingAction());
    const config = {
      headers: {
        Authorization: `Bearer ${payload.access_token}`,
      },
    };
    const data = yield httpPost(
      "https://empappqa.tatamotors.com:5002/leave_requests/get_attendance_enquiry/",
      {},
      payload.payload,
      config
    );
    yield put(actionCreators.postAttendanceSuccessAction(data));
  } catch (error) {
    yield put(
      actionCreators.postAttendanceErrorAction(error.response.data.error)
    );
  }
}

export function* watchAttendanceData() {
  while (true) {
    const { payload } = yield take(
      actionCreators.Actions.POST_ATTENDANCE_DETAILS
    );
    yield call(postAttendanceData, payload);
  }
}
