// TODO: Include packages needed for this application
const json = require('./package.json');
const generateMarkdown = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const api = require('./utils/api.js');
const fs = require('fs');
const util = require('util');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        default: 'kingrex0830',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'your-repository',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "(Optional) Describe how to install your project here.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Describe how your project is used.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "(Optional) How could other developers contribute to this project?",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "(Optional) Provide any methods of testing your app you have devised.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
  ];
  
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Successful generation: YourREADME.md")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
  try {

    // Prompt Inquirer questions
    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log("Thank you for your responses! Fetching your GitHub data next...");

    // Call GitHub api for user info
    const userInfo = await api.getUser(userResponses);
    console.log("Your GitHub user info: ", userInfo);

    // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
    console.log("Generating your README next...")
    const markdown = generateMarkdown(userResponses, userInfo);
    console.log(markdown);

    // Write markdown to file
    await writeFileAsync('YourREADME.md', markdown);

} catch (error) {
    console.log(error);
}
}

// Function call to initialize app
init();