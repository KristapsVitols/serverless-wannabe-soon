import {Application, ApplicationDocument} from '../models/Application';

export class ApplicationRepository {
    saveApplication = (application: ApplicationDocument) => application.save();
    findApplicationByToken = (applicationToken: string) => Application.findOne({applicationToken});
}