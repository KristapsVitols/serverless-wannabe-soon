import {RequestHandler} from 'express';
import {config} from 'dotenv';
import {ApplicationService} from '../services/application-service';
import {RedisPublisher} from '../../../listeners/redis-publisher';

config();

export class ApplicationController {
    private readonly applicationService: ApplicationService;
    private readonly redisPublisher: RedisPublisher;

    constructor() {
        this.applicationService = new ApplicationService();
        this.redisPublisher = new RedisPublisher();
    }

    createApplication: RequestHandler = async (req, res) => {
        const {name} = req.body;

        try {
            const application = await this.applicationService.createApplication(name);
            this.redisPublisher.publish('buildServer', JSON.stringify(application));

            res.json({success: true, data: application});
        } catch (err) {
            console.error(err);

            res.json({success: false, error: 'Shit went bad'});
        }
    };
}