import fetch from 'node-fetch';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();

export class LinodeApiClient {
    private readonly apiKey: string;
    private readonly apiUrl: string;

    constructor() {
        this.apiKey = process.env.LINODE_API_TOKEN as string;
        this.apiUrl = process.env.LINODE_API_URL as string;
    }

    async createLinode(password: string) {
        console.log(chalk.red.bold('>>>>> Attempting to create a new node .....'));

        const res = await fetch(`${this.apiUrl}/linode/instances`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'g6-nanode-1',
                region: 'us-east',
                image: 'linode/debian9',
                root_pass: password,
                label: 'testing-apix2'
            })
        });

        console.log(chalk.red.bold('>>>>> API call finished, returning data <<<<<'));

        return res.json();
    }

    async getLinodeInstance(instanceId: number) {
        const res = await fetch(`${this.apiUrl}/linode/instances/${instanceId}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        });

        return res.json();
    }

    async listLinodes() {
        const res = await fetch(`${this.apiUrl}/linode/instances`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        });

        return res.json();
    }
}