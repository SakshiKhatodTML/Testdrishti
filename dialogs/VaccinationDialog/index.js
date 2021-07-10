// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { Dialog, WaterfallDialog } = require('botbuilder-dialogs')
const { ComponentDialog } = require('botbuilder-dialogs')
const { CardFactory, MessageFactory  } = require('botbuilder')
const {Constant} = require('./../../helper') 
const {connectionName} = require('../../envConfig')
const {CovidDose1Card, Dose1DetailConfirmCard,CovidDose1SuccessCard,CovidDose2Card,CovidFirstCard, EditDose1DetailsCard}=require('../../cards/index')
// const { CLIEngine } = require('eslint')
const MAIN_DIALOG = 'VaccinationDialog'
const MAIN_WATERFALL_DIALOG = 'VaccinationWaterfallDialog'
const CovidMenu = [
    'add dose-1 details',
    'confirm',
    'manage covid data',
    'submit details dose-2',
    'edit',
    'submit details'
]
class VaccinationDialog extends ComponentDialog {
    constructor(conversationState,userState, telemetryClient) {
        super(MAIN_DIALOG,connectionName)
        this.conversationDataAccessor=conversationState
        this.userState=userState
        this.inputCardState = this.conversationDataAccessor.createProperty('cardState')
        
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.initStep.bind(this),
            this.dose1DetailStep.bind(this),
            this.confirmDose1DetailStep.bind(this),
            this.dose1SucessStep.bind(this),
            this.manageCovidDataStep.bind(this),
            this.sucessStep.bind(this)
        ]))

        this.initialDialogId = MAIN_WATERFALL_DIALOG
    }
     async onBeginDialog(dialogContext, options){
         return await dialogContext.beginDialog(this.initialDialogId,options) 
     }
     async initStep(stepContext){
        var data = false
        // const dialogOptions = stepContext.options
        // console.log(this.dialogs)
        // if (dialogOptions.hasOptions) {

        //     if (dialogOptions.hasChildDialog) {
        //         return await stepContext.next(dialogOptions.childDialogIdentifier)
        //     }
        //     if (dialogOptions.luisResult && dialogOptions.luisResult.entities) {
        //         if (dialogOptions.luisResult.entities.length) {
                     
        //         }
        //     }
        //     if (dialogOptions.luisResult && dialogOptions.luisResult.intent) {
                 
        //     }
        // }
        if(data == false){
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(CovidFirstCard())] })
            return Dialog.EndOfTurn
        }
        else{
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(CovidDose1SuccessCard())] })
            return Dialog.EndOfTurn
        }
     }
     async dose1DetailStep(stepContext){
        const userInput = stepContext.result
        // const dialogOptions = stepContext.options

        if( CovidMenu.includes(userInput.toLowerCase().trim().replace(Constant.REGX,''))) {
            return await menuRedirection(stepContext)
        } else {
            return await stepContext.endDialog({forLuis: true, userQuery: userInput})
        }
        return Dialog.EndOfTurn
     }

    async confirmDose1DetailStep(stepContext) {
        let card = MessageFactory.list([CardFactory.adaptiveCard(Dose1DetailConfirmCard())])
        let response = await stepContext.context.sendActivity(card)
        return Dialog.EndOfTurn
    }

    async dose1SucessStep(stepContext){
        console.log('MENU REDIRECTION TEXT==>', stepContext.context.activity.text)

    // const dialogOptions = new DialogOptions()
        var userInput = String(stepContext.context.activity.text||stepContext.context.activity.value.text).toLowerCase().trim().replace(Constant.REGX,'')
        if( CovidMenu.includes(userInput )) {
            return await menuRedirection(stepContext)
        } else {
            return Dialog.EndOfTurn
        }
        // return Dialog.EndOfTurn
    }

    async manageCovidDataStep(stepContext){
        console.log('MENU REDIRECTION TEXT==>', stepContext.context.activity.text)
        var userInput = String(stepContext.context.activity.text||stepContext.context.activity.value.text).toLowerCase().trim().replace(Constant.REGX,'')
        if( CovidMenu.includes(userInput )) {
            return await menuRedirection(stepContext)
        } else {
            return Dialog.EndOfTurn
        }
    }

    async sucessStep(stepContext){
        console.log('MENU REDIRECTION TEXT==>', stepContext.context.activity.text)
        var userInput = String(stepContext.context.activity.text||stepContext.context.activity.value.text).toLowerCase().trim().replace(Constant.REGX,'')
        if( CovidMenu.includes(userInput )) {
            return await menuRedirection(stepContext)
        } else {
            return Dialog.EndOfTurn
        }
    }
}

const menuRedirection=async function(stepContext) {
    console.log('MENU REDIRECTION TEXT==>', stepContext.context.activity.text)

    // const dialogOptions = new DialogOptions()
    var userInput = String(stepContext.context.activity.text||stepContext.context.activity.value.text).toLowerCase().trim().replace(Constant.REGX,'')
    switch(userInput) {
        case CovidMenu[0]:
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(CovidDose1Card())] })
            return Dialog.EndOfTurn    
            // return await stepContext.beginDialog('ApplyLeaveDialog', dialogOptions) // If LUIS Result is there then forwarding the LUISRESULT
        case CovidMenu[1]:
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(CovidDose1SuccessCard())] })
            return Dialog.EndOfTurn
        case CovidMenu[2]:
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(CovidDose2Card())] })
            return Dialog.EndOfTurn
            // return await step.replaceDialog(this.id, { hasOptions: true, showDurationCard: true})
        case CovidMenu[3]:
            await stepContext.context.sendActivity({text:'Vaccine Data Submited SuccessFully'})
            return Dialog.EndOfTurn
                // return await step.replaceDialog(this.id, { hasOptions: true, showDurationCard: true})
        case CovidMenu[4]:
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(EditDose1DetailsCard())]})
            return Dialog.EndOfTurn
        default:
            return await stepContext.endDialog({forLuis: true, userQuery: userInput})
    }
 }

module.exports.VaccinationDialog = VaccinationDialog
