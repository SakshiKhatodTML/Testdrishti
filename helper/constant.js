module.exports={
    REGX:/[\n\r]+/ig,
    THANKS:'Thanks!',
    PLEASE_SIGN_IN:'Please Sign In',
    SIGN_IN_TITLE:'Sign In',
    LOGOUT_MESSAGE:'You have been signed out.',
    LOGIN_FAIL:'Login was not successful please try again.',
    SORRY_I_AM_STILL_LEARNING:'Sorry I\'m still learning. Please try again',
    
    ASK_LEAVE_TYPE:'Let me know that what is your leave type which you want to apply?',
    ASK_LEAVE_DAY:'Are you want to apply leave for half day or full day?',
    ASK_LEAVE_DATE:'Let me know that what is your leave date',
    ASK_LEAVE_REASON:'What is your leave reason?',
    VALIDATION_MESSAGE_LEAVE_REASON:'reason, Please re-enter again.',
    ASK_LEAVE_CONFIRMATION:'Select the option or write confirm or re-apply',
    ASK_FOR_LEAVE_DIALOG_FLOW:'Hey, Are you want to apply leave? Please select below option else write your query.',
    VALIDATION_MESSAGE_LEAVE_TYPE:'type of leave. Please enter again.',
    VALIDATION_MESSAGE_LEAVE_REQUEST_TYPE:'request type of leave. Please enter again.',
    VALIDATION_MESSAGE_LEAVE_FULL_DAY:'date. Please enter date in format \'from 2021-01-01 to 2021-01-02\' again.',
    VALIDATION_MESSAGE_LEAVE_HALF_DAY:'date. Please enter date in format \'2021-01-01/ jan 01 2021/ next moday\' again.',
    VALIDATION_MESSAGE_LEAVE_DATE_RANGE:'date, please select again.',
    SUCCESS_MESSAGE_LEAVE_APPLY:'Leave apply successfully',
    HOW_CAN_I_HELP_YOU_FURTHER:'How can i help you further.',
    ERROR_LEAVE_APPLY_401:'Sorry, Access Denied',
    UserButtons:[
        'manage leaves',
        'covid data',
        'apply leave',
        'view leaves quota',
        'view applied leaves',
        'sick leave',
        'earned leave',
        'casual leave',
        'chat with manager',
        'add dose 1 details',
        'add dose 2 details',
        'Submit details',
        'manage covid data',
        'my approvals'
    ],
    LEAVE_TYPE_CODE:{
        'full day': 'FD',
        'second half day' :'SH',
        'first half day' :'FH'
    },
    LEAVE_STATUS_CODE:{
        'Approved':4,
        'Pending for approval':0,
        'Approved & post pending':1,
        'Approved & posted': 2,
        'Rejected':3,
        'Delete approval pending':5,
        'Deleted and update in progres':6,
        'Deleted':7,
        'Error in posting': 8,
        'Error in deletion':9
    },
    LEAVE_CATOGARY_TYPE:{
       'work from home': 'WFH',
       'sick leave': 'M0',
       'casual leave':'L0',
       'privilege leave': 'P0'
    }
}