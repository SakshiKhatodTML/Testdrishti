// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { Dialog, WaterfallDialog } = require('botbuilder-dialogs')
const { ComponentDialog } = require('botbuilder-dialogs')
const { CardFactory } = require('botbuilder')
// const { Constant } = require('./../../helper')
const { connectionName } = require('../../envConfig')
const { ManageLeavesCard } = require('../../cards/leavesCard')
const {LeaveQuotaDialog} = require('./leaveQuotaDialog')
const {ApplyLeaveDialog} = require('./applyLeaveDialog')
const MAIN_DIALOG = 'LeaveDialog'
const MAIN_WATERFALL_DIALOG = 'LeaveWaterfallDialog'

const ManageLeaveMenu = [
    'apply leave',
    'view leaves quota',
    'view applied leaves'
]

class LeaveDialog extends ComponentDialog {
    constructor(conversationState, userState,telemetryClient,luisRecognizer) {// eslint-disable-line
        super(MAIN_DIALOG, connectionName)
        this.conversationDataAccessor = conversationState
        this.userState = userState
        LeaveQuotaDialog.prototype.getLeaveBalance=this.getLeaveBalance

        this.addDialog(new LeaveQuotaDialog(conversationState, userState,telemetryClient,luisRecognizer))
        this.addDialog(new ApplyLeaveDialog(conversationState, userState,telemetryClient,luisRecognizer))
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.stepSendManageLeave.bind(this),
            this.stepProcessMenu.bind(this)
        ]))

        this.initialDialogId = MAIN_WATERFALL_DIALOG
    }
    async onBeginDialog(dialogContext, options) {
        return await dialogContext.beginDialog(this.initialDialogId, options)
    }
    async filterPerPostData(stepContext){
         const value= stepContext.context.activity.value
         if(value && value.entity){
             const keys= Object.keys(value.entity)
             for(let i in keys){
                 if(keys[i]==='leaveType'){
                 stepContext.values.hasLeaveType=true
                 stepContext.values.leaveType =value.entity[keys[i]]
                }
                if(keys[i]==='leaveRequestType'){
                    stepContext.values.hasRequestType=true
                    stepContext.values.leaveRequestType =value.entity[keys[i]]
                }
             }
         }
         return
    }
    async stepSendManageLeave(stepContext) {
        const dialogOptions = stepContext.options
        if (dialogOptions.hasOptions) {
            if (dialogOptions.hasChildDialog) {
                await this.filterPerPostData(stepContext)
                return await stepContext.next(dialogOptions.childDialogIdentifier)
            }    
        }
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(ManageLeavesCard(dataFlow.employee.id))] })
        return Dialog.EndOfTurn
        
    }
    async stepProcessMenu(stepContext) {
        const userInput = stepContext.result
        const dialogOptions = stepContext.options

        if(ManageLeaveMenu.includes(userInput ? userInput.toLowerCase() : '' )) {

            switch(userInput.toLowerCase()) {
                case ManageLeaveMenu[0]:
                    return await stepContext.beginDialog('ApplyLeaveDialog', dialogOptions) // If LUIS Result is there then forwarding the LUISRESULT
                case ManageLeaveMenu[1]:
                    return await stepContext.beginDialog('LeaveQuotaDialog', dialogOptions)
            }
        } else {
            return await stepContext.endDialog({forLuis: true, userQuery: userInput})
        }

        return Dialog.EndOfTurn

    }
    

}

module.exports.LeaveDialog = LeaveDialog
