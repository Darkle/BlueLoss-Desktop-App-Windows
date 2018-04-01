// @ts-nocheck
const path = require('path')

const jetpack = require('fs-jetpack')

const newEnvFilePath = path.resolve(__dirname, '..', 'config', '.env')

function createEnvFile(){
  return jetpack.writeAsync(newEnvFilePath, 'rollbarAccessToken=1234')
    .catch(err => {
      console.error(err)
    })
}

module.exports = {
  createEnvFile
}
