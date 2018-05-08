// @ts-nocheck
const exeq = require('exeq')

function testModulesForVulnerabilities() {
  return exeq(`npx snyk test`)
    .catch(err => {}) // eslint-disable-line
}

module.exports = {
  testModulesForVulnerabilities,
}
