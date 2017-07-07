'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

   function getWelcomeResponse() {
        const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the Pizz delvery update. ' +
        'Please tell me your order id,'+'my oder is';
    const repromptText = 'Please tell me your order id,'+'my oder is';
    const shouldEndSession = false;

}


function getPizza(intent){
  var OderId = this.event.request.intent.slots.OderId;
    const cardTitle = 'Pizza World';
    const speechOutput = 'please tell me your order id.';
    const repromptText = 'please tell me your order id!';
    if(OderId=== null){
      const ask = 'please tell me your order id.';
    }else if(intent=!null){
       const your = 'your oder alredy Dispatch.';
    }
    }

function onIntent(intentRequest) {
    console.log('Hello world -- example');
    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;
    // Dispatch to your skill's intent handlers
    if (intentName === 'PizzIntent') {
        getPizza(intent);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse();
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest();
    } else {
        throw new Error('Invalid intent');
    }
}


app.post('/pizza', function(req, res) {

    let event = req.body;
    if (req.body.request.type === 'LaunchRequest') {
      getWelcomeResponse();
    }
    else if (req.body.request.type === 'IntentRequest'){
     onIntent(event.request.type);
    }



    res.send(user_id + ' ' + token + ' ' + geo);
});
