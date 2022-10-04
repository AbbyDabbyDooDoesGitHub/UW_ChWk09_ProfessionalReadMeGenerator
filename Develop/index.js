// TODO: Include packages needed for this application
const inquirer = require("inquirer");


// INCLUDE Y/N VARIABLES
var directory_yn;
var installation_yn;
var usage_yn;
var contributing_yn;
var tests_yn;

// RESPONSE VARIABLES
var title_A;
var description_A;
var directory_A;
var installation_A;
var usage_A;
var license_A;
var license_badge;
var license_badgeExtra;
var contributing_A;
var tests_A;
var gitHubUser_A;
var email_A;

// TODO: Create an array of questions for user input
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
            "Attribution-NoDerivates 4.0 International",
            "Attribution-NonCommmercial-ShareAlike 4.0 International",
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












// INITIALIZE APP
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
            getInfo();
        } else {
            // console.log(confirmNew_A);
            console.log("Okay! Run index.js again when you are ready to generate a README.md");
        }
    });

}


// GET INFO FOR README
function getInfo () {

    // console.log("getinfo ran");

    inquirer.prompt(reqQuestions)
    .then((answers) => {
      console.log(JSON.stringify(answers, null, 2));

      title_A = answers.title;
      description_A = answers.description;
      gitHubUser_A = answers.gitHubUser;
      email_A = answers.email;

      var optsSelected = answers.sections;
    //   console.log(optsSelected[0]);

      var license_simple = answers.license.simple;
      var license_BSD = answers.license.lBSD;
      var license_CC = answers.license.CreativeCommons;
      var license_GNU = answers.license.lGNU;
      var license_OFES = answers.license.OrgForEthicalSrc;
      var license_ODC = answers.license.OpenDataCommons;
      var license_Perl = answers.license.Perl;

      findLicenseBadge(license_simple,license_BSD,license_CC,license_GNU,license_OFES,license_ODC,license_Perl,optsSelected);

    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Your console environment is not supported!")
      } else {
        console.log(error)
      }
    });

}


// GET DECIPHER LICENSE AND BADGE INFO
function findLicenseBadge(license_simple,license_BSD,license_CC,license_GNU,license_OFES,license_ODC,license_Perl,optsSelected) {

    var all_subLicenses = license_BSD + license_CC + license_GNU + license_OFES + license_ODC + license_Perl;

    var licenseArray_Simple = [
        "Apache 2.0 License",
        "Boost Software License 1.0",
        "Eclipse Public License 1.0",
        "IBM Public License Version 1.0",
        "ISC License (ISC)",
        "The MIT License",
        "Mozilla Public License 2.0",
        "SIL Open Font License 1.1",
        "The Unlicense",
        "The Do What the Fuck You Want to Public License (WTFPL)",
        "The zlib/libpng License",
    ];

    var licenseArray_SimpleBadges = [
        "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
        "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
        "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
        "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
        "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
        "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)",
        "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
        "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)",
        "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)",
    ];

    if (license_simple === "SKIP THIS PART - Proceed with No License"){

        license_A = "";
        license_badge = "";
        license_badgeExtra = "";

    }

    for (let i = 0; i < licenseArray_Simple.length; i++) {

        if (license_simple === licenseArray_Simple[i]) {

            license_A = licenseArray_Simple[i];
            license_badge = licenseArray_SimpleBadges[i];
            license_badgeExtra = "";

        }

    }

    if (all_subLicenses == "" || all_subLicenses == null || all_subLicenses == undefined){

        console.log("all_subLicenses was empty");

    } else {

        if (license_BSD === "BSD 3-Clause License") {
            license_A = "BSD 3-Clause License";
            license_badge = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            license_badgeExtra = "";
        } else if (license_BSD === "BSD 2-Clause License") {
            license_A = "BSD 2-Clause License";
            license_badge = "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            license_badgeExtra = "";
        } else if (license_CC === "CC0") {
            license_A = "CC0";
            license_badge = "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)";
            license_badgeExtra = "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
        } else if (license_CC === "Attribution 4.0 International") {
            license_A = "Attribution 4.0 International";
            license_badge = "[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)";
            license_badgeExtra = "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
        } else if (license_CC === "Attribution-ShareAlike 4.0 International") {
            license_A = "Attribution-ShareAlike 4.0 International";
            license_badge = "[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)";
            license_badgeExtra = "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)";
        } else if (license_CC === "Attribution-NonCommercial 4.0 International") {
            license_A = "Attribution-NonCommercial 4.0 International";
            license_badge = "[![License: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc/4.0/)";
            license_badgeExtra = "[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)";
        } else if (license_CC === "Attribution-NoDerivates 4.0 International") {
            license_A = "Attribution-NoDerivates 4.0 International";
            license_badge = "[![License: CC BY-ND 4.0](https://licensebuttons.net/l/by-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nd/4.0/)";
            license_badgeExtra = "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)";
        }

    }

    console.log("license_A is "+ license_A);
    console.log("license_badge is "+ license_badge);
    console.log("license_badgeExtra is "+ license_badgeExtra);

    getOptionalInfo(optsSelected);

}


// GET OPTIONAL INFO FOR README
function getOptionalInfo (array) {
    
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

    // console.log(optQuestions);
    askOptQuestions (optQuestions);

}


// ASK OPTIONAL SECTION QUESTIONS
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


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}


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