class DialogOptions {
    constructor() {

        this.hasOptions = false
        this.isLogin=false
        this.forLuis = false
        this.userQuery = null
        // For Sub Roots
        this.hasChildDialog = false
        this.childDialogIdentifier = null
        this.luisResult = null
        this.employeeId=''
        this.managerId=''
        this.leaveRequest={
            isFromParent: false,
            hasLeaveType:false,
            leaveType: '',
            hasDuration: false,
            FromDate:'',
            ToDate:'',
            hasRequestType: false,
            leaveRequestType:'',
            hasLeaveReason: false,
            reason:'',
        }
    }
}

module.exports = {
    DialogOptions
}
