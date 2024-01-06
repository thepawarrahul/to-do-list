import express from 'express';
import 'dotenv/config';
import fs from 'fs/promises';

const userDataFileLocation = './database/userData.json';

const server = express();
const serverPort = process.env.SERVER_PORT || 4000;

server.use(express.json());

server.get('/' ,(req, res) => {
    res.send('To do list server');
});

server.post('/registerUser', async (req, res) => {
    // TODO 
    // 1. Add logic to avoid user with same username.
    // 2. Refactor the code to modules.
    const userData = await fs.readFile(userDataFileLocation, 'utf8');
    const userDataJson = JSON.parse(userData);

    const user = {
        id : new Date().getTime(),
        username : req.body.username,
        active : true,
        task : []
    };

    userDataJson.push(user);
    await fs.writeFile(userDataFileLocation, JSON.stringify(userDataJson, null, 2));

    res.send(`User Registered With id ${user.id} and username ${user.username}`);
});

console.log('Starting server on PORT : '+serverPort);
server.listen(serverPort);