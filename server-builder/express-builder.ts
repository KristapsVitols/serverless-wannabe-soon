import {copyFile} from 'fs';
import {exec, spawn} from 'child_process';

export default class ExpressBuilder {
    public initializeProject() {
        console.log('>>>>>> Initializing express project ......');
        exec('mkdir express-server && cd express-server && npm init -y && npm i express', (err, stdout, stderr) => {
            if (err) {
                return console.error(err);
            }

            if (stderr) {
                console.error('Std error: ' + stderr);
            }

            // Output from initializer
            console.log(stdout);

            // Initialization done
            console.log('>>>>>> Project initialized <<<<<<<');

            this.copyServerTemplate();
        });
    }

    private copyServerTemplate() {
        console.log('>>>>>> Copying server template .......');
        copyFile('./express-server/index.js', '../server-templates/base-express.js', err => {
            if (err) {
                return console.error(err);
            }

            console.log('>>>>>>> Server template copied! <<<<<<');

            this.startServer();
        });
    }

    private startServer() {
        console.log('>>>>>> Starting up server .......');
        const expressProcess = spawn('node', ['./express-server/index.js'], {stdio: 'inherit'});
        expressProcess.on('data', data => {
            console.log(data.toString());
        });
    }
}