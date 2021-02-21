// Imports the Google Cloud client library
const language = require('@google-cloud/language');

//---------------------------------
var accountSid = 'ACbfa231506cafc7730ee88e5a8d594fab'; // Your Account SID from www.twilio.com/console
var authToken = '75f8e91d1f78a8169e1828938ef3f88b';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var twilio_client = new twilio(accountSid, authToken);

//----------------------------------

//const client = new language.LanguageServiceClient();




async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'you seem very annoying, how about you leave this meeting';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  var msgResp = "negative behavior detected, chat message in response\" " + text +  " \"" ; 

  if (sentiment.score < (-0.2)){
    console.log("badddd")
    twilio_client.messages.create({
      body: msgResp,
      to: '+19494392643',  // Text this number
      from: '+19254063163' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  }


  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}

quickstart()