// TODO: Include packages needed for this application
const inquirer = require("inquirer");
var ui = new inquirer.ui.BottomBar();

    // INCLUDE Y/N VARIABLES
    var directory_yn;
    var installation_yn;
    var usage_yn;
    var license_yn;
    var contributing_yn;
    var tests_yn;

    // RESPONSE VARIABLES
    var title_A;
    var description_A;
    var directory_A;
    var installation_A;
    var usage_A;
    var license_A;
    var contributing_A;
    var tests_A;
    var gitHubUser_A;
    var email_A;

// TODO: Create an array of questions for user input
const reqQuestions = [
    {
        type: "input",
        name: "gitHubUser",
        message: "Enter your GitHub username: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address: "
    },
    {
        type: "input",
        name: "title",
        message: "Enter your project title: "
    },
    {
      	type: "input",
        name: "description",
        message: "Enter a project description: "
    },
    {
        // license stuff
        type: "list",
        name: "license",
        message: "What license applies to this project?",
        choices: [
            "0-1",
            "1-3",
            "3-5",
            "5-10",
            "10+"
        ]
    },
    {
        type: "checkbox",
        name: "sections",
        message: "Select the sections you'd like in your README.md (title, description, license (when applicable), and contact sections will always be included)",
        choices: [
            "Table of Contents",
            "Installation",
            "Usage",
            "Contributing",
            "Tests",
        ]
    },

];

const optQuestions_installation = {
    type: "input",
    name: "installation",
    message: "Enter installation instructions: "
};

const optQuestions_usage = {
    type: "input",
    name: "usage",
    message: "Enter usage instructions: "
};


const optQuestions_contributing = {
    type: "input",
    name: "contributing",
    message: "Enter contributing guidelines: "
};

const optQuestions_tests = {
    type: "input",
    name: "tests",
    message: "Enter test instructions: "
};









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
        // console.log(`Hello ${answers.confirmNew}!`);
        var confirmNew_A = answers.confirmNew;
        if (confirmNew_A === true) {
            getInfo();
        } else {
            // console.log(confirmNew_A);
            console.log("Okay! Run index.js again when you are ready to generate a README.md");
        }
    });

}


// GET INFO FOR README
function getInfo () {
    console.log("getinfo ran");

    inquirer.prompt(reqQuestions)
    .then((answers) => {
      console.log(JSON.stringify(answers, null, 2));

      title_A = answers.title;
      description_A = answers.description;
      gitHubUser_A = answers.gitHubUser;
      email_A = answers.email;

      optsSelected = answers.sections;
      console.log(optsSelected[0]);
      getOptionalInfo(optsSelected);

    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Your console environment is not supported!")
      } else {
        console.log(error)
      }
    });

}


// GET INFO FOR README
function getOptionalInfo (array) {
    console.log("getinfo ran");
    
    const optQuestions = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] === "Table of Contents") {
            directory_yn = true;
        } else if (array[i] === "Installation") {
            installation_yn = true;
            optQuestions.push(optQuestions_installation);
        } else if (array[i] === "Usage") {
            usage_yn = true;
            optQuestions.push(optQuestions_usage);
        } else if (array[i] === "Contributing") {
            contributing_yn = true;
            optQuestions.push(optQuestions_contributing);
        } else if (array[i] === "Tests") {
            tests_yn = true;
            optQuestions.push(optQuestions_tests);
        }

    }

    console.log(optQuestions);
    askOptQuestions (optQuestions);

}


function askOptQuestions (optQuestions) {

    inquirer.prompt(optQuestions)
    .then((answers) => {
        console.log(JSON.stringify(answers, null, 2));

        installation_A = answers.installation;
        usage_A = answers.usage;
        contributing_A = answers.contributing;
        tests_A = answers.tests;
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Your console environment is not supported!")
        } else {
            console.log(error)
        }
    });
}


// Function call to initialize app
init();















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