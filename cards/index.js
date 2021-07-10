const {firstCard,WelcomeCard}= require('./firstCard')
const {ICON_URL } = require('../envConfig')
const {ManageLeavesCard,LeaveQuotaCard,LeaveTypeCard,LeaveOptionsCard,SelectedDateRang,
    SelectedDateRangUpdate,
    AvailableLeavesCard,
    LeaveRequestConfirm,LeaveRequestConfirmUpdate} =require('./leavesCard')
const {EmployeeApprovel} = require('./notificationCard')
const {CovidDose1Card,CovidDose2Card,CovidDose1SuccessCard,CovidFirstCard, Dose1DetailConfirmCard, EditDose1DetailsCard}=require('./covidCard')
const NotAccess=function(){
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'Container',
                'items': [
                    {
                        'type': 'Image',
                        'url': ICON_URL.ACCESS_DENIED,
                        'horizontalAlignment': 'Center'
                    },
                    {
                        'type': 'TextBlock',
                        'text': 'We\'re sorry-you don\'t have permisson to Sign-In',
                        'wrap': true,
                        'horizontalAlignment': 'Center'
                    }
                ]
            },
            {
                'type': 'TextBlock',
                'text': ' ',
                'wrap': true
            }
        ]
    }
}
module.exports={
    firstCard:firstCard,
    WelcomeCard:WelcomeCard,
    ManageLeavesCard: ManageLeavesCard,
    EmployeeApprovel:EmployeeApprovel,
    LeaveQuotaCard:LeaveQuotaCard,
    LeaveTypeCard:LeaveTypeCard,
    LeaveOptionsCard:LeaveOptionsCard,
    CovidDose1Card:CovidDose1Card,
    CovidDose1SuccessCard:CovidDose1SuccessCard,
    CovidFirstCard:CovidFirstCard,
    CovidDose2Card:CovidDose2Card,
    SelectedDateRang:SelectedDateRang,
    LeaveRequestConfirm:LeaveRequestConfirm,
    LeaveRequestConfirmUpdate:LeaveRequestConfirmUpdate,
    SelectedDateRangUpdate:SelectedDateRangUpdate,
    Dose1DetailConfirmCard:Dose1DetailConfirmCard,
    EditDose1DetailsCard:EditDose1DetailsCard,
    AvailableLeavesCard:AvailableLeavesCard,
    NotAccess:NotAccess
}