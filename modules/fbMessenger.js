var constants = require('./constants');
var request = require('request');

module.exports = {

    sendTextMessage: function(sender, text) {
        console.log('Entering fbMessenger:sendTextMessage');
        messageData = {
            text: text
        };

        request({
            url: constants.FB_MESSAGES_URL,
            qs: { access_token: constants.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: sender },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        });
        console.log('Exiting fbMessenger:sendTextMessage');
    },

    sendGenericMessage: function(sender, messageData) {
        console.log('Entered generic message');
        request({
            url: constants.FB_MESSAGES_URL,
            qs: { access_token: constants.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: sender },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            } else {
                console.log("SUCCESS");
            }
        });
    }

}
