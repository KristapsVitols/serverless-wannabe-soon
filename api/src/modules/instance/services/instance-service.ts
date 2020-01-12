import {InstanceRepository} from '../repositories/instance-repository';

export class InstanceService {
    private instanceRepo: InstanceRepository;

    constructor() {
        this.instanceRepo = new InstanceRepository();
    }

    getInstanceById = (instanceId: string) => this.instanceRepo.getInstanceById(instanceId);
    addInstance = (instanceId: string, instanceUrl: string) => this.instanceRepo.addInstance(instanceId, instanceUrl);
}