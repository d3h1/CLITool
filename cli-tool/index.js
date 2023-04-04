#!/usr/bin/env node

// Imports needed to make this work
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

// console.log(chalk.bgGreen('Hi mom'));

let playerName;

// Timeout function for our welcome prompt using promises
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Welcome function that will use chalk to animate/color certain lines
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be rich? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any questions wrong, I will be ${chalk.bgRed('killed')}
        So get all the questions right . . .
    `);
}

// Handling our loading to the right answer using nanospinner along with conditionals to tell us if the answer was wrong or correct
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    // If Else will have a spinner effect and output differently based on your output to the known answer
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. Keep it goin!` });
      } else {
        spinner.error({ text: `YOU LOST ${playerName}!` });
        process.exit(1);
      }
}

// Now we will use inquirer to ask user name, etc...
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';''
        },
    });

    playerName = answers.player_name;
}

async function winner() {
    console.clear();
    const msg = `Congrats ${playerName} ! \n$1,000,000`;

    figlet(msg, (err,data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

// Handling multiple answers using inquirer types such as list
// !Question 1
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days then release on: \n',
        choices: [
          'May 23rd, 1995',
          'Nov 24th, 1995',
          'Dec 4th, 1995',
          'Dec 17th, 1996',  
        ],
    });

    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}
// !Question 2
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Lukes uncle from ROJ: \n',
        choices: [
          'Anakin',
          'CP30',
          'None of the above',
          'Leia',  
        ],
    });

    return handleAnswer(answers.question_2 === 'None of the above');
}
// !Question 3
async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'What does f{} stand for in python \n',
        choices: [
          'a for loop',
          'an f string',
          'a first position in an array',
          'a hashloop',  
        ],
    });

    return handleAnswer(answers.question_3 === 'an f string');
}
// !Question 4
async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'PACMAN is what color: \n',
        choices: [
          'yellow',
          'yellow',
          'yellow',
          'yellow',  
        ],
    });

    return handleAnswer(answers.question_4 === 'yellow');
}
// !Question 5
async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'What are running in this program: \n',
        choices: [
          'a cli',
          'a loop',
          'a snake',
          'a data strucutre',  
        ],
    });

    return handleAnswer(answers.question_5 === 'a cli');
}





// !Our top level await
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();
