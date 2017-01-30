console.log("This is flashcard.js!");

//Required packages
var inquirer = require("inquirer");
var fs = require("fs");

//Load question files
var basicCard = require("./nfl.js");
var clozeCard = require("./ncaa.js");

var count = 0;
var score = 0;

startgame();

var startgame = function () {
  count = 0;
  score = 0;
  inquirer.prompt([{
    type: "list",
    message: "Choose from the Following:",
    choices: ["Basic", "Cloze"],
    name: "chooseType"
  }]).then(function (answers) {
    if (answers.chooseType === "Basic") {
      askQuestion();
    } else {
      askCloze();
    }
  });
}
