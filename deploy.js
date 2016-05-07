var shell = require('shelljs')
var path = require('path')

if (!process.argv[2]) {
  console.log('See ' + path.basename(__filename) + ' to customize your deploy command')
  return
}

var projectName = require('./projectName')
if (!projectName) {
  console.log('Please enter your project name in projectName.js')
}

var dirs = require('./dirs')

console.log()
console.log('Building Webpack bundles for deployment...')
console.log()
require('./predeploy')(function(err) {
  if (err) shell.exit(1)
  deploy()
})

function deploy() {
  switch (process.argv[2]) {

  case 'meteor.com':
    shell.cd(dirs.meteor)
    shell.exec('meteor deploy ' + projectName + '.meteor.com', {async: true})
    break

  case 'modulus':
    process.env.METEOR_SETTINGS = shell.cat('settings/prod.json')
    shell.cd(dirs.meteor)
    shell.exec('modulus deploy --project-name ' + projectName, {async: true})
    break

  case 'mup':
    console.log("Make sure to mup init and mup setup before first deploy")
    /*
     * you will also need to move settings/prod.json to settings/prod/settings.json
     * then mup init inside settings/prod/ so that mup uses the new settings.json
     * this will require a settings path change in ./dev script
     */
    shell.cd('settings/prod')
    shell.exec('mup deploy', {async: true})
    break

  case 'demeteorizer':
    shell.rm('-rf', 'dist/bundle')
    shell.mkdir('-p', 'dist/bundle')
    shell.cd(dirs.meteor)
    shell.exec("demeteorizer -o ../dist/bundle --json '" + shell.cat('../settings/prod.json') + "'", {async: true})
    // run your own command to deploy to your server
    break

  default:
    console.log('See ' + path.basename(__filename) + ' to customize your deploy command')
  }
}
