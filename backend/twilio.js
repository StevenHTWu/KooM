var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = process.env.TWILIO_SID;
var API_KEY_SID = process.env.TWILIO_KOOM_SID_KEY;
var API_KEY_SECRET = process.env.TWILIO_KOOM_SECRET_KEY;

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// Set the Identity of this token
accessToken.identity = 'example-user';

// Grant access to Video
var grant = new VideoGrant();
grant.room = 'cool room';
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();
console.log(jwt);