
const {
    ComponentDialog,
    WaterfallDialog,
    Dialog,
} = require('botbuilder-dialogs')
const { CardFactory } = require('botbuilder')
const { LeaveQuotaCard } = require('../../cards/leavesCard')
const { ApplyLeaveDialog } = require('./applyLeaveDialog')
const { LeaveRequest, userValidateToken } = require('./../../api/leaveApi')
const { JWTToken } = require('../../helper')
// const { ManageLeavesCard } = require('../../cards/leavesCard')


const WATERFALL_DIALOG = 'WATERFALL_DIALOG'
const DIALOG_ID = 'LeaveQuotaDialog'

class LeaveQuotaDialog extends ComponentDialog {

    /**
     *
     */
    constructor(conversationState, userState,telemetryClient,luisRecognizer) {// eslint-disable-line
        super(DIALOG_ID)

        this.conversationDataAccessor = conversationState
        this.userProfileAccessor = userState
        this.addDialog(new ApplyLeaveDialog(conversationState, userState,telemetryClient))
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.getQuotaGraph.bind(this),
            this.stepProcessMenu.bind(this)
        ]))
        this.initialDialogId = WATERFALL_DIALOG

    }


    async onBeginDialog(dialogContext, options) {
        return await dialogContext.beginDialog(this.initialDialogId, options)
    }
    async getQuotaGraph(stepContext) {
        const dialogOptions = stepContext.options; // eslint-disable-line
        //let tokenJson = await stepContext.context.adapter.getUserToken(stepContext.context, connectionName);
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        const bearer= JWTToken()
        let tokenJson= await userValidateToken(bearer, {'empId':dataFlow.employee.id})
        let dataLeaveQuota= await LeaveRequest.leaveQuota(tokenJson.data.token.access_token,{'emp_id':dataFlow.employee.id})
        let quatoCollection=[]
        if(dataLeaveQuota.status===200){
            if(dataLeaveQuota.data && dataLeaveQuota.data.leave_quota_details){
                const quotaData=dataLeaveQuota.data.leave_quota_details
                for(let quota in quotaData){
                    if(['22','30','50'].indexOf(quotaData[quota].leave_quota_code)!==-1){
                        if(quotaData[quota].leave_quota_code=='22')
                        quotaData[quota].leave_quota_text='Privilege Leave'
                    quatoCollection.push(quotaData[quota])
                    }
                }

            }
        }
        //try {
            //const quotaResp = await LeaveRequest.leaveQuota({ emp_id: dataFlow.employeeId })
            // if (dialogOptions.hasOptions) {
            //     if (dialogOptions.hasChildDialog) {
            //         return await stepContext.next(dialogOptions.childDialogIdentifier)
            //     }
            //     if (dialogOptions.luisResult && dialogOptions.luisResult.entities) {
            //         if (dialogOptions.luisResult.entities.length) {
            //             // let dateRange= dialogOptions.luisResult.entities.find(x=>x.entityName==='daterange')
            //             // if(dateRange){
            //             //     let entityValue= dateRange.entityValue[0].resolution[0].start.split('-')
            //             //     let year= entityValue[0]
            //             //     let month=entityValue[1]
            //             //     step.values.hasDuration = true
            //             //     step.options.showDurationCard=true
            //             //     step.values.year = year
            //             //     step.values.month = month
            //             //     return await step.next()
            //             // }
            //         }
            //     }
            //     if (dialogOptions.luisResult && dialogOptions.luisResult.intent) {
            //         // if(step.context.activity.value && step.context.activity.value.month){
            //         //    step.values.hasDuration = true
            //         //    step.options.showDurationCard=true
            //         //    step.values.year = step.context.activity.value.year
            //         //    step.values.month = step.context.activity.value.month
            //         //    return await step.next()  
            //         // }
            //     }


            // }

            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(LeaveQuotaCard(quatoCollection,dataFlow.employee.id))] })
            return Dialog.EndOfTurn
        //}
        //catch (err) {

        //}
    }
    async stepProcessMenu(stepContext) {
        const userInput = stepContext.result
        const dialogOptions = stepContext.options

        if (userInput) {
            
            switch (userInput.toLowerCase()) {
                case 'apply leave':
                    return await stepContext.beginDialog('ApplyLeaveDialog', dialogOptions)
                default:
                    return await stepContext.endDialog({ forLuis: true, userQuery: userInput })
            }
        }

        return Dialog.EndOfTurn

    }





}

module.exports.LeaveQuotaDialog = LeaveQuotaDialog
