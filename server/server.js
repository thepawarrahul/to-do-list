import express from 'express';
import 'dotenv/config';
import fs from 'fs/promises';
import cors from 'cors';

const userDataFileLocation = './database/userData.json';

const server = express();
const serverPort = process.env.SERVER_PORT || 4000;

server.use(express.json());
server.use(cors());

server.get('/' ,(req, res) => {
    res.send('To do list server');
});

// API end point to register new user.
// request contains username.
// Returns the user id after adding new user to the database.
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

// API End point to login.
// Gets the username from the url parameter.
// Returns username and id from the database.
server.get('/login', async (req, res) => {
    const usernameFromUri = req.query.username;
    
    const userData = await fs.readFile(userDataFileLocation, 'utf8');
    const userDataJson = JSON.parse(userData);

    const result = userDataJson.filter((user) => user.username === usernameFromUri);

    if (result.length === 0) {
        res.send({ message: `User Not found with username ${usernameFromUri}` });
        return;
    }

    res.json({ id: result[0].id, username: result[0].username });
});

// API end point to add new task.
// Date format 2024-01-07
// Returns the success response.
server.post('/createTask', async (req, res) => {
    const username = req.body.username;
    const task = req.body.task;
    const taskDate = req.body.date;

    //TO-DO
    // Add validation for username, task and date.

    const userData = await fs.readFile(userDataFileLocation, 'utf8');
    const userDataJson = JSON.parse(userData);

    const taskData = {
        id : new Date().getTime(),
        task : task,
        date : taskDate,
        isDone : false
    }

    userDataJson.forEach((user) => {
        if (user.username === username) {
            console.log('User Found...');
            user.task.push(taskData);
        }
    });

    await fs.writeFile(userDataFileLocation, JSON.stringify(userDataJson, null, 2));

    res.send({ message : "Task Added Successfully."});
});

// API end point to get task for user.
// Request contains username, date
// List of Tasks with task data.
server.get('/getTasks', async(req, res) => {
    const usernameFromUri = req.query.username;
    const taskDateFromUri = req.query.date;

    const userData = await fs.readFile(userDataFileLocation, 'utf8');
    const userDataJson = JSON.parse(userData);

    const tasksToReturn = [];
    
    userDataJson.forEach((user) => {
        if (user.username === usernameFromUri) {
            user.task.forEach((task) => {
                if (task.date === taskDateFromUri) {
                    tasksToReturn.push({
                        id : task.id,
                        task : task.task,
                        date : task.date,
                        isDone : task.isDone
                    });
                }
            });
        }
    });

    res.send(tasksToReturn);
});

// API end point to mark task as done.
// POST reques with username and taskId.
server.post('/closeTask', async(req, res) => {
    const usernameFromUri = req.body.username;
    const taskIdFromUri = req.body.taskId;

    const userData = await fs.readFile(userDataFileLocation, 'utf8');
    const userDataJson = JSON.parse(userData);

    userDataJson.forEach((user) => {
        if (user.username === usernameFromUri) {
            user.task.forEach((task) => {
                if (task.id === taskIdFromUri) {
                    console.log('Taks found ...');
                    task.isDone = true
                }
            });
        }
    });
    
    await fs.writeFile(userDataFileLocation, JSON.stringify(userDataJson, null, 2));

    res.send({ message : "Task Updated."});
});

console.log('Starting server on PORT : '+serverPort);
server.listen(serverPort);