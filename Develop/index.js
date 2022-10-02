// TODO: Include packages needed for this application
const inquirer = require("inquirer");
var ui = new inquirer.ui.BottomBar();

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {

    inquirer.prompt([
        {
            name: 'confirmNew',
            message: 'Would you like to generate a new README.md?',
            type: 'confirm',
            default: false
        }
    ])
    .then((answers) => {
        console.log(`Hello ${answers.confirmNew}!`);
        var confirmNew_A = answers.confirmNew;
        if (confirmNew_A === true) {
            getInfo();
        } else {
            console.log(confirmNew_A);
            console.log("Okay! Run index.js again when you are ready to generate a README.md");
        }
    });

}


function getInfo () {
    console.log("getinfo ran");

}

// function writeMe(writeThis){
//     console.log(writeThis);
// }

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




// var ui = new inquirer.ui.BottomBar();

// // pipe a Stream to the log zone
// outputStream.pipe(ui.log);

// // Or simply write output
// ui.log.write('something just happened.');
// ui.log.write('Almost over, standby!');

// // During processing, update the bottom bar content to display a loader
// // or output a progress bar, etc
// ui.updateBottomBar('new bottom bar content');