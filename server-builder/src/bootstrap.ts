import {LinodeApiClient} from './linode-api-client';
import {SshClient} from './ssh-client';
import {randomBytes} from 'crypto';

class Bootstrap {
    private linodeApiClient: LinodeApiClient;

    private host: string = '';
    private username = 'root';
    private instanceId: number = 0;

    private readonly password: string;

    constructor() {
        this.linodeApiClient = new LinodeApiClient();
        this.password = randomBytes(24).toString('hex');
    }

    async initialize() {
        const response = await this.linodeApiClient.createLinode(this.password);
        this.host = response.ipv4[0];
        this.instanceId = response.id;

        this.outputInstanceInfo();
        this.checkNodeStatus();
    }

    async checkNodeStatus() {
        console.log(`Waiting for instance to be ready.....`);
        const interval = setInterval(async () => {
            const response = await this.linodeApiClient.getLinodeInstance(this.instanceId);

            if (response.status === 'running') {
                console.log('Instance is ready, initializing ssh connection in a moment....');
                clearInterval(interval);
                setTimeout(this.initializeSsh, 20000);
            }
        }, 10000);
    }

    async outputInstanceInfo() {
        console.log('Password: ', this.password);
        console.log('Ip address: ', this.host);
        console.log('Instance ID: ', this.instanceId);
    }

    initializeSsh = () => (new SshClient(this.host, this.username, this.password)).initialize();
}

(new Bootstrap()).initialize();