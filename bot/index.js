// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TeamsActivityHandler, TeamsInfo, TurnContext, MessageFactory } = require('botbuilder');

const { TaskModuleUIConstants } = require('../models/TaskModuleUIConstants');
const { TaskModuleIds } = require('../models/taskmoduleids');
const { TaskModuleResponseFactory } = require('../models/taskmoduleresponsefactory');
const { CosmosDataBase } = require("../db")
const { BaseUrl, MSApp } = require('../envConfig');
const { JWTToken } = require('./../helper');
const cosmos = new CosmosDataBase();

const Actions = [
    TaskModuleUIConstants.APPLY_LEAVE
];
class Bot extends TeamsActivityHandler {
    constructor(conversationState, userState, dialog, conversationReferences) {
        super();
        // Create the state property accessors for the conversation data and user profile.
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');
        this.dialog = dialog;
        this.conversationState = conversationState;
        this.userState = userState;
        this.conversationReferences = conversationReferences;
        this.baseUrl = process.env.baseUrl || BaseUrl;
        this.dialogState = this.conversationState.createProperty('DialogState');
        this.userDialogState = this.userState.createProperty('UserDialogState');



        // The state management objects for the conversation and user state.

        this.onMembersAdded(async (context, next) => {

            const membersAdded = context.activity.membersAdded;
            await this.addConversationReference(context);
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await dialog.run(context, this.dialogState);
                    // const members = await TeamsInfo.getMembers(context);
                    // await context.sendActivity({attachments:[CardFactory.adaptiveCard(WelcomeCard(members[0].name ? members[0].name : ""))]});
                }
            }
            await next();

        });
        this.onMembersRemoved(async (context, next) => {
            await next();
        });

        this.onMessage(async (context, next) => {
            this.adapter = context.adapter;
            //await this.addConversationReference(context);
            await dialog.run(context, this.dialogState);
            await next();
        })

        this.onDialog(async (context, next) => {
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
            await next();
        });
    }
    setTaskInfo(taskInfo, uiSettings, text) {
        taskInfo.height = uiSettings.height;
        taskInfo.width = uiSettings.width;
        taskInfo.title = uiSettings.title + (text ? ` > ${text}` : "");
    }


    async handleTeamsTaskModuleFetch(context, taskModuleRequest) {
        // Called when the user selects an options from the displayed HeroCard or
        // AdaptiveCard.  The result is the action to perform.

        const cardTaskFetchValue = taskModuleRequest.data.data;
        const token = JWTToken();
        const queryString = "?token=" + token + "&employeeId=" + taskModuleRequest.data.emp_id + "&domain=" + BaseUrl + "&appId=" + MSApp.MicrosoftAppId + "&theme=" + String(taskModuleRequest.context.theme).toLowerCase();
        let taskInfo = {};
        if (cardTaskFetchValue === TaskModuleIds.APPLY_LEAVE) {
            taskInfo.url = taskInfo.fallbackUrl = this.baseUrl + '/' + 'apply-leave.html' + queryString
            this.setTaskInfo(taskInfo, TaskModuleUIConstants.APPLY_LEAVE, null);
        }
        if (cardTaskFetchValue === TaskModuleIds.VIEW_LEAVE) {
            taskInfo.url = taskInfo.fallbackUrl = this.baseUrl + '/' + 'view-leave.html' + queryString
            this.setTaskInfo(taskInfo, TaskModuleUIConstants.VIEW_LEAVE, null);
        }
        if (cardTaskFetchValue === TaskModuleIds.APPROVE_LEAVE) {
            taskInfo.url = taskInfo.fallbackUrl = this.baseUrl + '/' + 'approve-leave.html' + queryString
            this.setTaskInfo(taskInfo, TaskModuleUIConstants.APPROVE_LEAVE, null);
        }
        return TaskModuleResponseFactory.toTaskModuleResponse(taskInfo);

    }

    async run(context) {
        await super.run(context);
        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }

    async addConversationReference(context) {
        let members = await TeamsInfo.getMembers(context)
        const conversationReference = TurnContext.getConversationReference(context.activity);
        return await cosmos.Upsert(members[0].userPrincipalName, conversationReference);
    }

    // eslint-disable-line
    handleTeamsSigninVerifyState = async (context, state) => {
        console.log(state);
        await this.dialog.run(context, this.dialogState);
    }

}



module.exports.Bot = Bot;
