// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { Dialog, WaterfallDialog } = require('botbuilder-dialogs')
const { ComponentDialog } = require('botbuilder-dialogs')
const { CardFactory, TeamsInfo } = require('botbuilder')
const {connectionName} = require('../../envConfig')
const {Constant, CustomeAuth} = require('./../../helper') 
const {WelcomeCard}= require('./../../cards/firstCard')

const { getGraphData, getUserAndManagerDetailsTemp} = require('../../api/leaveApi')

const MAIN_DIALOG = 'LoginDialog'
const MAIN_WATERFALL_DIALOG = 'MainWaterfallDialog'
const OAUTH_PROMPT = 'OAuthPrompt'

class LoginDialog extends ComponentDialog {
    constructor(conversationState,userState,telemetryClient) {// eslint-disable-line
        super(MAIN_DIALOG,connectionName)
        this.conversationDataAccessor=conversationState
        this.userState=userState
        this.addDialog(new CustomeAuth(OAUTH_PROMPT, {
            connectionName: connectionName,
            text: Constant.PLEASE_SIGN_IN,
            title: Constant.SIGN_IN_TITLE,
            timeout: 300000
        }))
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.signStep.bind(this),
            this.loginStep.bind(this)
        ]))

        this.initialDialogId = MAIN_WATERFALL_DIALOG
    }

    
     async onBeginDialog(dialogContext, options){
         return await dialogContext.beginDialog(this.initialDialogId,options) 
     }
    async signStep(stepContext) {
        return await stepContext.beginDialog(OAUTH_PROMPT,stepContext.options)
    }
    async loginStep(stepContext) {
        // Get the token from the previous step. Note that we could also have gotten the
        // token directly from the prompt itself. There is an example of this in the next method.
        const tokenResponse = stepContext.result
        const dataFlow= await this.conversationDataAccessor.get(stepContext.context,{
            isLogin:false
        })
        const dialogOptions= stepContext.options
        if (tokenResponse) {
            const members = await TeamsInfo.getMembers(stepContext.context)
            if(!tokenResponse.isLogin){
            await stepContext.context.sendActivity({attachments:[CardFactory.adaptiveCard(WelcomeCard(members[0].name ? members[0].name : ''))]})
            }
            else{
            if(dataFlow && !dataFlow.isLogin)
            await stepContext.context.sendActivity({attachments:[CardFactory.adaptiveCard(WelcomeCard(members[0].name ? members[0].name : ''))]})
            }
            dataFlow.isLogin=true
            dialogOptions.isLogin=true
            const respData=await getGraphData('nj.celebal@tatamotors.com'||members[0].email,tokenResponse.token)
            
            if(respData.status===200){
                const userManagerDataResp= await getUserAndManagerDetailsTemp(tokenResponse.token,{empId: '509862'||respData.data.employeeId})
                dataFlow.employee={
                    pa:userManagerDataResp.data.user_details[0].PersArea,
                    psa:userManagerDataResp.data.user_details[0].PSubarea,
                    id: '509862'||respData.data.employeeId,
                    CompName:userManagerDataResp.data.user_details[0].CompName
                }
                dataFlow.manager={
                    id:'509862'||respData.data.manager.employeeId,
                    displayName: respData.data.manager.displayName,
                    mail: respData.data.manager.mail,
                    CompName:'Giftson Jeyakumar'||userManagerDataResp.data.manager_details[0].CompName
                }
                dialogOptions.employeeId= '509862'||respData.data.employeeId
                dialogOptions.managerId=respData.data.manager.employeeId//displayName
            }
            return  stepContext.endDialog(dialogOptions)
            //}
        }
        await stepContext.context.sendActivity(Constant.LOGIN_FAIL)
        await stepContext.replaceDialog(this.id)
        return  Dialog.EndOfTurn
    }
 
}

module.exports.LoginDialog = LoginDialog
