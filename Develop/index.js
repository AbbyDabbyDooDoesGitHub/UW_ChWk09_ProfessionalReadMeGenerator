// TODO: Include packages needed for this application
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {

    inquirer.prompt([
        {
            name: 'greeting',
            message: 'What would you like to say?',
            type: 'confirm'
        }
    ])
    .then(function(answer){
        console.log(answer);
    });


    // test();
    // getInfo();
}


function test () {
    inquirer.prompt([
        {
        name: 'greeting',
        message: 'What would you like to say?',
        type: 'input'
        }])
        .then(function(answer){
        console.log(answer);
        });
}

function getInfo () {
    inquirer.prompt([
        {
        name: 'greeting',
        message: 'What would you like to say?',
        type: 'confirm'
        }])
        .then(function(answer){
        console.log(answer);
        });
}


// Function call to initialize app
init();



// var inquirer = require('inquirer');
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });


// var prompt = inquirer.createPromptModule();

// prompt(questions).then(/* ... */);


// 1inquirer.prompt([
//     2  {
//     3    name: "greeting",
//     4    message: "What would you like to say?",
//     5    type: "input",
//     6  },
//     7  {
//     8    name: "colors",
//     9    message: "What's your favorite color?",
//     10   type: "list",
//     11   choices: ["black", "red", "blue", "yellow", "green", "whitesmoke"]
//     12 }])
//     13.then(function (answer) {
//     14 console.log(answer.greeting);
//     15 console.log(answer.colors);
//     16 });