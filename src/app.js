#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import axios from "axios";
import fs from "fs-extra";

let appId = 0
let userName = ""
let type = ""

async function askId() {
    const answers = await inquirer.prompt({
        name: 'app_id',
        type: 'password',
        message: 'What is your bots client/application/user token?',
    })

    appId = answers.app_id;
}

await askId()

async function askName() {
    const answers = await inquirer.prompt({
        name: 'app_name',
        type: 'number',
        message: 'What is your bots name? (Like just application name)',
    })

    userName = answers.app_name;
}

await askName()

async function askType() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Do you prefer JavaScript or TypeScript?',
            choices: [
                'JavaScript',
                'TypeScript'
            ]
        }
    ])

    type = answers.type
    console.log(type)
}

await askType()

if (type === "JavaScript") {
    const spinner1 = createSpinner('Copying source code').start()
    await fs.mkdirsSync('./src1')
    fs.copy('./templates/javascript', './src1', function (err) {
        if (err) {
            spinner1.error({text: `Something went wrong: ${err}`})
            console.log(err)
        } else {
            spinner1.success({ text: 'Copied files!' })
        }
    })
}

