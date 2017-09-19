'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());





// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}
function getFlight(intent, session,  callback){
  console.log(intent);
  const flightStatus = intent.slots.status.value;
  const Booking = intent.slots.booking;
  console.log("Booking"+Booking);
  const destiination = intent.slots.city.name;
  const from = intent.slots.fromCity.name;
  const date = intent.slots.date.name;
  console.log("status"+flightStatus);

  console.log("destiination"+destiination);
  console.log("from"+from);
  console.log("date"+date);
  const sessionAttributes = {};
  const cardTitle = 'Hello';
  const shouldEndSession = true;
   if(flightStatus==null && Booking==null ){
     let speechOutput = 'welcome to United Kingdom Airlines. ' +
         'please tell me flight number';
     let repromptText = 'please tell me flight number,' +
         'flight number is ';
      callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }else if(flightStatus==null && Booking!=null){
      let speechOutput = 'welcome to United Kingdom Airlines. ' +
          'please tell me from to destination';
      let repromptText = 'please tell me from to destination' +
          'from to destination';
       callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
    else if(destiination!=null && from!=null){
      let speechOutput = 'please tell me date of jurney';
      let repromptText = 'please tell me date of jurney';
       callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
    else if(destiination!=null && from!=null && Booking !=null){
      let speechOutput = 'your flight ticket book from ' +from+ to +destiination+ 'on Date' +date ;
      let repromptText = 'your flight ticket book from ' +from+ to +destiination+ 'on Date' +date ;
       callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
      else if(flightStatus!=null){
      let speechOutput = 'your flight number ' + flightStatus + ' on time';
      let repromptText = 'your flight number ' + flightStatus + ' on time';
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
      }
}



function getWelcomeResponse(callback) {

    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to Global Desk.';
    const repromptText = 'Welcome to Global Desk!';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function getPizza(intent, session, callback){
    let intentOderid = intent.slots.OderId.value;
    console.log("hello intent testijfdsf"+intentOderid);
    const sessionAttributes = {};
    const cardTitle = 'Hello';
    const shouldEndSession = true;
     if(intentOderid==null){
       let speechOutput = 'welcome to pizza delivery status. ' +
           'please tell me your order id';
       let repromptText = 'please tell me your order id, ' +
           'my oder id is ';
        callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
      }
      else if(intentOderid!=null){
        let speechOutput = 'your oder id' + intentOderid + 'already dispatch  ';
        let repromptText = 'your oder id' + intentOderid + 'already dispatch  , ' + intentOderid;
          callback(sessionAttributes,
              buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }
}


function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you from dominoz pizza. Have a nice day!';
    // Setting this to true ends the session a nd exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);


    getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {
    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;
    console.log("requestname"+intentName);
    // Dispatch to your skill's intent handlers
  //  if (intentName === 'PizzIntent') {
    //    getPizza(intent, session, callback);
    //}
    if (intentName === 'ThanksIntent') {
        handleSessionEndRequest(callback);
    }
    else if (intentName === 'flightIntent') {
        getFlight(intent, session, callback);
    }
    else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

    // Add cleanup logic here
}

restService.post('/pizza', function (req, res) {

    function callback(error, response){
        res.json(response);
        return true;
    }


    let event = req.body;


    if (event.session.new) {
        onSessionStarted({ requestId: event.request.requestId }, event.session);
    }

    if (event.request.type === 'LaunchRequest') {
        onLaunch(event.request,
            event.session,
            (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
            });
    } else if (event.request.type === 'IntentRequest') {
        onIntent(event.request,
            event.session,
            (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
            });
    } else if (event.request.type === 'SessionEndedRequest') {
        onSessionEnded(event.request, event.session);
        callback();
    }

});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
