// @ts-ignore
import NodeSsh from 'node-ssh';
import chalk from 'chalk';

const sshClient = new NodeSsh();

export class SshClient {
    private host: string;
    private username: string;
    private password: string;

    constructor(host: string, username: string, password: string) {
        this.host = host;
        this.username = username;
        this.password = password;
    }

    public async initialize() {
        await this.login();
        await this.setupNode();
        await this.setupExpressServer();
        await this.logout();
    }

    private async login() {
        const {host, username, password} = this;

        console.log(chalk.green.bold('>>>>> Logging in SSH .....'));
        await sshClient.connect({host, username, password});
        console.log(chalk.green.bold('>>>>> Logged in! <<<<<'));
    }

    private async setupNode() {
        // STEP 2
        console.log(chalk.blue.bold('>>>>> Downloading nodejs .....'));
        await sshClient.execCommand('curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -');
        console.log(chalk.blue.bold('>>>>> Downloaded <<<<<'));

        // STEP 3
        console.log(chalk.yellow.bold('>>>>> Installing NodeJS .....'));
        await sshClient.execCommand('sudo apt-get install nodejs');
        console.log(chalk.yellow.bold('>>>>> NodeJS installed <<<<<'));
    }

    private async setupExpressServer() {
        // STEP 4
        console.log(chalk.magenta.bold('>>>>> Copying index.js .....'));
        await sshClient.putFile('./server-templates/base-express.js', 'index.js');
        console.log(chalk.magenta.bold('>>>>> Index.js copied <<<<<'));

        // STEP 5
        console.log(chalk.cyan.bold('>>>>> Initializing npm project .....'));
        await sshClient.execCommand('npm init -y && npm i express');
        console.log(chalk.cyan.bold('>>>>> NPM project initialized <<<<<'));

        // STEP 6
        console.log(chalk.blueBright.bold('>>>>> Starting up server .....'));
        sshClient.execCommand('node index.js');
        console.log(chalk.blueBright.bold('>>>>> Server up! <<<<<'));
    }

    private async logout() {
        console.log(chalk.green.bold('>>>>> All done, exiting server .....'));
        await sshClient.execCommand('exit');
        console.log(chalk.green.bold('>>>>> Ssh connection closed. <<<<<'));
        process.exit(0);
    }
}