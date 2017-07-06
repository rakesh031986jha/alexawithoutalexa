'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());
function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the Pizz delvery update. ' +
        'Please tell me your order id,'+'my oder is';
    const repromptText = 'Please tell me your order id,'+'my oder is';
    const shouldEndSession = false;
    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function getPizza(intent, session, callback){
    const sessionAttributes = {};
    const cardTitle = 'Hello World';
    const speechOutput = 'Welcome to Hello World.';
    const repromptText = 'Hello World Again!';
    const shouldEndSession = true;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

}

function onIntent(intentRequest, session, callback) {
    console.log('Hello world -- example');
    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;
    // Dispatch to your skill's intent handlers
    if (intentName === 'PizzIntent') {
        getPizza(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}


app.post('/pizza', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    let event = req.body;


    if (event.request.type === 'LaunchRequest') {
        onLaunch(event.request,
            event.session,
            (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
            });
    }

    res.send(user_id + ' ' + token + ' ' + geo);
});




var languageStrings = {
    "en": {
        "translation": {
                      "SKILL_NAME": "Minecraft Helper",
            "WELCOME_MESSAGE": "Welcome to %s. You can ask a question like, what\'s the recipe for a chest? ... Now, what can I help you with.",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - Recipe for %s.",
            "HELP_MESSAGE": "You can ask questions such as, what\'s the recipe, or, you can say exit...Now, what can I help you with?",
            "HELP_REPROMPT": "You can say things like, what\'s the recipe, or you can say exit...Now, what can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "RECIPE_REPEAT_MESSAGE": "Try saying repeat.",
            "RECIPE_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know ",
            "RECIPE_NOT_FOUND_WITH_ITEM_NAME": "the recipe for %s. ",
            "RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME": "that recipe. ",
            "RECIPE_NOT_FOUND_REPROMPT": "What else can I help with?"
        }
    },
    "en-US": {
        "translation": {
            "RECIPES" : recipes.RECIPE_EN_US,
            "SKILL_NAME" : "American Minecraft Helper"
        }
    },
