import {Instance} from '../models/Instance';

export class InstanceRepository {
    getInstanceById = (instanceId: string) => Instance.findOne({id: instanceId});

    async addInstance(instanceId: string, instanceUrl: string) {
        const instance = await Instance.create({id: instanceId, url: instanceUrl});

        return instance;
    }
}