// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { DialogSet, Dialog, WaterfallDialog, DialogTurnStatus } = require('botbuilder-dialogs');
const { ComponentDialog } = require('botbuilder-dialogs');
const { Constant } = require('../../helper');
const { CardFactory, MessageFactory, AttachmentLayoutTypes } = require('botbuilder');
const { TaskModuleUIConstants } = require('../../models/TaskModuleUIConstants');
const { leaveRejectedCard,leaveApprovedCard } = require('../../cards/notificationCard');
const MAIN_DIALOG = 'leaveNotifyDialog';
const MAIN_WATERFALL_DIALOG_NOTIFY = 'MainWaterfallDialogNotify';

class LeaveNotifyDialog extends ComponentDialog {
    constructor(conversationState,data,sendFor) {
        super(MAIN_DIALOG);
        this.conversationDataAccessor = conversationState;
        this.data=data;
        this.sendFor=sendFor;
        //For Notify
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG_NOTIFY, [
            this.initNotify.bind(this)
        ]));
         
    }
    
    async run(turnContext,accessor){
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);        
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
          return  await dialogContext.beginDialog(this.id);
        }   
    }
    async initNotify(stepContext) {
        if(this.data.Recipient){
            if(this.sendFor.toLowerCase() == 'approved'){
                const replyActivity=MessageFactory.attachment(CardFactory.adaptiveCard(leaveApprovedCard()))
                replyActivity.summary = `Approved request @leave`;
                replyActivity.channelData={
                    notification:{
                        alert:true
                    }
                }
                await stepContext.context.sendActivity(replyActivity);
            }
            else{
                const replyActivity=MessageFactory.attachment(CardFactory.adaptiveCard(leaveRejectedCard()))
                replyActivity.summary = `Rejected request @leave`;
                replyActivity.channelData={
                    notification:{
                        alert:true
                    }
                }
             await stepContext.context.sendActivity(replyActivity);
            }  
     }
     return await stepContext.endDialog(DialogTurnStatus.complete);

    }     
}
module.exports.LeaveNotifyDialog = LeaveNotifyDialog;