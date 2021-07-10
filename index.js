const path = require('path')

const dotenv = require('dotenv')
// Import required bot configuration.
const ENV_FILE = path.join(__dirname, '.env') // eslint-disable-line
dotenv.config({ path: ENV_FILE })

const restify = require('restify')


// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter, ShowTypingMiddleware } = require('botbuilder')
const { ConversationState, UserState, MemoryStorage, NullTelemetryClient } = require('botbuilder')
const { ApplicationInsightsTelemetryClient, TelemetryInitializerMiddleware } = require('botbuilder-applicationinsights')
const { TelemetryLoggerMiddleware } = require('botbuilder-core')
//const { getDatabaseTable}= require('./oracledb')
const { MSApp, InstrumentationKey, LoggerEnabled, connectionName } = require('./envConfig')
const { Notify } = require('./notifyGenerator');
const { Bot } = require('./bot')
const { RootDialog } = require('./dialogs')
//end--next config for react
const memoryStorage = new MemoryStorage()
const userState = new UserState(memoryStorage)
const conversationState = new ConversationState(memoryStorage)
// Router


const logger = require('logger').createLogger('./logger/development.log')
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: MSApp.MicrosoftAppId,
    appPassword: MSApp.MicrosoftAppPassword,
})
// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    // if(error.message==="Activity must include non empty 'text' field or at least 1 attachment")
    // return ;
    // console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    if (LoggerEnabled)
        logger.info('catch-error', error, 'now!')
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    )

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.')
    await context.sendActivity('To continue to run this bot, please fix the bot source code.')
}

// Creates a new TelemetryClient based on a instrumentation key
function getTelemetryClient(instrumentationKey) {
    if (instrumentationKey) {
        return new ApplicationInsightsTelemetryClient(instrumentationKey)
    }
    return new NullTelemetryClient()
}

// Add telemetry middleware to the adapter middleware pipeline
const telemetryClient = getTelemetryClient(InstrumentationKey)
//const telemetryClient = getTelemetryClient(false); // Comment this line on production
const telemetryLoggerMiddleware = new TelemetryLoggerMiddleware(telemetryClient)
const initializerMiddleware = new TelemetryInitializerMiddleware(telemetryLoggerMiddleware)
adapter.use(initializerMiddleware)


adapter.onTurnError = onTurnErrorHandler

adapter.use(new ShowTypingMiddleware('3000', '4000'))

const conversationReferences = {}
const rootDialog = new RootDialog(conversationState, userState, telemetryClient)
rootDialog.telemetryClient = telemetryClient
const bot = new Bot(conversationState, userState, rootDialog, conversationReferences)
const server = restify.createServer()
const { OracleDbHandler, getEmployeeData, getAllDoseOneData, getAllDoseTwoData, getVaccinationDataById, postDoseOneData, updateDoseOneData, deleteVaccinationData, getDoseOneDataById, getDoseTwoDataById } = require('./db/oracle')
server.listen(process.env.port || process.env.PORT || 3978, async () => {
    OracleDbHandler.Connection()
    console.log(`\n${server.name} listening to ${server.url}`)
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator')
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"')

})

// Listen for incoming requests.
server.post('/api/messages', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context)
    })
})
//Notification endpoint
server.post('/api/notify-activity', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    //let notify=  new Notify(adapter,conversationState);
    console.log(req.body);
    if (LoggerEnabled)
        logger.info('notify-activity', req.body, 'now!');
    //await notify.notifyPendingActivity(req.body);
    res.send(200);
})
server.post('/api/company-announcements', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    //let notify=  new Notify(adapter,conversationState);
    console.log(req.body);
    if (LoggerEnabled)
        logger.info('company-announcements', req.body, 'now!');
    //await notify.companyAnnouncements(req.body);
    res.send(200);
})
server.post('/api/approve-reject/notify', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    //let notify=  new Notify(adapter,conversationState);
    console.log(req.body);
    if (LoggerEnabled)
        logger.info('approve-reject/notify', req.body, 'now!');
    //await notify.notifyApproveReject(req.body);
    res.send(200);
})
server.get('/app.css', restify.plugins.serveStatic({
    directory: './pages/dist'
}))
server.get('/app.bundle.js', restify.plugins.serveStatic({
    directory: './pages/dist'
}))
server.get('/png', restify.plugins.serveStatic({
    directory: './pages/html'
}))
server.get('/*.html', restify.plugins.serveStatic({
    directory: './pages/html'
}))

server.get('/employees', async (req, res) => {
    const data = await getEmployeeData()
    res.json(data)
})
server.get('/alldoseonedata', async (req, res) => {
    const data = await getAllDoseOneData()
    res.json(data)
})
server.get('/alldosetwodata', async (req, res) => {
    const data = await getAllDoseTwoData()
    res.json(data)
})
server.get('/dosetwodatabyid', async (req, res) => {
    const data = await getDoseOneDataById()
    res.json(data)
})
server.get('/dosetwodatabyid', async (req, res) => {
    const data = await getDoseTwoDataById()
    res.json(data)
})
server.get('/allvaccinationdata', async (req, res) => {
    const data = await getVaccinationDataById()
    console.log(data)
    res.json(data)
})
server.post('/submitdoseonedata', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    console.log(req.body)
    const doseOneDate = req.body.date
    const vaccineBrand = req.body.brand
    try {
        const data = await postDoseOneData(doseOneDate, vaccineBrand)
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
server.post('/submitdosetwodata', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    console.log(req.body)
    const doseTwoDate = req.body.date
    try {
        const data = await postDoseOneData(doseTwoDate)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

server.put('/updatedoseonedata', restify.plugins.bodyParser({ mapParams: false }), async (req, res) => {
    console.log(req.body)
    const updatedDoseOneDate = req.body.date
    const updatedDoseOneBrand = req.body.brand
    try {
        const data = await updateDoseOneData(updatedDoseOneDate, updatedDoseOneBrand)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

server.get('/deletevaccinationdata', async (req, res) => {
    const data = await deleteVaccinationData()
    res.json(data)
})

// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    })
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler
    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await bot.run(context)
    })
})
