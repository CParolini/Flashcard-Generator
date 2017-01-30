console.log("This is flashcard.js!");

//Required packages
var inquirer = require("inquirer");
var fs = require("fs");

//Load question files
var basicCard = require("./nfl.js");
var clozeCard = require("./ncaa.js");
