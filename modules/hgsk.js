'use strict';

const colors = require('colors'),
      inquirer = require('inquirer'),
      shell = require('shelljs'),
      cfg         = require('./config.js'),
      isWindows = /^win/.test(process.platform),
      defaultGit = 'https://github.com/daniil-aleksieiev/starter-kit-hugo-with-gulp.git';

let config = [];

module.exports = () => {
  // Check the gohugo version (currently doesn't work on Windows)
  // if (!isWindows) {
  //   let remoteVersion,
  //     localVersion;
  
  //   console.log('Local version: ');
  //   localVersion = exec('npm list hgsk -g | grep hgsk@ | egrep -o "([0-9]{1,}\.)+[0-9]{1,}"');
  //   console.log('Latest version: ');
  //   remoteVersion = exec('npm view hgsk version');
  
  //   if (localVersion < remoteVersion) {
  //     console.log('You should update the gohugo:\nsudo npm install hgsk -g'.red);
  //   }
  // }
  
  console.log('\n*****************************************\n*\tWelcome to GOHUGO Starter Kit\t*\n*****************************************\n'.green);
  
  function gitClone() {
    shell.exec(`${cfg.terminal.create} ${config[0].projectName}`);
    shell.cd(config[0].projectName);
    shell.exec(`${cfg.terminal.clone} ${defaultGit} ./ -b master`);
    shell.exec(`${cfg.terminal.delete} .git`);
  }

  function projectType() {
    return new Promise(function (resolve, reject) {
      
      let questions = [{
        message: cfg.messages.projectName,
        type: 'input',
        name: 'value'
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
        value: 'yes'
      }, {
        name: 'No',
        value: 'no'
      }],
    }];
    
    inquirer.prompt(questions).then(answers => {
      switch (answers.value) {
        case 'yes':
          console.log('Good!\n'.green);
          setTimeout(() => {
            shell.exec('clear');
            console.log(cfg.messages.startCloning.green);
          }, 2000);
          setTimeout(() => {
            gitClone();
            console.log(cfg.messages.success.green);
          }, 4000);
          break;
        case 'no':
          console.log('\n' + cfg.messages.hugoInstall.yellow + '\n');
          config.push({
            hugoOnBoard: false,
          });
          setTimeout(() => {
            shell.exec('brew install hugo');
            gitClone();
            console.log('\n' + cfg.messages.success.green + '\n');
          }, 2000);
          break;
        default:
          console.log(cfg.messages.error.red);
          return;
      }
    });
  });
};
