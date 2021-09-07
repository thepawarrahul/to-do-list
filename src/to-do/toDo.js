import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toDoList : {
        width : '100%',
        maxWidth: 360,

    },
    toDoListItem : {
        '&:hover': {
            background: "#f5f5f5",
        },
    },
    toDoTaskField : {
        width : '100%',
        maxWidth: 360
    },
    taskComplete : {
        textDecoration : 'line-through'
    },
    addTaskButton : {
        marginLeft : '1rem',
        marginTop : '1rem',
    },
}));

const ToDoApp = () => {
    const [toDoList, setToDoList] = useState([]);
    const [taskToDo, setTaskToDo] = useState('');
    
    const handleAddTask = (event) => {
        event.preventDefault();

        const task = {
            id : new Date().getTime().toString(),
            taskToDo,
            checked : false
        };

        setToDoList((toDoList) => {
            return [...toDoList, task]
        }); 
        
        setTaskToDo('');
    };

    const handleTaskInputChange = (event) => {
        setTaskToDo(event.target.value);
    };

    const handleRemoveTaskSelected = (event) => {
        const result = toDoList.filter((task) => {
            if (task.id === event.target.value) {
                task.checked = true;
                return task;
            }

            return task;
        });
        

        setToDoList(result);
        event.target.disabled = true;
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Typography variant="h3" component="h3" gutterBottom>
                        To Do List
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <List className={classes.toDoList}>
                       {
                           toDoList.map((task) => {
                               return (
                                    <ListItem 
                                        className={task.checked ? classes.taskComplete : classes.toDoListItem} 
                                        key={task.id}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                value={task.id}
                                                onClick={handleRemoveTaskSelected}
                                            />
                                            </ListItemIcon>
                                        <ListItemText primary={`${task.taskToDo} ${task.checked}`} />
                                    </ListItem>
                               );
                           })
                       }
                    </List>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <form onSubmit={handleAddTask}>
                        <TextField 
                            id="standard-basic" 
                            label="Add task"
                            value={taskToDo}
                            onChange={handleTaskInputChange}
                            required
                        />
                        <Fab className={classes.addTaskButton}
                             size="small" 
                             color="primary" 
                             aria-label="add"
                             type="submit"
                        >
                            <AddIcon />
                        </Fab>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ToDoApp;