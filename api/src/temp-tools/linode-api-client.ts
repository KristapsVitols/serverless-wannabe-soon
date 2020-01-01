// const fetch = require('node-fetch');
//
// class LinodeAPIClient {
//     constructor() {
//         this.apiKey = 'yessss-indeeed';
//         this.apiUrl = 'https://api.linode.com/v4';
//     }
//
//     async createLinode() {
//         const res = await fetch(`${this.apiUrl}/linode/instances`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${this.apiKey}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 type: 'g5-standard-2',
//                 region: 'us-east',
//                 image: 'linode/debian9',
//                 root_pass: 'some-password-hoho',
//                 label: 'testing-api'
//             })
//         });
//
//         const data = await res.json();
//
//         console.log(data);
//     }
//
//     async deleteLinode() {
//         const res = await fetch(`${this.apiUrl}/linode/instances/${18972874}`, {
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Bearer ${this.apiKey}`,
//             }
//         });
//
//         const data = await res.json();
//
//         console.log(data);
//     }
//
//     async listLinodes() {
//         const res = await fetch(`${this.apiUrl}/linode/instances`, {
//             headers: {
//                 Authorization: `Bearer ${this.apiKey}`
//             }
//         });
//
//         const data = await res.json();
//
//         console.log(data);
//     }
// }
//
// const linodeAPIClient = new LinodeAPIClient;
//
// (async () => await linodeAPIClient.deleteLinode())();