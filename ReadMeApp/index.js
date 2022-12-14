// PACKAGES REQUIRED ----------------------------------------------
// FOR IN TEMINAL QUESTIONS
const inquirer = require("inquirer");
// FOR CREATING FILES
const fs = require("fs");
// FOR CODE FROM GENERATE MARKDOWN
const genMd = require("./utils/generateMarkdown");


// QUESTION ARRAY FOR USER INPUT (REQ) ----------------------------
const reqQuestions = [
    {
        type: "list",
        name: "license.simple",
        message: "Great! Let's get the hardest part done first! What license applies to this project?\n  Unsure? visit https://choosealicense.com/",
        choices: [
            "SKIP THIS PART - Proceed with No License",
            "Apache 2.0 License",
            "Boost Software License 1.0",
            "BSD - Select for More Options",
            "Creative Commons - Select for More Options",
            "Eclipse Public License 1.0",
            "GNU - Select for More Options",
            "The Organization for Ethical Source - Select for More Options",
            "IBM Public License Version 1.0",
            "ISC License (ISC)",
            "The MIT License",
            "Mozilla Public License 2.0",
            "Open Data Commons - Select for More Options",
            "Perl - Select for More Options",
            "SIL Open Font License 1.1",
            "The Unlicense",
            "The Do What the Fuck You Want to Public License (WTFPL)",
            "The zlib/libpng License",
        ]
    },
    {
        type: "list",
        name: "license.lBSD",
        message: "What BSD license applies to this project?",
        choices: [
            "BSD 3-Clause License",
            "BSD 2-Clause License",
        ],
        when(answers) {
            return answers.license.simple === "BSD - Select for More Options"
        }
    },
    {
        type: "list",
        name: "license.CreativeCommons",
        message: "What Creative Commons license applies to this project?",
        choices: [
            "CC0",
            "Attribution 4.0 International",
            "Attribution-ShareAlike 4.0 International",
            "Attribution-NonCommercial 4.0 International",
            "Attribution-NoDerivatives 4.0 International",
            "Attribution-NonCommercial-ShareAlike 4.0 International",
            "Attribution-NonCommercial-NoDerivatives 4.0 International",
        ],
        when(answers) {
            return answers.license.simple === "Creative Commons - Select for More Options"
        }
    },
    {
        type: "list",
        name: "license.lGNU",
        message: "What GNU license applies to this project?",
        choices: [
            "GNU GPL v3",
            "GNU GPL v2",
            "GNU AGPL v3",
            "GNU LGPL v3",
            "GNU FDL v1.3",
        ],
        when(answers) {
            return answers.license.simple === "GNU - Select for More Options"
        }
    },
    {
        type: "list",
        name: "license.OrgForEthicalSrc",
        message: "What Organization for Ethical Source license applies to this project?",
        choices: [
            "The Hippocratic License 2.1",
            "The Hippocratic License 3.0",
        ],
        when(answers) {
            return answers.license.simple === "The Organization for Ethical Source - Select for More Options"
        }
    },
    {
        type: "list",
        name: "license.OpenDataCommons",
        message: "What Open Data Commons license applies to this project?",
        choices: [
            "Attribution License (BY)",
            "Open Database License (ODbL)",
            "Public Domain Dedication and License (PDDL)",
        ],
        when(answers) {
            return answers.license.simple === "Open Data Commons - Select for More Options"
        }
    },
    {
        type: "list",
        name: "license.Perl",
        message: "What Perl license applies to this project?",
        choices: [
            "The Perl License",
            "The Artistic License 2.0",
        ],
        when(answers) {
            return answers.license.simple === "Perl - Select for More Options"
        }
    },
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
        type: "checkbox",
        name: "sections",
        message: "Select the sections you'd like in your README.md\n  Title, Description, License, and Questions sections will always be included.",
        choices: [
            "Table of Contents",
            "Installation",
            "Usage",
            "Contributing",
            "Tests",
        ]
    },

];

// QUESTION ARRAY FOR USER INPUT (OPT) ----------------------------
// INSTALLATION QUESTION
const optQuestions_installation = {
    type: "input",
    name: "installation",
    message: "Enter installation instructions: "
};

// USAGE QUESTION
const optQuestions_usage = {
    type: "input",
    name: "usage",
    message: "Enter usage instructions: "
};

// CONTRIBUTING QUESTION
const optQuestions_contributing = {
    type: "input",
    name: "contributing",
    message: "Enter contributing guidelines: "
};

// TESTS QUESTION
const optQuestions_tests = {
    type: "input",
    name: "tests",
    message: "Enter test instructions: "
};


// RUN ON LOAD ----------------------------------------------------
init();


// QUESTION FUNCTIONS ---------------------------------------------
// INITIALIZE APP, CONFIRM NEW README, TRIGGER Q's 
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
        var confirmNew_A = answers.confirmNew;
        if (confirmNew_A === true) {
            // GET REQUIRED INFO FOR README
            inquirer.prompt(reqQuestions)
            .then((answers) => {
                // GET OPTIONAL INFO FOR README
                getOptionalInfo(answers.sections,answers);
        
            })
            .catch((error) => {
              if (error.isTtyError) {
                console.log("Your console environment is not supported!")
              } else {
                console.log(error)
              }
            });
        } else {
            // EXIT MENU - DO NOT GENERATE README
            console.log("Okay! Run index.js again when you are ready to generate a README.md");

            // console.log(confirmNew_A);
        }
    });

}


// GET OPTIONAL INFO FOR README
function getOptionalInfo (array,reqAnswers) {

    // CREATE EMPTY ARRAY FOR OPT QUESTIONS
    const optQuestions = [];

    // OPTIONS SELECTED ARRAY - BOOLEANS
    var optSections_yn = [false, false, false, false, false];

    // FIGURE OUT WHAT OPTIONAL SECTS ARE NEEDED
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "Table of Contents") {
            optSections_yn[0] = true;
        } else if (array[i] === "Installation") {
            optSections_yn[1] = true;
            optQuestions.push(optQuestions_installation);
        } else if (array[i] === "Usage") {
            optSections_yn[2] = true;
            optQuestions.push(optQuestions_usage);
        } else if (array[i] === "Contributing") {
            optSections_yn[3] = true;
            optQuestions.push(optQuestions_contributing);
        } else if (array[i] === "Tests") {
            optSections_yn[4] = true;
            optQuestions.push(optQuestions_tests);
        }
    }

    // console.log(optQuestions);

    // ASK OPTIONAL QUESTIONS
    inquirer.prompt(optQuestions)
    .then((answers) => {

        // console.log(JSON.stringify(answers, null, 2));
        // console.log("optSections_yn is " + optSections_yn);

        // INIT FUNCTION FOR WRITING FILE
        writeToFile("./app_output/README.md", reqAnswers, answers, optSections_yn);

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Your console environment is not supported!")
        } else {
            console.log(error)
        }
    });

}


// WRITE README FILE ----------------------------------------------
function writeToFile(fileName, reqData, data, optSections_yn) {
    // console.log("writeToFile ran");
    // console.log(data);

    const readMeContent = genMd(reqData, data, optSections_yn);

    fs.writeFile(fileName, readMeContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );

}