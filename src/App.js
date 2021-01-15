import React, {useEffect, useState} from 'react';
import {apiMenu} from './api';
import Table from './Table';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Navigation from './Navigation';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    root: {
        display: 'flex',
    },
}));

const App = (props) => {
    const classes = useStyles();
    const [store, setStore] = useState([])

    useEffect(() =>
        apiMenu.getMenu().then(data => setStore(data.value.data)).catch(err => console.log(err)), []
    )

    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Table />
            </main>
        </div>
    )
}

export default App;
