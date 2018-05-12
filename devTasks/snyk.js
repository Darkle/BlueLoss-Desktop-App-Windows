// @ts-nocheck
const exeq = require('exeq')
const inquirer = require('inquirer')

const promptOptions = {
  type: 'confirm',
  name: 'fixIssues',
  message: 'Would You Like To Fix Any Issues Shown?',
  default: true,
}

function testModulesForVulnerabilities() {
  return exeq(`npx snyk test`)
    .then(() => inquirer.prompt([promptOptions]))
    .then(({fixIssues}) => {
      if(fixIssues){
        return exeq(`npx snyk wizard`)
      }
    })
    .catch(err => {
      console.error(err)
    })
}

module.exports = {
  testModulesForVulnerabilities,
}
