import * as net from 'net';
import {spawn} from 'child_process';

const server = net.createServer(
    {
      allowHalfOpen: true,
    },
    (connection) => {
      console.log('A client has connected.');

      // connection.write('Connection established');

      connection.on('message', (dataObject) => {
        const command = spawn(dataObject.command,
            [dataObject.options, dataObject.path]);
        let outp = '';
        command.stdout.on('data', (output) => {
          outp += output;
        });
        command.on('close', () => {
          connection.write(outp);
          connection.end();
        });
      });

      const timer = setTimeout(() => {
        connection.end();
      }, 500);

      connection.on('end', () => {
        clearTimeout(timer);
      });

      connection.on('close', () => {
        console.log('A client has disconnected');
      });
    });

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
