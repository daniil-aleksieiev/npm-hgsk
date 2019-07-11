'use strict';

const colors      = require('colors'),
      inquirer    = require('inquirer'),
      shell       = require('shelljs'),
      cfg         = require('./config.js'),
      isWindows   = /^win/.test(process.platform),
      defaultGit  = 'https://github.com/daniil-aleksieiev/starter-kit-hugo-with-gulp.git';

let config = [];

module.exports = () => {
  // Check the gohugo version (currently doesn't work on Windows)
  if (!isWindows) {
    let remoteVersion,
        localVersion;
    console.log('Local version: '); 
    localVersion = exec(cfg.terminal.localVer);
    console.log('Latest version: ');
    remoteVersion = exec(cfg.terminal.lastVer);
    if (localVersion < remoteVersion) {
      console.log(`\n${cfg.messages.upd.red}`);
      return;
    } 
  }

  console.log(`\nCheck for Hugo path:\n`)

  let isHugo = exec('which hugo');

  if (!isHugo.length) {
    hugoInstall().then(() => {
      hgsk();
    });
  } else {
    hgsk();
  }

  function hgsk() {
    console.log('\n*****************************************\n*\tWelcome to GOHUGO Starter Kit\t*\n*****************************************\n'.green);
    projectType().then(() => {
      createProject();
    });
  }

  function hugoInstall() {
    return new Promise(function (resolve, reject) {
      shell.exec('clear');
      console.log(`\n${cfg.messages.needInstall.red}\n`);
      setTimeout(() => {
        console.log(`\n${cfg.messages.time.yellow}\n`);
        shell.exec(`${cfg.terminal.brewInstall}`);
        resolve();
      }, 1000);
    });
  }

  function gitClone() {
    const projectName = config[0].projectName;
    shell.exec(`${cfg.terminal.create} ${projectName}`);
    shell.exec(`${cfg.terminal.clone} ${defaultGit} ${projectName} -b master`);
    shell.cd(projectName);
    shell.exec(`${cfg.terminal.delete} .git`);
  }

  function createProject() {
    console.log(`\n${cfg.messages.good.green}\n`)
    setTimeout(() => {
      shell.exec('clear');
      console.log(`\n${cfg.messages.startCloning.green}\n`);
    }, 2000);
    setTimeout(() => {
      gitClone();
      console.log(`\n${cfg.messages.success.green}\n`);
    }, 4000);
  }

  function projectType() {
    return new Promise(function (resolve, reject) {
      let questions = [{
        message: cfg.messages.projectName,
        type: 'input',
        name: 'value',
      }];
      inquirer.prompt(questions).then(answers => {
        if (answers.value.length !== 0) {
          config.push({
            projectName: answers.value,
          });
        } else {
          console.log(cfg.messages.error.red);
          return;
        }
        resolve();
      });
    });
  }

}