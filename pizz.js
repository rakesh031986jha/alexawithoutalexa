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


}


function getPizza(intent){
  //var OderId = intent.OderId;
    const cardTitle = 'Pizza World';
    const speechOutput = 'please tell me your order id.';
    const repromptText = 'please tell me your order id!';
    //if(OderId=== null){
      //const ask = 'please tell me your order id.';
    //}
     if(intent=!null){
       const your = 'your oder alredy Dispatch.';
    }
    }

function onIntent(intentRequest) {
    console.log('Pizza world -- example');
    const intent = intentRequest.intent;
    console.log(intentRequest.intent);
    //const intentName = intentRequest.intent.name;
    // Dispatch to your skill's intent handlers
    //if (intent =!null) {
        console.log('PizzIntent');
              getPizza(intent);
    //}
/*
    else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse();
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest();
    } else {
        throw new Error('Invalid intent');
    }*/
}


restService.post('/pizza', function(req, res) {

//    let event = req.body;
    //console.log(event);
    if (req.body.request.type === 'LaunchRequest') {
      getWelcomeResponse();
    }
    else if (req.body.request.type === 'IntentRequest'){
      let intentType= req.body.request.type;
    //  console.log(event);
    var result= onIntent(intentType);
    }



    res.send(result);
});
restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
