import {LinodeApiClient} from './linode-api-client';
import {ServerBuilder} from './server-builder';

export class Bootstrap {
    private linodeApiClient: LinodeApiClient;

    private host: string = '';
    private username = 'root';
    private instanceId: number = 0;

    private readonly password: string;
    private readonly name: string;
    private readonly token: string;

    constructor(token: string, name: string, password: string) {
        this.linodeApiClient = new LinodeApiClient();
        this.password = password;
        this.name = name;
        this.token = token;
    }

    async initialize() {
        const response = await this.linodeApiClient.createLinode(this.name, this.password);
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
                console.log('Application is ready, initializing ssh connection in a moment....');
                clearInterval(interval);
                setTimeout(this.setupServer, 20000);
            }
        }, 10000);
    }

    async outputInstanceInfo() {
        console.log('Password: ', this.password);
        console.log('Ip address: ', this.host);
        console.log('Application ID: ', this.instanceId);
    }

    setupServer = () => (new ServerBuilder(this.host, this.username, this.password, this.token, this.instanceId)).initialize();
}