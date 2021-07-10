const {
    ComponentDialog,
    WaterfallDialog,
    Dialog,
} = require('botbuilder-dialogs')
const { LeaveTypeCard, LeaveOptionsCard, SelectedDateRang, LeaveRequestConfirm,
    SelectedDateRangUpdate, ManageLeavesCard,
    LeaveRequestConfirmUpdate } = require('../../cards/leavesCard')
const { CardFactory, MessageFactory, TeamsInfo } = require('botbuilder')
const Constant = require('../../helper/constant')
const { LuisDataFromEntity, dateFormatYYYYMMDD } = require('../../helper')
const { JWTToken } = require('../../helper')
const { LeaveRequest, userValidateToken } = require('./../../api/leaveApi')
const { DialogOptions } = require('../../helper/dialogOptionsModel')
const WATERFALL_DIALOG = 'WATERFALL_DIALOG'
const DIALOG_ID = 'ApplyLeaveDialog'
const LeaveType = [
    'sick leave',
    'work from home',
    'casual leave',
    'privilege leave'
]
const LeaveRequestType = [
    'first half day',
    'second half day'
]
const FULL_DAY = 'full day'
const HALF_DAY = 'half day'


class ApplyLeaveDialog extends ComponentDialog {

    /**
     *
     */
    constructor(conversationState, userState, telemetryClient, luisRecognizer) {// eslint-disable-line
        super(DIALOG_ID)

        this.conversationDataAccessor = conversationState
        this.userProfileAccessor = userState
        this.luisRecognizer = luisRecognizer
        this.inputCardState = this.conversationDataAccessor.createProperty('cardState')
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.initStep.bind(this),
            this.leaveOptionsStep.bind(this),
            this.dateDurationAskStep.bind(this),
            this.confirmLeaveStep.bind(this),
            this.askforDetails.bind(this),
            this.leaveSubmitResponseStep.bind(this),
            this.endStep.bind(this)
        ]))
        this.initialDialogId = WATERFALL_DIALOG

    }


    async onBeginDialog(dialogContext, options) {
        return await dialogContext.beginDialog(this.initialDialogId, options)
    }
    async errorMessage(text, context) {
        const mention = {
            'type': 'mention',
            mentioned: { id: context.activity.from.id, name: 'Invaild' },
            text: `<at>@${context.activity.from.name}</at>`,

        }
        let replyActivity = MessageFactory.text(`${mention.text} ${text}`)
        replyActivity.entities = [mention]
        return await context.sendActivity(replyActivity)
    }
    async initStep(stepContext) {
        const dialogOptions = stepContext.options
        const kesyParent = Object.keys(stepContext.parent.values)
        if (kesyParent.length > 1) {
            for (let k in dialogOptions.leaveRequest) {
                if (kesyParent.indexOf(k) !== -1) {
                    dialogOptions.isFromParent = true
                    dialogOptions.leaveRequest[k] = stepContext.parent.values[k]
                }
            }
            await stepContext.context.sendActivity(Constant.ASK_FOR_LEAVE_DIALOG_FLOW)
            return await stepContext.replaceDialog(this.id, dialogOptions)
        }
        if (dialogOptions.luisResult && dialogOptions.luisResult.entities) {
            if (dialogOptions.luisResult.entities.length) {
                let leaveType = dialogOptions.luisResult.entities.find(x => x.entityName === 'LeaveType')
                if (leaveType) {
                    dialogOptions.leaveRequest.hasLeaveType = true
                    dialogOptions.leaveRequest.leaveType = leaveType.entityValue[0][0]
                }
                let leaveOptions = dialogOptions.luisResult.entities.find(x => x.entityName === 'LeaveOptions')
                if (leaveOptions) {
                    dialogOptions.leaveRequest.hasRequestType = true
                    dialogOptions.leaveRequest.leaveRequestType = leaveOptions.entityValue[0][0]
                }
                let dateRange = dialogOptions.luisResult.entities.find(x => x.entityName === 'daterange')
                if (dateRange) {
                    let dateObj = leaveType.entityValue[0].resolution[0]
                    if (dateObj.start)
                        dialogOptions.leaveRequest.FromDate = dateObj.start
                    if (dateObj.end)
                        dialogOptions.leaveRequest.ToDate = dateObj.start
                    dialogOptions.leaveRequest.hasDuration = true
                }
                else {
                    let dateRange = dialogOptions.luisResult.entities.find(x => x.entityName === 'date')
                    if (dateRange) {
                        let dateObj = dateRange.entityValue[0].resolution[0].value
                        if (dateObj) {
                            if (String(dialogOptions.leaveRequest.leaveRequestType).toLowerCase() === FULL_DAY) {
                                dialogOptions.leaveRequest.ToDate = dateObj
                            }
                            dialogOptions.leaveRequest.FromDate = dateObj
                            dialogOptions.leaveRequest.hasDuration = true
                        }
                    }
                }

            }
            if (dialogOptions.leaveRequest.hasLeaveType) {
                return await stepContext.next(dialogOptions)
            }
        }
        if (dialogOptions.leaveRequest.hasLeaveType) {
            return await stepContext.next(dialogOptions)
        }
        await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_TYPE })
        await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(LeaveTypeCard())] })
        return Dialog.EndOfTurn
    }
    async leaveOptionsStep(stepContext) {
        let userInput = stepContext.result
        let dialogOptions = stepContext.options

        if (typeof userInput === 'string' && LeaveType.indexOf(String(userInput).toLowerCase()) == -1) {
            const out = await this.luisValidation(stepContext, 'hasLeaveType', dialogOptions, Constant.VALIDATION_MESSAGE_LEAVE_TYPE, 'LeaveType', LeaveType, userInput)
            if (out && out.exitDialog === 'exitDialog')
                return await stepContext.endDialog({ forLuis: true, userQuery: userInput, luisResult: out.luisResult })
            else
                userInput = out
        }
        if (typeof userInput !== 'string' && userInput.leaveRequest.hasRequestType) {
            return await stepContext.next(userInput)
        }
        else if (!dialogOptions.leaveRequest.hasLeaveType && LeaveType.indexOf(String(userInput).toLowerCase()) !== -1) {
            dialogOptions.leaveRequest.leaveType = userInput
            dialogOptions.leaveRequest.hasLeaveType = true
            //validation
            if (!dialogOptions.leaveRequest.hasRequestType) {
                dialogOptions.isSend = true
                await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_DAY })
                await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(LeaveOptionsCard())] })
            }
            return await stepContext.replaceDialog(this.id, dialogOptions)
        }
        else if (!dialogOptions.isSend && !dialogOptions.leaveRequest.isFromParent && dialogOptions.leaveRequest.hasLeaveType && !dialogOptions.leaveRequest.hasRequestType) {
            await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_DAY })
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(LeaveOptionsCard())] })
        }
        else if (dialogOptions.leaveRequest.isFromParent) {
            dialogOptions.leaveRequest.isFromParent = false
            await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_DAY })
            await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(LeaveOptionsCard())] })
            return await stepContext.replaceDialog(this.id, dialogOptions)
        }
        return Dialog.EndOfTurn
    }

    async dateDurationAskStep(stepContext) {
        let userInput = stepContext.result
        let dialogOptions = stepContext.options
        console.log('sample', dialogOptions)
        dialogOptions.isSend = false
        if (!dialogOptions.leaveRequest.hasRequestType) {
            if (typeof userInput === 'string' && [...LeaveRequestType, FULL_DAY].indexOf(String(userInput).toLowerCase()) == -1) {
                const out = await this.luisValidation(stepContext, 'hasRequestType', dialogOptions, Constant.VALIDATION_MESSAGE_LEAVE_REQUEST_TYPE, 'LeaveOptions', [...LeaveRequestType, 'full day'], userInput)
                if (out && out.exitDialog === 'exitDialog')
                    return await stepContext.endDialog({ forLuis: true, userQuery: userInput, luisResult: out.luisResult })
                else
                    userInput = out
            }
            if (userInput.toLowerCase() === FULL_DAY) {
                dialogOptions.leaveRequest.leaveRequestType = userInput
                dialogOptions.leaveRequest.hasRequestType = true
                if (dialogOptions.leaveRequest.hasDuration) {
                    return await stepContext.next(dialogOptions)
                }
                await this.dateCardBeforUpdate(stepContext, true)

            }
            else if (LeaveRequestType.indexOf(userInput.toLowerCase()) !== -1) {
                dialogOptions.leaveRequest.leaveRequestType = userInput
                dialogOptions.leaveRequest.hasRequestType = true
                if (dialogOptions.leaveRequest.hasDuration) {
                    return await stepContext.next(dialogOptions)
                }
                await this.dateCardBeforUpdate(stepContext, false)
            }
        }
        else if (dialogOptions.leaveRequest.hasRequestType && typeof userInput !== 'string') {
            if (dialogOptions.leaveRequest.leaveRequestType.toLowerCase() === FULL_DAY) {
                if (dialogOptions.leaveRequest.hasDuration) {
                    return await stepContext.next(dialogOptions)
                }
                await this.dateCardBeforUpdate(stepContext, true)

            }
            else if (LeaveRequestType.indexOf(userInput.leaveRequest.leaveRequestType.toLowerCase()) !== -1) {
                if (dialogOptions.leaveRequest.hasDuration) {
                    return await stepContext.next(dialogOptions)
                }
                await this.dateCardBeforUpdate(stepContext, false)
            }
        }
        if (typeof userInput !== 'string' && userInput.leaveRequest.hasDuration) {
            return await stepContext.next(userInput)
        }
        return Dialog.EndOfTurn
    }
    async confirmLeaveStep(stepContext) {


        let userInput = stepContext.result !== 'Submit' ? stepContext.result : stepContext.context.activity.value
        let dialogOptions = stepContext.options
        if (!dialogOptions.leaveRequest.hasDuration) {
            if (typeof userInput === 'string') {
                // user type date then condition
                let dataObj = {}
                let dateRange = false
                if (dialogOptions.leaveRequest.leaveRequestType.toLowerCase() === FULL_DAY) {
                    dateRange = true
                    const out = await this.luisValidation(stepContext, 'hasDuration', dialogOptions, Constant.VALIDATION_MESSAGE_LEAVE_FULL_DAY, 'daterange', [], userInput)
                    if (out && out.exitDialog === 'exitDialog')
                        return await stepContext.endDialog({ forLuis: true, userQuery: userInput, luisResult: out.luisResult })
                    else
                        dataObj = out
                }
                else {
                    const out = await this.luisValidation(stepContext, 'hasDuration', dialogOptions, Constant.VALIDATION_MESSAGE_LEAVE_HALF_DAY, 'date', [], userInput)
                    if (out && out.exitDialog === 'exitDialog')
                        return await stepContext.endDialog({ forLuis: true, userQuery: userInput, luisResult: out.luisResult })
                    else
                        dataObj = out
                }
                if (typeof dataObj === 'string' && dataObj === '') {
                    dialogOptions.leaveRequest.hasDuration = false
                    let currentDate = dateFormatYYYYMMDD()
                    await this.dateCardAfterUpdate(currentDate, currentDate, stepContext, dateRange)
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }
                else {
                    let result = this.leaveDateValidation(FULL_DAY, dataObj.from, dataObj.to === '' ? dataObj.from : dataObj.to)
                    await this.dateCardAfterUpdate(dataObj.from, dataObj.to, stepContext, dateRange)
                    if (result !== '') {
                        dialogOptions.leaveRequest.hasDuration = false
                        await this.errorMessage(result, stepContext.context)
                        return await stepContext.replaceDialog(this.id, dialogOptions)
                    }
                    dialogOptions.leaveRequest.FromDate = dataObj.from
                    dialogOptions.leaveRequest.ToDate = dataObj.to
                    const apiValidate = await this.leaveValidateWithAPI(stepContext)
                    if (apiValidate)
                        dialogOptions.leaveRequest.hasDuration = true
                    else
                        dialogOptions.leaveRequest.hasDuration = false
                    return await stepContext.replaceDialog(this.id, dialogOptions)

                }
            }
            if (userInput && userInput.entity.leaveRequestType.toLowerCase() === FULL_DAY) {
                await this.dateCardAfterUpdate(userInput.FromDate, userInput.ToDate, stepContext, true)
                let result = this.leaveDateValidation(FULL_DAY, userInput.FromDate, userInput.ToDate)
                if (result !== '') {
                    dialogOptions.leaveRequest.hasDuration = false
                    await this.errorMessage(result, stepContext.context)
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }
                dialogOptions.leaveRequest.FromDate = userInput.FromDate
                dialogOptions.leaveRequest.ToDate = userInput.ToDate
                const apiValidate = await this.leaveValidateWithAPI(stepContext)
                if (apiValidate)
                    dialogOptions.leaveRequest.hasDuration = true
                else
                    dialogOptions.leaveRequest.hasDuration = false

            }
            else {
                await this.dateCardAfterUpdate(userInput.FromDate, '', stepContext, false)
                let result = this.leaveDateValidation(HALF_DAY, userInput.FromDate)
                if (result !== '') {
                    dialogOptions.leaveRequest.hasDuration = false
                    await this.errorMessage(result, stepContext.context)
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }
                dialogOptions.leaveRequest.FromDate = userInput.FromDate
                const apiValidate = await this.leaveValidateWithAPI(stepContext)
                if (apiValidate)
                    dialogOptions.leaveRequest.hasDuration = true
                else
                    dialogOptions.leaveRequest.hasDuration = false

            }
            return await stepContext.replaceDialog(this.id, dialogOptions)
        }
        else if (dialogOptions.leaveRequest.hasDuration) {
            if (dialogOptions.leaveRequest.leaveRequestType.toLowerCase() === FULL_DAY) {
                let toDate = dialogOptions.leaveRequest.ToDate
                let result = this.leaveDateValidation(FULL_DAY, dialogOptions.leaveRequest.FromDate, (toDate !== '' ? toDate : dialogOptions.leaveRequest.FromDate))
                if (result !== '') {
                    dialogOptions.leaveRequest.hasDuration = false
                    await this.errorMessage(result, stepContext.context)
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }
                const apiValidate = await this.leaveValidateWithAPI(stepContext)
                if (!apiValidate) {
                    dialogOptions.luisResult = null
                    dialogOptions.leaveRequest.hasDuration = false
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }
            } else {
                let result = this.leaveDateValidation(HALF_DAY, dialogOptions.leaveRequest.FromDate)

                if (result !== '') {
                    dialogOptions.leaveRequest.hasDuration = false
                    await this.errorMessage(result, stepContext.context)
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }

                const apiValidate = await this.leaveValidateWithAPI(stepContext)
                if (!apiValidate) {
                    dialogOptions.luisResult = null
                    dialogOptions.leaveRequest.hasDuration = false
                    return await stepContext.replaceDialog(this.id, dialogOptions)
                }

            }
            if (dialogOptions.leaveRequest.hasLeaveReason) {
                return stepContext.next(userInput)
            }
            await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_REASON })
            return Dialog.EndOfTurn
        }

    }
    async dateCardBeforUpdate(stepContext, isDateRange) {
        let currentLeaveQuota = await this.getLeaveBalance(stepContext)
        await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_DATE })
        let card = MessageFactory.list([CardFactory.adaptiveCard(SelectedDateRang(isDateRange, currentLeaveQuota))])
        let response = await stepContext.context.sendActivity(card)
        let dict = await this.inputCardState.get(stepContext.context, {})
        dict['dateCard'] = {
            activityId: response.id
        }
        return await this.inputCardState.set(stepContext.context, dict)
    }
    async dateCardAfterUpdate(from, to, stepContext, isDateRange) {
        let dict = await this.inputCardState.get(stepContext.context, {})
        const dialogOptions = stepContext.options
        let cardInfo = dict['dateCard']
        let updateCard = MessageFactory.list([CardFactory.adaptiveCard(SelectedDateRangUpdate(from, to, isDateRange, dialogOptions.leaveRequest.leaveType, dialogOptions.leaveRequest.leaveRequestType))])
        updateCard.id = cardInfo.activityId
        updateCard.conversation = stepContext.context.activity.conversation
        updateCard.serviceUrl = stepContext.context.activity.serviceUrl
        return await stepContext.context.updateActivity(updateCard)
    }

    async askforDetails(stepContext) {
        let userInput = stepContext.result
        let dialogOptions = stepContext.options
        const members = await TeamsInfo.getMembers(stepContext.context)
        if (!dialogOptions.leaveRequest.hasLeaveReason) {
            const regx = /^[a-zA-Z0-9\s-.]+$/g
            if (typeof userInput === 'string' && userInput.trim() !== '' && userInput.length < 160 && userInput.length > 2 && regx.test(userInput)) {
                dialogOptions.leaveRequest.hasLeaveReason = true
                dialogOptions.leaveRequest.reason = userInput.trim()
                return await stepContext.replaceDialog(this.id, dialogOptions)
            }
            await this.errorMessage(Constant.VALIDATION_MESSAGE_LEAVE_REASON, stepContext.context)
            return await stepContext.replaceDialog(this.id, dialogOptions)
        }
        await stepContext.context.sendActivity({ text: Constant.ASK_LEAVE_CONFIRMATION })
        let card = MessageFactory.list([CardFactory.adaptiveCard(LeaveRequestConfirm(members[0].name ? members[0].name : '', dialogOptions.leaveRequest))])
        let response = await stepContext.context.sendActivity(card)
        let dict = await this.inputCardState.get(stepContext.context, {})
        dict['confirmLeave'] = {
            activityId: response.id
        }
        await this.inputCardState.set(stepContext.context, dict)
        return Dialog.EndOfTurn
    }
    async leaveSubmitResponseStep(stepContext) {
        let userInput = stepContext.result || stepContext.context.activity.value
        const dialogOptions = stepContext.options
        const bearer = JWTToken()
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        const members = await TeamsInfo.getMembers(stepContext.context)
        let dict = await this.inputCardState.get(stepContext.context, {})
        let cardInfo = dict['confirmLeave']
        let options = new DialogOptions()
        if (['re-apply leave', 'discard', 're-apply', 're apply'].indexOf(String(userInput).toLowerCase()) !== -1) {

            await stepContext.context.deleteActivity(cardInfo.activityId)
            return await stepContext.replaceDialog(this.id, options)
        }
        if (['confirm', 'yes', 'done', 'yes confirm'].indexOf(String(userInput).toLowerCase()) !== -1) {
            let payload = {
                'emp_id': dataFlow.employee.id,
                'data': [{
                    'leave_type_code': Constant.LEAVE_TYPE_CODE[dialogOptions.leaveRequest.leaveRequestType.toLowerCase()],
                    'approver': dataFlow.manager.id,
                    'approver_email': dataFlow.manager.mail,
                    'requestor_email': dataFlow.manager.mail,
                    'from_date': dialogOptions.leaveRequest.FromDate,
                    'to_date': dialogOptions.leaveRequest.ToDate,
                    'leave_category_code': Constant.LEAVE_CATOGARY_TYPE[String(dialogOptions.leaveRequest.leaveType).toLowerCase()],
                    'leave_category_text': dialogOptions.leaveRequest.leaveType,
                    'reason': dialogOptions.leaveRequest.reason
                }]
            }
            let tokenJson = await userValidateToken(bearer, { 'empId': dataFlow.employee.id })
            //let resultValidation = await LeaveRequest.validateLeave(tokenJson.data.token.access_token, payload);
            //if (resultValidation.data && resultValidation.data.status_code === '200') {
            let data = payload.data[0]
            data['total_days'] = dataFlow.isValidateResp.total_days
            data['unique_quota_id'] = dataFlow.isValidateResp.unique_quota_id
            data['is_lwop'] = dataFlow.isValidateResp.is_lwop
            payload.data = [data]
            const resApplyLeave = await LeaveRequest.applyLeave(tokenJson.data.token.access_token, { ...payload, emp_name: dataFlow.employee.CompName, pa: dataFlow.employee.pa, psa: dataFlow.employee.psa })
            if (resApplyLeave.status === 200 && resApplyLeave.data.status_code === '200') {


                await this.updateCard(stepContext, Constant.SUCCESS_MESSAGE_LEAVE_APPLY, members, dialogOptions, cardInfo)
                await await stepContext.context.sendActivity({ text: Constant.HOW_CAN_I_HELP_YOU_FURTHER })
                await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(ManageLeavesCard())] })
                return Dialog.EndOfTurn
            }
            else {
                await this.updateCard(stepContext, Constant[`ERROR_LEAVE_APPLY_${resApplyLeave.data.status}`], members, dialogOptions, cardInfo)
                return await stepContext.replaceDialog(this.id, options)
            }
        }
        else {
            await stepContext.context.sendActivity({ text: Constant.SORRY_I_AM_STILL_LEARNING + ' Please re-enter anagin else you can say exit.' })
            return await stepContext.replaceDialog(this.id, options)
        }

    }
    async updateCard(stepContext, msg, members, dialogOptions, cardInfo) {
        let updateCard = MessageFactory.list([CardFactory.adaptiveCard(LeaveRequestConfirmUpdate(members[0].name ? members[0].name : '', dialogOptions.leaveRequest, msg))])
        updateCard.id = cardInfo.activityId
        updateCard.conversation = stepContext.context.activity.conversation
        updateCard.serviceUrl = stepContext.context.activity.serviceUrl
        return await stepContext.context.updateActivity(updateCard)
    }


    async endStep(stepContext) {
        let userInput = stepContext.result || stepContext.context.activity.value
        if (typeof userInput === 'string')
            return await stepContext.endDialog({ forLuis: true, userQuery: userInput })
        else
            return await stepContext.endDialog({ forLuis: true, userQuery: userInput.intent || 'Hi' })
    }
    async leaveValidateWithAPI(stepContext) {
        const dialogOptions = stepContext.options
        const bearer = JWTToken()
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        let tokenJson = await userValidateToken(bearer, { 'empId': dataFlow.employee.id })
        let payload = {
            'emp_id': dataFlow.employee.id,
            'data': [{
                'leave_type_code': Constant.LEAVE_TYPE_CODE[dialogOptions.leaveRequest.leaveRequestType.toLowerCase()],
                'approver': dataFlow.manager.id,
                'approver_email': dataFlow.manager.mail,
                'requestor_email': dataFlow.manager.mail,
                'from_date': dialogOptions.leaveRequest.FromDate,
                'to_date': dialogOptions.leaveRequest.ToDate,
                'leave_category_code': Constant.LEAVE_CATOGARY_TYPE[String(dialogOptions.leaveRequest.leaveType).toLowerCase()],
                'leave_category_text': dialogOptions.leaveRequest.leaveType,
                'reason': ''
            }]
        }
        let resultValidation = await LeaveRequest.validateLeave(tokenJson.data.token.access_token, payload)
        if (resultValidation.data && resultValidation.data.status_code === '200') {
            dataFlow.isValidateResp = resultValidation.data
            return true
        }
        await this.errorMessage(resultValidation.data.message, stepContext.context)
        return false
    }
    leaveDateValidation(type, from, to) {
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        if (type === FULL_DAY) {
            const dateFrom = new Date(from)
            const dateTo = new Date(to)
            if (currentDate <= dateFrom) {
                if (currentDate <= dateTo)
                    return ''
                else
                    return Constant.VALIDATION_MESSAGE_LEAVE_DATE_RANGE
            }
            else
                return Constant.VALIDATION_MESSAGE_LEAVE_DATE_RANGE
        }
        else if (type === HALF_DAY) {
            const dateFrom = new Date(from)
            if (currentDate <= dateFrom) {
                return ''
            }
            else
                return Constant.VALIDATION_MESSAGE_LEAVE_DATE_RANGE
        }
    }
    async luisValidation(stepContext, key, dialogOptions, text, entityName, option, userInput) {
        if (typeof userInput === 'string' && option.indexOf(String(userInput).toLowerCase()) == -1) {
            let onTurnProperty = await LuisDataFromEntity('ILeaveApply', this.luisRecognizer, stepContext, entityName)
            if (onTurnProperty.exitDialog && onTurnProperty.exitDialog === 'exitDialog') {
                return onTurnProperty
            }
            if (onTurnProperty.from) {
                userInput = onTurnProperty
            }
            else if (option.indexOf(String(onTurnProperty).toLowerCase()) !== -1) {
                userInput = onTurnProperty
            }
            else {
                userInput = ''
                await this.errorMessage(text, stepContext.context)
                if (entityName === 'date' || entityName === 'daterange')
                    return ''
                dialogOptions.leaveRequest[key] = false
                await stepContext.replaceDialog(this.id, dialogOptions)
            }
        }

        return userInput
    }
    async getLeaveBalance(stepContext) {

        const bearer = JWTToken()
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context)
        let tokenJson = await userValidateToken(bearer, { 'empId': dataFlow.employee.id })

        let dataLeaveQuota = await LeaveRequest.leaveQuota(tokenJson.data.token.access_token, { 'emp_id': '509862' || dataFlow.employee.id })
        let quatoCollection = []
        if (dataLeaveQuota.status === 200) {
            if (dataLeaveQuota.data && dataLeaveQuota.data.leave_quota_details) {
                const quotaData = dataLeaveQuota.data.leave_quota_details
                for (let quota in quotaData) {
                    if (['22', '30', '50'].indexOf(quotaData[quota].leave_quota_code) !== -1) {
                        if (quotaData[quota].leave_quota_code == '22')
                            quotaData[quota].leave_quota_text = 'Privilege Leave'
                        quatoCollection.push(quotaData[quota])
                    }
                }

            }
        }
        return quatoCollection
    }






}

module.exports.ApplyLeaveDialog = ApplyLeaveDialog
