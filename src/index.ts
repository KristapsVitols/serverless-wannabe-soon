import express, {Request, Response} from 'express';

const app = express();

app.get('/', (req: Request, res: Response): void => {
    res.send('it works!');
});

app.listen(3456, (err: Error) => {
    console.log(err || 'Server listening on port 3456');
});