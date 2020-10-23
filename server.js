"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

let isJoke = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    res.status(200).json({ status: 200, message });
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const response = Math.floor(Math.random() * messages.length);
    const message = { author: "monkey", text: messages[response] };
    const randomTimer = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTimer);
  })

  .get("/parrot-message", (req, res) => {
    const { userMessage } = req.query;
    const message = { author: "parrot", text: userMessage };
    const randomTimer = Math.floor(Math.random() * 2000);
    console.log(req.query);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTimer);
  })

  .get("/bot-message", (req, res) => {
    const { userMessage } = req.query;

    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "hey"];
      const commonGoodbyes = ["bye", "later", "goodbye"];
      const commonJokes = [
        `Have you heard about the new corduroy pillow cases? They're making headlines!`,
        `A book just fell on my head, I only have my shelf to blame.`,
        `People are making apocalypse jokes like there's no tomorrow...`,
      ];

      let botMsg = "";

      if (commonGreetings.includes(text.toLowerCase())) {
        botMsg = "Hello!";
      } else if (commonGoodbyes.includes(text.toLowerCase())) {
        botMsg = "Goodbye!";
      } else if (userMessage.includes("something funny")) {
        botMsg = "Would you like to hear a joke? (YES/NO)";
        isJoke = true;
      } else if (isJoke && userMessage.includes("yes")) {
        botMsg = commonJokes[Math.floor(Math.random() * commonJokes.length)];
        isJoke = false;
      } else {
        botMsg = userMessage;
      }
      return botMsg;
    };

    const message = {
      author: "chat-bot",
      text: `Bzzzt ${getBotMessage(userMessage)}`,
    };
    const randomTimer = Math.floor(Math.random() * 2000);
    console.log(req.query);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTimer);
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
