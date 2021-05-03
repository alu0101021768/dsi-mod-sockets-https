import {connect} from 'net';
// import {MessageEventEmitterClient} from './messageEventEmitterClient';

const client = connect({port: 60300});

let output = '';
client.on('data', (message) => {
  output += message;
});

client.on('connect', () => {
  client.emit('message', {
    'command': 'ls',
    'options': '-l',
    'path': 'tests/',
  });
  client.end();
});


client.on('error', (err) => {
  console.log('Throwing error: ' + err);
});

client.on('end', () => {
  console.log(output);
});
