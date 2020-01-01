import express, {Request, Response} from 'express';

const app = express();

app.get('/api', (req: Request, res: Response): void => {
    res.send('it works!');
});

app.listen(5000, (err: Error) => {
    console.log(err || 'Server listening on port 5000');
});