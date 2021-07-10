module.exports={
    MSApp:{
        MicrosoftAppId: process.env.MicrosoftAppId,
        MicrosoftAppPassword: process.env.MicrosoftAppPassword
    }, 
    Luis:{
        LuisAppId:process.env.LuisAppId||"c0f653f3-b711-4e16-8804-0156dec80ea8",
        LuisAPIKey: process.env.LuisAPIKey ||"f41a5886a671436aa98ea8780baea58c",
        LuisAPIHostName: process.env.LuisAPIHostName|| "https://thermaxluis.cognitiveservices.azure.com",
    },
    InstrumentationKey: process.env.InstrumentationKey||"", 
    LoggerEnabled:process.env.LoggerEnabled||true,
    BaseUrl: process.env.BaseUrl||"https://db6f69f80888.ngrok.io",
    connectionName : process.env.connectionName||"AD2Tata"
}