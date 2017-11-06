const spawn = require('child_process').spawn;
const path = '../../friendship-ml/proximidade.py';
const process = spawn('python3', [path]);

let output = '';

process.stdout.on('data', (data) => output += data.toString());
process.stdout.on('end', () => console.log(JSON.parse(output)));

// process.stdin.write(JSON.stringify)