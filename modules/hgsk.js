'use strict';

const colors = require('colors'),
      inquirer = require('inquirer'),
      shell = require('shelljs'),
      isWindows = /^win/.test(process.platform),
      defaultGit = 'https://github.com/daniil-aleksieiev/starter-kit-hugo-with-gulp.git';
      // gitClone = require('./git');

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
    shell.exec('mkdir ' + config[0].projectName);
    shell.cd(config[0].projectName);
    shell.exec('git clone ' + defaultGit + ' ./ -b master');
    shell.exec('rm -rf .git');
  }

  function projectType() {
    return new Promise(function (resolve, reject) {
      
      let questions = [{
        message: 'What is the project name?',
        type: 'input',
        name: 'value'
      }];
      
      inquirer.prompt(questions).then(answers => {
        if (answers.value.length !== 0) {
          config.push({
            projectName: answers.value,
          });
        } else {
          console.log('Something went wrong!'.red);
          return;
        }
        resolve();
      });
    });
  }
  projectType().then(() => {
    let questions = [{
      message: 'Do you have Hugo?',
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
            console.log('Now we start!'.green);
          }, 2000);
          setTimeout(() => {
            gitClone();
            console.log('Success!'.green);
          }, 4000);
          break;
        case 'no':
          console.log('We need to install!\n'.yellow);
          config.push({
            hugoOnBoard: false,
          });
          setTimeout(() => {
            shell.exec('brew install hugo');
          }, 2000);
          gitClone();
          break;
        default:
        console.log('Something went wrong!'.red);
        return;
      }
    });
  });
};
