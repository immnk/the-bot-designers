var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var constants = require('./modules/constants');
var fbMessenger = require('./modules/fbMessenger');
var app = express();

app.use(express.static('WebContent'));
app.set('port', (process.env.PORT || 5000));
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function(req, res) {
    res.send('Hello world, I am a chat bot')
});

app.get('/login', function(req, res) {
    res.sendFile(constants.HTML_DIR + 'login.html', { root: __dirname });
});

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
});

app.post('/webhook/', function(req, res) {
    messaging_events = req.body.entry[0].messaging
    console.log("messaging_events.length = " + messaging_events.length);
    for (i = 0; i < messaging_events.length; i++) {
        if (event.message && event.message.text) {
            text = event.message.text;
            if (text === 'Generic') {
                fbMessenger.sendGenericMessage(sender)
                continue
            } else if ((text.toLowerCase().indexOf('hi') == 0) || (text.toLowerCase().indexOf('hello') > -1)) {
                console.log("Greeting ENTER");
                fbMessenger.sendTextMessage(sender, "Hi! How Can I help you?");
                continue;
            }
        }
    }
    res.sendStatus(200)
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})