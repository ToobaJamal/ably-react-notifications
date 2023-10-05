const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Ably = require("ably");
const cors = require("cors");

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
const activitiesData = JSON.parse(fs.readFileSync("activities.json"));

const client = new Ably.Rest(process.env.API_KEY);

app.get("/auth", (req, res) => {
  const tokenParams = {
    clientId: `anonymous-${Math.random().toString(36).substring(7)}`,
    capability: { '*': ['publish', 'subscribe'] } };
    client.auth.createTokenRequest(tokenParams, (err, token) => {
    if (err) {
      res.status(500).json({ error: "Failed to generate token request" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(token));
    }
  });
});

app.post("/sendbreaktime", (req, res) => {
  const { duration } = req.body;

  const matchedActivity = activitiesData.activities.find(
    (activity) => activity.duration === Number(duration),
  );

  if (matchedActivity) {
    const channel = client.channels.get("activities");
    channel.publish("matched activity", matchedActivity);
    res.json({
      success: true,
      activity: matchedActivity,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No activity found for the specified duration",
    });
  }
});


app.listen(3001, () => console.log("Server started on port 3001"));
