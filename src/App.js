import React, {useEffect, useState} from 'react';
import Table from './Table';
import {makeStyles} from '@material-ui/core/styles';
import Navigation from './Navigation.js';
import {Route, Switch} from 'react-router';
import {apiMenu, apiFts} from './api';
import BreadcrumbsMenu from './BreadcrumbsMenu';


// Выводит в консоль данные или ошибку
apiFts.getMenu().then(res => console.log(res)).catch(err => console.log(err));

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

    useEffect(() => {
        apiMenu.getMenu().then(data => setStore(data.value.data)).catch(err => console.log(err))
    }, [])

    return (
        <div className={classes.root}>
            <Navigation menuData={store} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <BreadcrumbsMenu menuData={store} />
                <Switch>
                    <Route path='/child433' exact>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Table />
                        </main>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default App;
