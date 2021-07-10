import { errorAction, loadingAction, successSideEffectState, SideEffectSchema } from ".";


export const Actions = {
    // -------------------------Leave Request---------------------------
    // User Validate Token
    POST_VALID_USER_TOKEN: "POST_VALID_USER_TOKEN",
    POST_VALID_USER_TOKEN_LOADING: "POST_VALID_USER_TOKEN_LOADING",
    POST_VALID_USER_TOKEN_ERROR: "POST_VALID_USER_TOKEN_ERROR",
    POST_VALID_USER_TOKEN_SUCCESS: "POST_VALID_USER_TOKEN_SUCCESS",

    GET_EMPLOYEE_MANAGER_DATA: "GET_EMPLOYEE_MANAGER_DATA",
    GET_EMPLOYEE_MANAGER_DATA_ERROR: "GET_EMPLOYEE_MANAGER_DATA_ERROR",
    GET_EMPLOYEE_MANAGER_DATA_LOADING: "GET_EMPLOYEE_MANAGER_DATA_LOADING",
    GET_EMPLOYEE_MANAGER_DATA_SUCCESS: "GET_EMPLOYEE_MANAGER_DATA_SUCCESS",
    // Validate Leave
    POST_VALID_LEAVE: "POST_VALID_LEAVE",
    POST_VALID_LEAVE_LOADING: "POST_VALID_LEAVE_LOADING",
    POST_VALID_LEAVE_ERROR: "POST_VALID_LEAVE_ERROR",
    POST_VALID_LEAVE_SUCCESS: "POST_VALID_LEAVE_SUCCESS",
    // Apply Leave
    POST_LEAVE: "POST_LEAVE",
    POST_LEAVE_LOADING: "POST_LEAVE_LOADING",
    POST_LEAVE_ERROR: "POST_LEAVE_ERROR",
    POST_LEAVE_SUCCESS: "POST_LEAVE_SUCCESS",
    // Leave Quota
    POST_QUOTA_LEAVE:"POST_QUOTA_LEAVE",
    POST_QUOTA_LEAVE_LOADING:"POST_QUOTA_LEAVE_LOADING",
    POST_QUOTA_LEAVE_ERROR:"POST_QUOTA_LEAVE_ERROR",
    POST_QUOTA_LEAVE_SUCCESS:"POST_QUOTA_LEAVE_SUCCESS",
    // Leave History
    POST_LEAVE_HISTORY:"POST_LEAVE_HISTORY",
    POST_LEAVE_HISTORY_LOADING:"POST_LEAVE_HISTORY_LOADING",
    POST_LEAVE_HISTORY_ERROR:"POST_LEAVE_HISTORY_ERROR",
    POST_LEAVE_HISTORY_SUCCESS:"POST_LEAVE_HISTORY_SUCCESS",
    // Master Data
    POST_LEAVE_MASTER:"POST_LEAVE_MASTER",
    POST_LEAVE_MASTER_LOADING:"POST_LEAVE_MASTER_LOADING",
    POST_LEAVE_MASTER_ERROR:"POST_LEAVE_MASTER_ERROR",
    POST_LEAVE_MASTER_SUCCESS:"POST_LEAVE_MASTER_SUCCESS",

    // -------------------------Leave Approval--------------------------- 
    // Leave Approval History
    POST_LEAVE_APPROVAL_HISTORY:"POST_LEAVE_APPROVAL_HISTORY",
    POST_LEAVE_APPROVAL_HISTORY_LOADING:"POST_LEAVE_APPROVAL_HISTORY_LOADING",
    POST_LEAVE_APPROVAL_HISTORY_ERROR:"POST_LEAVE_APPROVAL_HISTORY_ERROR",
    POST_LEAVE_APPROVAL_HISTORY_SUCCESS:"POST_LEAVE_APPROVAL_HISTORY_SUCCESS",
    // Leave Approval
    POST_LEAVE_APPROVAL:"POST_LEAVE_APPROVAL",
    POST_LEAVE_APPROVAL_LOADING:"POST_LEAVE_APPROVAL_LOADING",
    POST_LEAVE_APPROVAL_ERROR:"POST_LEAVE_APPROVAL_ERROR",
    POST_LEAVE_APPROVAL_SUCCESS:"POST_LEAVE_APPROVAL_SUCCESS",
    //---------------------------Service Avalability------------------------
    POST_LEAVE_NOTIFICATION:"POST_LEAVE_NOTIFICATION",
    POST_LEAVE_NOTIFICATION_LOADING:"POST_LEAVE_NOTIFICATION_LOADING",
    POST_LEAVE_NOTIFICATION_ERROR:"POST_LEAVE_NOTIFICATION_ERROR",
    POST_LEAVE_NOTIFICATION_SUCCESS:"POST_LEAVE_NOTIFICATION_SUCCESS",

    //----------------------------Attendance Enquiry-------------------------

    POST_ATTENDANCE_ENQUIRY:"POST_ATTENDANCE_ENQUIRY",
    POST_ATTENDANCE_ENQUIRY_LOADING:"POST_ATTENDANCE_ENQUIRY_LOADING",
    POST_ATTENDANCE_ENQUIRY_ERROR:"POST_ATTENDANCE_ENQUIRY_ERROR",
    POST_ATTENDANCE_ENQUIRY_SUCCESS:"POST_ATTENDANCE_ENQUIRY_SUCCESS",

}

/**
 * Employee Manager DATA
 */
export interface IEmployeeManager extends SideEffectSchema {
        status_code: string,
        message: string,
        user_details: any[],
        manager_details: any[],
        is_field_level_employee: boolean 
}

export const getEmployeeManagerAction = (access_token: string, empId: any) => {

    return {
        type: Actions.GET_EMPLOYEE_MANAGER_DATA,
        payload: { access_token, empId }
    }
}
export const getEmployeeManagerLoadingAction = () => loadingAction(Actions.GET_EMPLOYEE_MANAGER_DATA_LOADING);
export const getEmployeeManagerErrorAction = (error: string) => errorAction(Actions.GET_EMPLOYEE_MANAGER_DATA_ERROR, error);
export const getEmployeeManagerSuccessAction = (data: any) => {

    const payload: IEmployeeManager = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.GET_EMPLOYEE_MANAGER_DATA_SUCCESS,
        payload: payload
    }
}

/**
 * User Vaild Token 
 */
export interface IToken extends SideEffectSchema {
        status_code: string;
        message: string;
        is_white_collar: boolean;
        token: {
            access_token: string;
            expires_in: Number;
            refresh_expires_in: Number,
            refresh_token: string;
            token_type: string;
            "not-before-policy": number;
            session_state: string;
            scope: string

        }
    
}

export const postTokenAction = (token: string, empId: any) => {

    return {
        type: Actions.POST_VALID_USER_TOKEN,
        payload: { token, empId }
    }
}
export const postTokenLoadingAction = () => loadingAction(Actions.POST_VALID_USER_TOKEN_LOADING);
export const postTokenErrorAction = (error: string) => errorAction(Actions.POST_VALID_USER_TOKEN_ERROR, error);
export const postTokenSuccessAction = (data: any) => {
    const payload: IToken = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_VALID_USER_TOKEN_SUCCESS,
        payload: payload
    }
}


/**
 * Post TO Validate Leave
 */
export interface ILeaveValidate extends SideEffectSchema {
        status_code: string;
        total_days: string;
        unique_quota_id: string;
        is_lwop: string;
        message: string;
    
}
export interface ILeaveValidPayload{
    emp_id:string,
    data:
    [{leave_type_code:string,
    approver:string,
    approver_email:string,
    requestor_email:string,
    from_date:string,
    to_date:string,
    leave_category_code:string,
    leave_category_text:string,
    reason:string}]
}
export const postValidLeaveAction = (access_token: string, leaveData: ILeaveValidPayload) => {

    return {
        type: Actions.POST_VALID_LEAVE,
        payload: { access_token, leaveData }
    }
}
export const postValidLeaveLoadingAction = () => loadingAction(Actions.POST_VALID_LEAVE_LOADING);
export const postValidLeaveErrorAction = (error: string) => errorAction(Actions.POST_VALID_LEAVE_ERROR, error);
export const postValidLeaveSuccessAction = (data: any) => {

    const payload: ILeaveValidate = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_VALID_LEAVE_SUCCESS,
        payload: payload
    }
}

/**
* Post TO  Leave
*/
export interface ILeave extends SideEffectSchema {
        status_code: string;
        message: string;
    
}
export interface IApplyLeave {
    emp_id: string,
    emp_name: string,
    data: [{
        leave_type_code: string,
        approver: string,
        approver_email: string,
        requestor_email: string,
        from_date: string,
        to_date: string,
        leave_category_code: string,
        leave_category_text: string,
        reason: string,
        total_days: string,
        unique_quota_id: string,
        is_lwop: string
    }],
    pa: string,
    psa: string
}
export const postLeaveAction = (access_token: string, payload: IApplyLeave) => {

    return {
        type: Actions.POST_LEAVE,
        payload: {payload, access_token}
    }
}
export const postLeaveLoadingAction = () => loadingAction(Actions.POST_LEAVE_LOADING);
export const postLeaveErrorAction = (error: string) => errorAction(Actions.POST_LEAVE_ERROR, error);
export const postLeaveSuccessAction = (data: any) => {

    const payload: ILeave = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_LEAVE_SUCCESS,
        payload: payload
    }
}

/**
 * Post Leave Quota
 */
export interface IQuota{
    
        leave_quota_code: string;
        leave_quota_text: string;
        quota_valid_from: string;
        quota_valid_to: string;
        total_leaves: string;
        available_leaves: string;
        quota_value: number;
    
}
 export interface ILeaveQuota extends SideEffectSchema {
        status_code: string;
        leave_quota_details: IQuota[];
        message: string;   
}

export const postQuotaLeaveAction = (access_token: string, emp_id: string) => {

    return {
        type: Actions.POST_QUOTA_LEAVE,
        payload: { access_token, emp_id }
    }
}
export const postQuotaLeaveLoadingAction = () => loadingAction(Actions.POST_QUOTA_LEAVE_LOADING);
export const postQuotaLeaveErrorAction = (error: string) => errorAction(Actions.POST_QUOTA_LEAVE_ERROR, error);
export const postQuotaLeaveSuccessAction = (data: any) => {
    const payload: ILeaveQuota = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_QUOTA_LEAVE_SUCCESS,
        payload: payload
    }
}

/**
 * Post Leave History
 */
export interface ILeaveHistoryPayload{
    emp_id: string;
    leave_category_code: string;
    leave_status_code:string;
    filter_type: string;
    month: string;
    pa : string;
    psa: string;
}
export interface ILeaveHistory{
    leave_request_id: string;
    requestor_emp_id: string;
    requestor_email: null,
    leave_category: string;
    leave_type: string;
    from_date: string;
    to_date: string;
    reason: string;
    total_days: string;
    leave_status: string;
    applied_date: string;
    approver_emp_id: any|null;
    approver_email: any|null;
    is_deleted: boolean;
    unique_quota_id: any|null,
    created_date_time: string;
    modified_date_time: string;
    created_by: string;
    modified_by: string;
    leave_category_code: string;
    leave_type_code: string;
    leave_status_code: string;
}
export interface ILeaveHistoryList extends SideEffectSchema{
    status_code: string;
    message: string;
    data:{
        leave_requests:ILeaveHistory[]
    }
}
export const postLeaveHistoryAction = (access_token: string, payload:ILeaveHistoryPayload) => {

    return {
        type: Actions.POST_LEAVE_HISTORY,
        payload: { access_token, payload }
    }
}
export const postLeaveHistoryLoadingAction = () => loadingAction(Actions.POST_LEAVE_HISTORY_LOADING);
export const postLeaveHistoryErrorAction = (error: string) => errorAction(Actions.POST_LEAVE_HISTORY_ERROR, error);
export const postLeaveHistorySuccessAction = (data: ILeaveHistoryList) => {
    const payload: ILeaveHistoryList = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_LEAVE_HISTORY_SUCCESS,
        payload: payload
    }
}
/**
 * Master Data
 */

export interface IMasterPayload{
 pa : string;
 psa: string;
 emp_id:string;
}
export interface IMasterList extends SideEffectSchema{
    status_code: string;
    message: string;
    data:{
        leave_category:{value:string, code:string}[];
        leave_status:{value:string, code:string}[];
        emp_id:any[];
        month_list:{value:string, code:string}[];
    }
}
export const postLeaveMasterAction = (access_token: string, payload:IMasterPayload) => {

    return {
        type: Actions.POST_LEAVE_MASTER,
        payload: { access_token, payload }
    }
}
export const postLeaveMasterLoadingAction = () => loadingAction(Actions.POST_LEAVE_MASTER_LOADING);
export const postLeaveMasterErrorAction = (error: string) => errorAction(Actions.POST_LEAVE_MASTER_ERROR, error);
export const postLeaveMasterSuccessAction = (data: IMasterList) => {
    const payload: IMasterList = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_LEAVE_MASTER_SUCCESS,
        payload: payload
    }
}

// -------------------------Leave Approval History--------------------------- 
export interface ILeaveRequestApprovalHistoryPayLaod{
    emp_id:string;
    approval_type:string;
    leave_category_code:string; //WFH
    leave_status_code:string;
    emp_id_value:string;
    filter_type:string;
    approver_id:string;
    pa:string;
    psa:string;
}
export interface ILeaveRequestApprovalHistoryList extends SideEffectSchema{
    status_code: string;
    message: string;
    data:{
        leave_requests_approval:ILeaveHistory[]
    }
}
export const postLeaveRequestApprovalHistoryAction = (access_token: string, payload:ILeaveRequestApprovalHistoryPayLaod) => {

    return {
        type: Actions.POST_LEAVE_APPROVAL_HISTORY,
        payload: { access_token, payload }
    }
}
export const postLeaveRequestApprovalHistoryLoadingAction = () => loadingAction(Actions.POST_LEAVE_APPROVAL_HISTORY_LOADING);
export const postLeaveRequestApprovalHistoryErrorAction = (error: string) => errorAction(Actions.POST_LEAVE_APPROVAL_HISTORY_ERROR, error);
export const postLeaveRequestApprovalHistorySuccessAction = (data: ILeaveRequestApprovalHistoryList) => {
    const payload: ILeaveRequestApprovalHistoryList = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_LEAVE_APPROVAL_HISTORY_SUCCESS,
        payload: payload
    }
}
//-----------------------------------Leave Approval-----------------------------
export enum LeaveApproveReject{
    Approve="0",
    Reject="1"
}
export interface ILeaveRequestApprovalPayLaod{
    emp_id:string;
    data:{leave_request_id:string,requestor_emp_id:string}[],
    action: LeaveApproveReject,
    approval_type:string //"Leave Request"
}
export interface ILeaveRequestApprovalList extends SideEffectSchema{
    status_code: string;
    message: string;
}
export const postLeaveRequestApprovalAction = (access_token: string, payload:ILeaveRequestApprovalPayLaod) => {

    return {
        type: Actions.POST_LEAVE_APPROVAL,
        payload: { access_token, payload }
    }
}
export const postLeaveRequestApprovalLoadingAction = () => loadingAction(Actions.POST_LEAVE_APPROVAL_LOADING);
export const postLeaveRequestApprovalErrorAction = (error: string) => errorAction(Actions.POST_LEAVE_APPROVAL_ERROR, error);
export const postLeaveRequestApprovalSuccessAction = (data: ILeaveRequestApprovalList) => {
    const payload: ILeaveRequestApprovalList = {
        ...data,
        ...successSideEffectState
    };
    return {
        type: Actions.POST_LEAVE_APPROVAL_SUCCESS,
        payload: payload
    }
}