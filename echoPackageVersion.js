var fs = require('fs');
var filename = process.argv[2] || 'package.json';
var json = JSON.parse(fs.readFileSync(filename, {encoding: 'utf8'}));
console.log(json.version);