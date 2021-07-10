const Constant = require('./constant')
const {DialogOptions}= require('./dialogOptionsModel')
const {OnTurnProperty} = require('./onTurnProperty')
const {CustomeAuth} = require('./customeAuth')
const base64= require('base64url')
var jwt = require('jsonwebtoken')
const envConfig= require('./../envConfig')
module.exports={
    Constant: Constant,
    DialogOptions:DialogOptions,
    OnTurnProperty:OnTurnProperty,
    CustomeAuth:CustomeAuth,
    getUserUniqueName: async (token)=>{
        const jwtParts = token.split('.')
        const payloadInBase64UrlFormat = jwtParts[1]
        return JSON.parse(base64.decode(payloadInBase64UrlFormat||{}))
    },
    capitalize:(input)=> {  
        var words = String(input||'').toLowerCase().replace(/_/i,' ').split(' ')  
        var CapitalizedWords = []  
        words.forEach(element => {  
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length))  
        })  
        return CapitalizedWords.join(' ')  
    },
    errorMiddleware: (error,req, res, next) => { // eslint-disable-line
        if(error.response){
        res.status(error.response.status)
        res.json(error.response.data.error)
        }else{
            res.send(500,error)
        }
    },
    JWTToken:()=>{
      let data={ appId: '2cad4b6f-330a-4967-b453-fdf3aa79dcb1'||envConfig.MSApp.MicrosoftAppId}
      return jwt.sign(data, envConfig.DominName,{'algorithm': 'HS256'})
    },
    dateFormatYYYYMMDD:()=>{
        let date_ob = new Date()  
        let day = ('0' + date_ob.getDate()).slice(-2) 
        let month = ('0' + (date_ob.getMonth() + 1)).slice(-2) 
        let year = date_ob.getFullYear() 
        return year + '-' + month + '-' + day
    },
    dateFormat:(date)=>{
        /**
         * date formate yyyy-mm-dd
         */
        try{
            const dateArray=date.split('-')
            const Year= parseInt(dateArray[0])
            const Month= parseInt(dateArray[1])
            const Day= parseInt(dateArray[2])
            const dateReturn= new Date(Year,Month,Day)
            return dateReturn
        }
        catch(err){
            return new Date()
        }
    },
    LuisData:async (recognizer, stepContext)=> {
        
        let mainDispatchRes = await recognizer.recognize(stepContext.context)
        return new Promise((resolve, reject) => {
            try {
    
                let onTurnProperty = OnTurnProperty.fromLUISResults(mainDispatchRes, null)
                console.log('mainDispatchRes', JSON.stringify(mainDispatchRes))
                console.log(onTurnProperty)
                console.log(reject)
                resolve(onTurnProperty)
            } catch (err) {
                console.log(err)
            }
    
        })
    },
    LuisDataFromEntity:async (intant,recognizer, stepContext, name)=> {
        
        let mainDispatchRes = await recognizer.recognize(stepContext.context)
        if(!mainDispatchRes.intents[intant]){
            const intentsKey=Object.keys(mainDispatchRes.intents)
            if(intentsKey[0]==='None'?false:mainDispatchRes.intents[intentsKey[0]].score>0.80){
                const onTurnProperty=OnTurnProperty.fromLUISResults(mainDispatchRes, null)
                return {exitDialog:'exitDialog',luisResult:onTurnProperty}
            }
        }
        return new Promise((resolve, reject) => {// eslint-disable-line
            try {
                const onTurnProperty=OnTurnProperty.fromLUISResults(mainDispatchRes, null)
                if(name=='date'||name=='daterange'){
                    let date={
                        from:'',
                        to:''
                    }
                    try{
                    if (name=='daterange') {
                        let dataRange= onTurnProperty.entities.find(x=>x.entityName===name)
                        if(!dataRange){
                            dataRange=dataRange?dataRange: onTurnProperty.entities.find(x=>x.entityName==='date')
                        let dateObj = dataRange.entityValue[0].resolution[0]
                        if (dateObj.start|| dateObj.value)
                            date.from = dateObj.start||dateObj.value
                        if (dateObj.end || dateObj.value)
                            date.to = dateObj.end||dateObj.value
                        }
                    }
                    if(name=='date'){
                        let dataRange= onTurnProperty.entities.find(x=>x.entityName===name)
                        if(dataRange){
                        let dateObj = dataRange.entityValue[0].resolution[0].value
                        if (dateObj) {
                            if(String(stepContext.options.leaveRequest.leaveRequestType).toLowerCase()==='full day'){
                                date.to == dateObj
                            }
                            date.from = dateObj
                        }
                    }
                    }
                    resolve(date)
                }catch(err){
                    resolve('')
                }
                }
                else{
                let onTurnProperty =mainDispatchRes.entities[name][0][0]
                resolve(onTurnProperty)
                }
            } catch (err) {
                resolve('')
            }
    
        })
    }

}


