const { MessageFactory } = require('botbuilder');
const { CosmosDataBase } = require("../db");
const { capitalize } = require('../helper'); 
const {connectionName}= require('./../envConfig')
const {
    LeaveNotifyDialog  } = require('./todoNotify/index.js')
const axios =require('axios');
const cosmos = new CosmosDataBase();
class Notify {
    constructor(adapter, conversationState) {
        this.adapter = adapter;
        this.conversationState = conversationState;
        this.dialogState = this.conversationState.createProperty('DialogStateNotify');
    }
    
    async createContextForLeave(body) {
        let listOfEmails = [];
        let sendFor = body.sendFor;
        for (let i in body.data) {
            listOfEmails.push(body.data[i].details.email);
        }
        //let database = await db.get();
        let res = await cosmos.Find(listOfEmails);
        if (res.length) {
            for (let i in res) {
                let data = body.data.filter(x => x.details.email === res[i].id);
                if (!Array.isArray(data)) {
                    let val = [data];
                    data = val;
                }
                if (data && data.length) {
                    for (let q in data) {
                        this.adapter.continueConversation(res[i].conversion, async turnContext => {
                            const dialog = new LeaveNotifyDialog(this.conversationState, data[q], sendFor);
                            await dialog.run(turnContext, this.dialogState);
                        })
                    }
                }
            }
        }
    }
       
     
    async createContextForLeaveCopy(body) {

        if (body) {
            let res = await cosmos.Find([body.Recipient]);

            if (res.length) {
                for (let i in res) {
                    this.adapter.continueConversation(res[i].conversion, async turnContext => {
                        const dialog = new LeaveNotifyDialog(this.conversationState, body, body.Action);
                        return await dialog.run(turnContext, this.dialogState);
                    })
                }
            }
        }
    }
    async notifyApproveReject(body) {
      
        if (body && Array.isArray(body)) {
            for (let i in body) {
                body[i].Content= Object.keys(body[i].Content.length?body[i].Content[0]:{}).length?body[i].Content: [{}];
                switch (body[i].Type) {
                    case 'Leave':
                        return await this.createContextForLeaveCopy(body[i]) 
                    default:
                        return ;
                }
            }
        }
        else {
            console.log("failed");
        }
    }
   

}


module.exports.Notify = Notify;