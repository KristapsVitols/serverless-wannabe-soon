import {Application, ApplicationStatus} from '../models/Application';
import {randomBytes} from 'crypto';
import {ApplicationRepository} from '../repositories/application-repository';

export class ApplicationService {
    private readonly applicationRepo: ApplicationRepository;

    constructor() {
        this.applicationRepo = new ApplicationRepository();
    }

    createApplication(applicationName: string) {
        const application = new Application();

        application.name = applicationName;
        application.applicationToken = randomBytes(24).toString('hex');
        application.password = randomBytes(24).toString('hex');

        return this.applicationRepo.saveApplication(application);
    };

    async updateApplication(server: any) {
        const app = await this.applicationRepo.findApplicationByToken(server.token);

        if (!app) {
            throw new Error('fuck shiet');
        }

        app.status = ApplicationStatus.Active;
        app.applicationId = server.instanceId;
        app.host = server.host;

        return this.applicationRepo.saveApplication(app);
    }
}