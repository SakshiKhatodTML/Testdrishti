const https = require('https'); 
const server = https.createServer(function (req, res) {  
    //handle incomming requests here..
});
server.listen(process.env.port || process.env.PORT, async () => {
        console.log(`\n${server.name} listening to ${server.url}`)
        console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator')
        console.log('\nTo talk to your bot, open the emulator select "Open Bot"')
})
