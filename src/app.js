#!/usr/bin/env node

import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fse from "fs-extra";
import * as fs from 'fs';

let appId = ""
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
    await fse.mkdirsSync('./src1')
    fse.copy('./templates/javascript', './src1', function (err) {
        if (err) {
            spinner1.error({text: `Something went wrong: ${err}`})
            console.log(err)
        } else {
            spinner1.success({ text: 'Copied files!' })
        }
    })

    const spinner2 = createSpinner('Creating config files').start()
    const fileStream1 = fs.createWriteStream('bab.config.js');
    fileStream1.once('open', function (fd) {
        fileStream1.write(`const token = ${appId};\n`)
        fileStream1.write(`const appName = ${userName};\n`)
        fileStream1.write(`\nexport { token, appName }`)
    })
}

if (type === "TypeScript") {
    const spinner1 = createSpinner('Copying source code').start()
    await fse.mkdirsSync('./src1')
    fse.copy('./templates/typescript', './src1', function (err) {
        if (err) {
            spinner1.error({text: `Something went wrong: ${err}`})
            console.log(err)
        } else {
            spinner1.success({ text: 'Copied files!' })
        }
    })

    const spinner2 = createSpinner('Creating config files').start()
    const fileStream1 = fs.createWriteStream('bab.config.js');
    fileStream1.once('open', function (fd) {
        fileStream1.write(`const token = ${appId};\n`)
        fileStream1.write(`const appName = ${userName};\n`)
        fileStream1.write(`\nexport { token, appName }`)
    })
}

