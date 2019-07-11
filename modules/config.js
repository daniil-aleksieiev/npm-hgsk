module.exports = {
  terminal: {
    create: 'mkdir',
    delete: 'rm -rf',
    clone: 'git clone',
    localVer: 'npm list hgsk -g | grep hgsk@ | egrep -o "([0-9]{1,}\.)+[0-9]{1,}"',
    lastVer: 'npm view hgsk version',
    brewInstall: 'brew install hugo'
  },
  messages: {
    error: 'Something went wrong',
    projectName: 'What is the project name?',
    good: 'Good!',
    isHugoInstall: 'Do you have Hugo installed?',
    startCloning: 'Now we start!',
    success: 'Success',
    hugoInstall: 'First we will install Hugo',
    upd: 'You should update the gohugo:\nsudo npm install hgsk --global',
    needInstall: 'Hugo is not installed\nWe will install Hugo on your computer',
    time: 'This may take some time...'
  }
};