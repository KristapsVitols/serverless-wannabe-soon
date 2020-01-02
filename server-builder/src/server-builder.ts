// @ts-ignore
import NodeSsh from 'node-ssh';
import chalk from 'chalk';

/**
 * TODO: Add some sort of step output
 * TODO: Output from all commands
 */
export class ServerBuilder {
    private sshClient: NodeSsh;
    private host: string;
    private username: string;
    private password: string;
    private connectionAttempts: number = 0;

    constructor(host: string, username: string, password: string) {
        this.sshClient = new NodeSsh();
        this.host = host;
        this.username = username;
        this.password = password;
    }

    public async initialize() {
        await this.login();
        await this.setupDocker();
        await this.setupTemplateFiles();
        await this.runDocker();
        await this.logout();
    }

    private async login() {
        const {host, username, password} = this;

        console.log(chalk.green.bold('>>>>> Logging in SSH .....'));

        try {
            this.connectionAttempts++;
            await this.sshClient.connect({host, username, password});

            console.log(chalk.green.bold('>>>>> Logged in! <<<<<'));
        } catch (error) {
            console.log(error.message);
            console.log(`Attempting to login again in 5s... Current attempt count: ${this.connectionAttempts}`);
            setTimeout(() => this.login(), 5000);
        }
    }

    private async setupDocker() {
        console.log(chalk.blue.bold('>>>>> Setting up Docker .....'));

        const re1 = await this.sshClient.execCommand('sudo apt-get update');
        console.log(re1.stdout);

        const re2 = await this.sshClient.execCommand('sudo apt-get remove docker docker-engine docker.io');
        console.log(re2.stdout);

        const re3 = await this.sshClient.execCommand('sudo apt-get install docker.io -y');
        console.log(re3.stdout);

        const re4 = await this.sshClient.execCommand('sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose');
        console.log(re4.stdout);

        const re5 = await this.sshClient.execCommand('sudo chmod +x /usr/local/bin/docker-compose');
        console.log(re5.stdout);

        const re6 = await this.sshClient.execCommand('sudo systemctl start docker');
        console.log(re6.stdout);

        const re7 = await this.sshClient.execCommand('sudo systemctl enable docker');
        console.log(re7.stdout);

        console.log(chalk.blue.bold('>>>>> Docker has been setup <<<<<'));
    }

    private async setupTemplateFiles() {
        console.log(chalk.cyan.bold('>>>>> Setting up server template files .....'));

        const failed: [string?] = [];
        const successful: [string?] = [];

        const status = await this.sshClient.putDirectory('./server-templates/express-base', 'express-base', {
            recursive: true,
            concurrency: 10,
            tick: (localPath: string, remotePath: string, error: any) => {
                if (error) {
                    failed.push(localPath);
                } else {
                    successful.push(localPath);
                }
            }
        });

        console.log('the directory transfer was', status ? 'successful' : 'unsuccessful');
        console.log('failed transfers', failed.join(', '));
        console.log('successful transfers', successful.join(', '));

        console.log(chalk.cyan.bold('>>>>> Server templates have been setup <<<<<'));
    }

    private async runDocker() {
        console.log(chalk.red.bold('>>>>> Running Docker .....'));

        await this.sshClient.execCommand('docker-compose -f express-base/docker-compose.yml up -d');

        console.log(chalk.red.bold('>>>>> Docker is up and running .....'));
    }

    private async logout() {
        console.log(chalk.green.bold('>>>>> All done, exiting server .....'));

        await this.sshClient.execCommand('exit');

        console.log(chalk.green.bold('>>>>> Ssh connection closed. <<<<<'));

        process.exit(0);
    }
}