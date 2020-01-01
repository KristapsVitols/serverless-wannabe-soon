import {copyFile} from 'fs';
import {exec, spawn} from 'child_process';

exec('mkdir express-server && cd express-server && npm init -y && npm i express', (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    console.log('---------- DONE -----------');

    copyFile('./express-server/index.js', '../server-templates/base-express.js', err => {
        if (err) {
            return console.error(err);
        }

        console.log('All done!');

        console.log('Starting up server...');

        const expressProcess = spawn('node', ['./express-server/index.js'], {stdio: 'inherit'});
        expressProcess.on('data', data => {
            console.log(data.toString());
        });
    });
});