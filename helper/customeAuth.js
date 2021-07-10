const {
    Dialog,
    OAuthPrompt
} = require('botbuilder-dialogs')
const {OAuthLoginTimeoutKey} = require('botbuilder-core')
const {isSkillClaim} = require('botbuilder-dialogs/lib/prompts/skillsHelpers')
const { CardFactory, MessageFactory, InputHints, ActionTypes, Channels } = require('botbuilder')
const {firstCard} = require('./../cards')

 class CustomeAuth extends OAuthPrompt{
     constructor(dialogId,settings,validator){
       super(dialogId,settings,validator)
     }
      async beginDialog(dc, options) {
        // Ensure prompts have input hint set
        const o = { ...options }
        if (o.prompt && typeof o.prompt === 'object' && typeof o.prompt.inputHint !== 'string') {
            o.prompt.inputHint = InputHints.AcceptingInput
        }
        if (o.retryPrompt && typeof o.retryPrompt === 'object' && typeof o.retryPrompt.inputHint !== 'string') {
            o.retryPrompt.inputHint = InputHints.AcceptingInput
        }

        // Initialize prompt state
        const timeout = typeof this.settings.timeout === 'number' ? this.settings.timeout : 900000
        const state = dc.activeDialog.state 
        state.state = {}
        state.options = o
        state.expires = new Date().getTime() + timeout
        state[this.PersistedCaller] = OAuthPrompt.createCallerInfo(dc.context)

        // Attempt to get the users token
        const output = await this.getUserToken(dc.context)
        if (output !== undefined) {
            // Return token
            output['isLogin']=true
            return await dc.endDialog(output)
        } else {
            // Prompt user to login
            await this.sendOAuthCardAsync(dc.context, state.options.prompt)

            return Dialog.EndOfTurn
        }
    }
    async sendOAuthCardAsync(context, prompt) {
        // Validate adapter type
        if (!('getUserToken' in context.adapter)) {
            throw new Error('OAuthPrompt.sendOAuthCardAsync(): not supported for the current adapter.')
        }
        // Initialize outgoing message
        const msg =
            typeof prompt === 'object'
                ? { ...prompt }
                : MessageFactory.text(prompt, undefined, InputHints.AcceptingInput)
        if (!Array.isArray(msg.attachments)) {
            msg.attachments = []
        }

        // Add login card as needed
        if (this.isOAuthCardSupported(context)) {
            const cards = msg.attachments.filter(
                (a) => a.contentType === CardFactory.contentTypes.oauthCard
            )
            if (cards.length === 0) {
                let cardActionType = ActionTypes.Signin
                const signInResource = await (context.adapter).getSignInResource(
                    context,
                    this.settings.connectionName,
                    context.activity.from.id,
                    null,
                    this.settings.oAuthAppCredentials
                )
                let link = signInResource.signInLink
                const identity = context.turnState.get((context.adapter).BotIdentityKey)

                // use the SignInLink when
                //   in speech channel or
                //   bot is a skill or
                //   an extra OAuthAppCredentials is being passed in
                if (
                    (identity && isSkillClaim(identity.claims)) ||
                    OAuthPrompt.isFromStreamingConnection(context.activity) ||
                    this.settings.oAuthAppCredentials
                ) {
                    if (context.activity.channelId === Channels.Emulator) {
                        cardActionType = ActionTypes.OpenUrl
                    }
                } else if (!this.channelRequiresSignInLink(context.activity.channelId)) {
                    link = undefined
                }

                // Append oauth card
                const card = CardFactory.oauthCard(
                    this.settings.connectionName,
                    this.settings.title,
                    this.settings.text,
                    link,
                    signInResource.tokenExchangeResource
                );

                // Set the appropriate ActionType for the button.
                (card.content).buttons[0].type = cardActionType
                const cardJson=firstCard(link, context.activity.from.id)
                msg.attachments.push(CardFactory.adaptiveCard(cardJson))
                //msg.attachments.push(card);
            }
        } else {
            const cards = msg.attachments.filter(
                (a) => a.contentType === CardFactory.contentTypes.signinCard
            )
            if (cards.length === 0) {
                // Append signin card
                const signInResource = await (context.adapter).getSignInResource(
                    context,
                    this.settings.connectionName,
                    context.activity.from.id,
                    null,
                    this.settings.oAuthAppCredentials
                )
                const cardJson=firstCard(signInResource.signInLink, context.activity.from.id)
                msg.attachments.push(CardFactory.adaptiveCard(cardJson))
                //msg.attachments.push(
                //    CardFactory.signinCard(this.settings.title, signInResource.signInLink, this.settings.text)
                //);
            }
        }

        // Add the login timeout specified in OAuthPromptSettings to TurnState so it can be referenced if polling is needed
        if (!context.turnState.get(OAuthLoginTimeoutKey) && this.settings.timeout) {
            context.turnState.set(OAuthLoginTimeoutKey, this.settings.timeout)
        }

        // Send prompt
        await context.sendActivity(msg)
    }
    
}
module.exports.CustomeAuth=CustomeAuth