const { postReq , getReq} = require('./../index')
const { APIEndLeaveRequests } = require('../../envConfig')

module.exports.getGraphData= async(email,token)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        } 
    }
    return await getReq(`graph.microsoft.com/v1.0/users/${email}?$expand=manager($levels=1)&$select=EmployeeID` ,config)
}

module.exports.userValidateToken = (token,body) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        } 
    }
    return  postReq('empappqa.tatamotors.com:5001/cet_syncing/validate_user_token/',body ,config)
}
/**
 * 
 * @param {*} body {"empId": "509862"}
 * @returns Promise
 */
module.exports.getUserAndManagerDetailsTemp=(token,body)=>{

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return  postReq('empappqa.tatamotors.com:5001/cet_syncing/get_user_and_manager_details_temp/', body ,config)
}
module.exports.LeaveRequest = {

    leaveQuota:  (token,body) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return  postReq(APIEndLeaveRequests + '/leave_requests/get_leave_quota/', body ,config)
    },

    leaveHistory: async (token,body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        
        return await postReq(APIEndLeaveRequests + '/leave_requests/get_leave_requests/',body ,config)
    },

    masterData: async (token,body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return await postReq(APIEndLeaveRequests + '/leave_requests/get_leave_requests_master/',body ,config)
    },

    applyLeave:  (token,body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        
        return  postReq(APIEndLeaveRequests + '/leave_requests/create_leave_request_edp/', body,config)
    },

    validateLeave:  (token,body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return postReq(APIEndLeaveRequests + '/leave_requests/validate_leave_request/', body ,config)
        
    }

}

module.exports.LeaveApproval = {
    leaveApprovalHistory: async (token, body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return await postReq(APIEndLeaveRequests + '/leave_requests/get_leave_requests_approval/', body ,config)
    },

    leaveApproval: async (token, body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return await postReq(APIEndLeaveRequests + '/leave_requests/leave_request_approval/', body ,config)
    }
}

module.exports.serviceAvailability = async (token, body) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return await postReq('https://empappqa.tatamotors.com:5001/cet_syncing/get_service_availability/', body ,config)
},

module.exports.attendanceEnquiry = async (token, body) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        return await postReq(APIEndLeaveRequests + '/leave_requests/get_attendance_enquiry', body ,config)
}


//0 approve 
// 1 rejected



