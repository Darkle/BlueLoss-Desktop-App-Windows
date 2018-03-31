const path = require('path')

const gulp = require('gulp')
const jetpack = require('fs-jetpack')

const newEnvFilePath = path.resolve(__dirname, '..', 'config', '.env')

gulp.task('createEnvFile', () =>
  jetpack.writeAsync(newEnvFilePath, 'rollbarAccessToken=1234')
    .catch(err => {
      console.error(err)
    })
)
