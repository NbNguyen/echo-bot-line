'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'WfwuD4mE3t0lGSZbBiCi0jCHNrncg2tYutnswaSRFB+vEHDTNajUz+ImRquYWJbEXXvMozjmUfKdK/CfkRewSdq//Nu3sy5XLQm0gjZmYSbrwyqnslmgAuZ5pVlb5sRqyDzoUeajzCvmsCSy4+HImgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '39b34584223b7d514b5777d7b8b3d22b',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 1234 || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
