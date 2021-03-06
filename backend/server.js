require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.get("/token/:identity", function (req, res) {
  const identity = req.params.identity;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    jwt: token.toJwt(),
  });
});

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

server.listen(3001, function () {
  console.log("listening on port 3001");
});
