// console.log("This is flashcard.js!");

//Required packages
var inquirer = require("inquirer");
var fs = require("fs");

//Load question files
var basicCard = require("./nfl.js");
var clozeCard = require("./ncaa.js");

var count = 0;
var score = 0;

startgame();

function cloze() {
  if (count < clozeCard.clozeQuestions.length) {
    inquirer.prompt([{
      name: "input",
      message: clozeCard.clozeQuestions[count].text + "_"
    }]).then(function (answers) {
      if (answers.input === clozeCard.clozeQuestions[count].cloze) {
        console.log("Go, fight, win!");
        score++;
      } else {
        console.log("Nope, the answer is " + clozeCard.clozeQuestions[count].cloze);
      }
      count++;
      cloze();
    });
  } else {

    var gameOver = true;
    count = 0;
    if (gameOver === true) {
      inquirer.prompt([{
        type: "list",
        name: "game",
        message: "Your Score was " + score + " answers correct\n  Go again?",
        choices: ["Yes", "No"]
      }]).then(function (answer) {
        if (answer.game === true) {
          startgame();
          endGame = false;
        } else {
          console.log("Take a break, sing your favorite fight song and come back soon!");
        }
      });
    }
  }
}

function question() {

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
            question();
        });
    } else {
        var gameOver = true;
        count = 0;
        if (gameOver === true) {
            inquirer.prompt([{
                type: "list",
                name: "game",
                message: "Your Score was " + score + " answers correct\n  Go again?",
                choices: ["Yes", "No"]
            }]).then(function(answer) {
                if (answer.game === "Yes") {
                    startgame();
                    endGame = false;
                } else {
                    console.log("Until next time.... how bout dem Cowboys!");
                }
            });
        }
    }
}

function startgame() {
    count = 0;
    score = 0;
    inquirer.prompt([{
        type: "list",
        message: "Choose one of the following:",
        choices: ["Basic", "Cloze"],
        name: "chooseType"
    }]).then(function(answers) {
        if (answers.chooseType === "Basic") {
            question();
        } else {
            cloze();
        }
    });
}

//Make NFL card
function BasicCard(front, back) {
  console.log("NFL card")
  this.front = front;
  this.back = back;
};

//Make NCAA card
function ClozeCard(text, cloze) {
  this.text = text;
  this.cloze = cloze;
};
