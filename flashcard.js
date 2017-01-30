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

var askQuestion = function() {

    if (count < basicCard.basicQuestions.length) {
        inquirer.prompt([{
            name: "input",
            message: basicCard.basicQuestions[count].front
        }]).then(function(answers) {
            if (answers.input === basicCard.basicQuestions[count].back) {
                console.log("Keep going!");
                score++;
            } else {
                console.log("Sorry, the correct answer is " + basicCard.basicQuestions[count].back + " Current score = " + score);
            }
            count++;
            askQuestion();
        });
    } else {
        var gameOver = true;
        count = 0;
        if (gameOver === true) {
            inquirer.prompt([{
                type: "list",
                name: "game",
                message: "Your Score was " + score + " answers correct\n  Would you like to try again?",
                choices: ["Yes", "No"]
            }]).then(function(answer) {
                if (answer.game === "Yes") {
                    startgame();
                    endGame = false;
                } else {
                    console.log("Until next time.... how bout dem Cowboys@");
                }
            });
        }
    }
}

var startgame = function() {
    count = 0;
    score = 0;
    inquirer.prompt([{
        type: "list",
        message: "Choose from the Following:",
        choices: ["Basic", "Cloze"],
        name: "chooseType"
    }]).then(function(answers) {
        if (answers.chooseType === "Basic") {
            askQuestion();
        } else {
            askCloze();
        }
    });
}
