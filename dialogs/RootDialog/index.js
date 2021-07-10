
const {
    ComponentDialog,
    DialogSet,
    DialogTurnStatus,
    WaterfallDialog,
} = require('botbuilder-dialogs')


const { LuisRecognizer } = require('botbuilder-ai')
//Env
const { Luis } = require('../../envConfig')
const { connectionName } = require('./../../envConfig')
//dialog
const { LoginDialog } = require('../LoginDialog')
const { LeaveDialog } = require('./../LeaveDialog')
const {WelcomeCard}= require('./../../cards/firstCard')
const { VaccinationDialog } = require('./../VaccinationDialog')
const { DialogOptions, Constant, LuisData } = require('./../../helper')
const { CardFactory, TeamsInfo } = require('botbuilder')
const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog'


class RootDialog extends ComponentDialog {

    /**
     *
     */

    constructor(conversationState, userState, telemetryClient) {

        super('RootDialog')

        this.conversationDataAccessor = conversationState
        this.userState = userState
        this.luisRecognizer = new LuisRecognizer({
            endpoint: Luis.LuisAPIHostName,
            endpointKey: Luis.LuisAPIKey,
            applicationId: Luis.LuisAppId
        }, {
            apiVersion: 'v3',
            telemetryClient: telemetryClient
        })
        this.addDialog(new VaccinationDialog(conversationState, userState, telemetryClient, this.luisRecognizer))
        this.addDialog(new LeaveDialog(conversationState, userState, telemetryClient, this.luisRecognizer))
        this.addDialog(new LoginDialog(conversationState, userState, telemetryClient, this.luisRecognizer))
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.initStep.bind(this),
            this.finalStep.bind(this)
        ]))
        this.initialDialogId = MAIN_WATERFALL_DIALOG


    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor)
        dialogSet.add(this)
        const dialogContext = await dialogSet.createContext(turnContext)
        const results = await dialogContext.continueDialog()
        if (results.status === DialogTurnStatus.empty) {
            return await dialogContext.beginDialog(this.id)
        }
    }

    async initStep(stepContext) {

        const dialogOptions = new DialogOptions()
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        let userText = stepContext.context.activity.text ? stepContext.context.activity.text.toLowerCase().replace(Constant.REGX, '') : String(stepContext.context.activity.value ? stepContext.context.activity.value.text : '').toLowerCase().replace(Constant.REGX, '')
        const value = stepContext.context.activity.value || null
        const dialogData = stepContext.options || {}
        let onTurnProperty = {}
        if (value && value.parentDialog) {
            userText = value && value.parentDialog
            stepContext.context.activity.text = userText
        }
        if ('logout' === (userText && userText.toLowerCase().trim().replace(Constant.REGX, ''))) {
            await stepContext.context.adapter.signOutUser(stepContext.context, connectionName)
            dataFlow.isLogin = false
            await stepContext.context.sendActivity(Constant.LOGOUT_MESSAGE)
            await stepContext.cancelAllDialogs()
            return await stepContext.beginDialog('LoginDialog', dialogData)
        }
        if ((Constant.UserButtons.includes(userText && userText.toLowerCase().trim()) && (dataFlow && dataFlow.isLogin)) || (dialogData && dialogData.interrupt)) {

            return await menuRedirection(stepContext)
        }
        if ((!dataFlow.isLogin &&userText && userText.toLowerCase().trim().replace(Constant.REGX, '') === 'hi') || !dataFlow || (dataFlow && !dataFlow.isLogin)) {
            return await stepContext.beginDialog('LoginDialog', dialogData)
        }
        try {
            /* 
                Use Cases:
                1. When user normally entering query
                2. When coming from the second step
            */


            onTurnProperty = onTurnProperty.intent ? onTurnProperty : dialogData.luisResult ? dialogData.luisResult : await LuisData(this.luisRecognizer, stepContext)
            console.log(onTurnProperty)
            if (onTurnProperty && onTurnProperty.intent) {
                switch (onTurnProperty.intent) {
                    case 'IGreetings':
                        const members = await TeamsInfo.getMembers(stepContext.context); // eslint-disable-line
                        stepContext.context.sendActivity({attachments:[CardFactory.adaptiveCard(WelcomeCard(members[0].name ? members[0].name : ''))]})
                        return await stepContext.endDialog()
                    case 'IExit':
                        await stepContext.context.sendActivity('Bye, Thank-You')
                        await stepContext.cancelAllDialogs()
                        return await stepContext.endDialog()
                    case 'ILeaveManage':
                        dialogOptions.luisResult = onTurnProperty
                        dialogOptions.isLogin = true
                        return await stepContext.beginDialog('LeaveDialog', dialogOptions)
                    case 'ILeaveApply':
                        dialogOptions.luisResult = onTurnProperty
                        dialogOptions.hasOptions = true
                        dialogOptions.hasChildDialog = true
                        dialogOptions.childDialogIdentifier = 'apply leave'
                        dialogOptions.isLogin = true
                        return await stepContext.beginDialog('LeaveDialog', dialogOptions)
                    case 'IQuota':
                        dialogOptions.luisResult = onTurnProperty
                        dialogOptions.hasChildDialog = true
                        dialogOptions.hasOptions = true
                        dialogOptions.childDialogIdentifier = 'view leaves quota'
                        dialogOptions.isLogin = true
                        return await stepContext.beginDialog('LeaveDialog', dialogOptions)
                    case 'ILeaveHistory':
                        dialogOptions.luisResult = onTurnProperty
                        dialogOptions.hasChildDialog = true
                        dialogOptions.hasOptions = true
                        dialogOptions.childDialogIdentifier = 'view applied leaves'
                        dialogOptions.isLogin = true
                        return await stepContext.beginDialog('LeaveDialog', dialogOptions)
                    case 'IVaccination':
                        dialogOptions.hasOptions = true
                        dialogOptions.luisResult = onTurnProperty
                        dialogOptions.hasChildDialog = true
                        dialogOptions.childDialogIdentifier = 'budget achievement'
                        return await stepContext.beginDialog('VaccinationDialog', dialogOptions)
                    default:
                        await stepContext.context.sendActivity(Constant.SORRY_I_AM_STILL_LEARNING)
                        return await stepContext.endDialog()
                }
            }
            else {
                await stepContext.context.sendActivity(Constant.SORRY_I_AM_STILL_LEARNING)
                return await stepContext.endDialog()
            }

        } catch (err) {
            console.log(err)
            await stepContext.context.sendActivity(Constant.SORRY_I_AM_STILL_LEARNING)
            await stepContext.cancelAllDialogs()
            return await stepContext.endDialog()
        }



    }
    async finalStep(stepContext) {

        let dialogoptions = stepContext.result || {}
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        if (dialogoptions && dialogoptions.forLuis) {
            await stepContext.cancelAllDialogs()
            stepContext.context.activity.text = String(dialogoptions.userQuery).replace(Constant.REGX, '')
            if (dialogoptions.luisResult)
                return await stepContext.replaceDialog(this.id, { forLuis: true, luisResult: dialogoptions.luisResult })
            else
                return await stepContext.replaceDialog(this.id, { forLuis: true })
        }
        if (dataFlow && dataFlow.isLogin && dialogoptions && !dialogoptions.isLogin) {
            const dialogOption = new DialogOptions()
            dialogOption.isLogin = true
            if (String(dialogoptions.userQuery).replace(Constant.REGX, '') !== '') {
                stepContext.context.activity.text = dialogoptions.userQuery
            }
            return await stepContext.replaceDialog(this.id, dialogOption)
        }
        else {
            console.log('third step main dispatcher')
            return await stepContext.cancelAllDialogs(dialogoptions)
        }

    }

    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc)
        if (result) {
            return result
        }
        return await super.onContinueDialog(innerDc)
    }

    async interrupt(innerDc) {
        const dataFlow = await this.conversationDataAccessor.get(innerDc.context)
        let getText = innerDc.context.activity.text ? innerDc.context.activity.text.toLowerCase().replace(Constant.REGX, '') : String((innerDc.context.activity.value ? innerDc.context.activity.value.text : '') || '').toLowerCase().replace(Constant.REGX, '')
        if (getText) {
            const text = String(getText || '').trim().toLowerCase()
            const dialogOptions = new DialogOptions()
            switch (text) {
                case 'hi':
                case 'hello':
                case 'hey': {
                    if (dataFlow.isLogin) {
                        const members = await TeamsInfo.getMembers(innerDc.context)
                        await innerDc.context.sendActivity({ attachments: [CardFactory.adaptiveCard(WelcomeCard(members[0].name ? members[0].name : ''))] })
                        return await innerDc.cancelAllDialogs()
                    } else {
                        await innerDc.cancelAllDialogs()
                        dialogOptions.isLogin = false
                        return await innerDc.replaceDialog(this.id, dialogOptions)
                    }
                }
                case 'exit':
                case 'bye':
                case 'cancel':
                case 'quit': {
                    await innerDc.context.sendActivity('Bye, Thank-You')
                    return await innerDc.cancelAllDialogs()

                }
                case 'logout':
                case 'signout': {
                    const dataFlow = await this.conversationDataAccessor.get(innerDc.context)
                    dataFlow.isLogin = false
                    await innerDc.context.sendActivity('You have been signed out.')
                    await innerDc.context.adapter.signOutUser(innerDc.context, connectionName)
                    await innerDc.cancelAllDialogs()
                    dialogOptions.isLogin = false
                    return await innerDc.replaceDialog(this.id, dialogOptions)
                }
                case 'manage leaves':
                case 'apply leave':
                case 'view leaves quota':
                case 'view applied leaves':
                case 'covid data':
                    await innerDc.cancelAllDialogs()
                    dialogOptions.isLogin = true
                    return await innerDc.replaceDialog(this.id, dialogOptions)

            }
        }

        return null

    }
}

// async function LuisData(recognizer, stepContext) {
//     let mainDispatchRes = await recognizer.recognize(stepContext.context)
//     return new Promise((resolve, reject) => {
//         try {

//             let onTurnProperty = OnTurnProperty.fromLUISResults(mainDispatchRes, null)
//             console.log('mainDispatchRes', JSON.stringify(mainDispatchRes))
//             console.log(onTurnProperty)
//             console.log(reject)
//             resolve(onTurnProperty)
//         } catch (err) {
//             console.log(err)
//         }

//     })
// }


const menuRedirection = async function (stepContext) {
    console.log('MENU REDIRECTION TEXT==>', stepContext.context.activity.text)

    const dialogOptions = new DialogOptions()
    var text = String(stepContext.context.activity.text || stepContext.context.activity.value.text).toLowerCase().trim().replace(Constant.REGX, '')
    switch (text) {
        case 'manage leaves':
            dialogOptions.isLogin = true
            return await stepContext.beginDialog('LeaveDialog', dialogOptions)
        case 'apply leave':
            dialogOptions.isLogin = true
            dialogOptions.hasChildDialog = true
            dialogOptions.hasOptions = true
            dialogOptions.childDialogIdentifier = 'apply leave'
            return await stepContext.beginDialog('LeaveDialog', dialogOptions)
        case 'view leaves quota':
            dialogOptions.isLogin = true
            dialogOptions.hasChildDialog = true
            dialogOptions.hasOptions = true
            dialogOptions.childDialogIdentifier = 'view leaves quota'
            return await stepContext.beginDialog('LeaveDialog', dialogOptions)
        case 'view applied leaves':
            dialogOptions.isLogin = true
            dialogOptions.hasChildDialog = true
            dialogOptions.hasOptions = true
            dialogOptions.childDialogIdentifier = 'view applied leaves'
            return await stepContext.beginDialog('LeaveDialog', dialogOptions)
        case 'covid data':
            dialogOptions.isLogin = true
            return await stepContext.beginDialog('VaccinationDialog', dialogOptions)

    }
}

module.exports = {
    RootDialog: RootDialog
}