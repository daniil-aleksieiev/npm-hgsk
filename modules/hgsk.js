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
    }
  }
  
  console.log('\n*****************************************\n*\tWelcome to GOHUGO Starter Kit\t*\n*****************************************\n'.green);
  
  function gitClone() {
    shell.exec(`${cfg.terminal.create} ${config[0].projectName}`);
    shell.exec(`${cfg.terminal.clone} ${defaultGit} ${config[0].projectName} -b master`);
    shell.cd(config[0].projectName);
    shell.exec(`${cfg.terminal.delete} .git`);
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
  projectType().then(() => {
    let questions = [{
      message: cfg.messages.isHugoInstall,
      type: 'list',
      name: 'value',
      choices: [{
        name: 'Yes',
        value: 'yes',
      }, {
        name: 'No',
        value: 'no',
      }],
    }];
    
    inquirer.prompt(questions).then(answers => {
      switch (answers.value) {
        case 'yes':
          console.log('\nGood!\n'.green);
          setTimeout(() => {
            shell.exec('clear');
            console.log(`\n${cfg.messages.startCloning.green}\n`);
          }, 2000);
          setTimeout(() => {
            gitClone();
            console.log(`\n${cfg.messages.success.green}\n`);
          }, 4000);
          break;
        case 'no':
          console.log(`\n${cfg.messages.hugoInstall.yellow}\n`);
          config.push({
            hugoOnBoard: false,
          });
          setTimeout(() => {
            shell.exec('brew install hugo');
            gitClone();
            console.log(`\n${cfg.messages.success.green}\n`);
          }, 2000);
          break;
        default:
          console.log(cfg.messages.error.red);
          return;
      }
    });
  });
};
