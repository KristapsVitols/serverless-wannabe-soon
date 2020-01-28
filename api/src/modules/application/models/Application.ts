import mongoose from 'mongoose';

export enum ApplicationStatus {
    Pending = 'pending',
    Active = 'active',
}

export type ApplicationDocument = mongoose.Document & {
    applicationToken: string;
    applicationId: string;
    password: string;
    name: string;
    host: string;
    status: ApplicationStatus;
}

const applicationSchema = new mongoose.Schema(
    {
        applicationToken: {
            type: String,
            required: true,
        },
        applicationId: {
            type: String,
            required: false,
            default: '',
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        host: {
            type: String,
            required: false,
            default: '',
        },
        status: {
            type: String,
            enum: [ApplicationStatus.Pending, ApplicationStatus.Active],
            default: ApplicationStatus.Pending,
        }
    },
    {
        timestamps: true,
    }
);

export const Application = mongoose.model<ApplicationDocument>('Application', applicationSchema);