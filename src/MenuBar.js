import React, {Component} from 'react'
import {List} from '@material-ui/core'
import {ListItem} from '@material-ui/core'
import {ListItemText} from '@material-ui/core'
import {Collapse} from '@material-ui/core';
import {ExpandLess} from '@material-ui/icons'
import {ExpandMore} from '@material-ui/icons'
import {Drawer} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {Link, withRouter} from 'react-router-dom'

const styles = {
    list: {
        width: 250,
        textDecoration: 'none',
        color: 'black',
    },
    links: {
        textDecoration: 'none',
        color: 'black',
        margin: 'auto',
    },
    menuHeader: {
        margin: 'auto',
        textDecoration: 'none',
        color: 'black',
        fontSize: '2rem'
    }
};
class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.menuItems = props.dataMenu
        this.state = {}
    }
    // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
    handleClick(item) {
        this.setState(prevState => (
            {[item]: !prevState[item]}
        ))
    }
    // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
    handler(children) {
        if (!children) return
        const {classes} = this.props
        const {state} = this

        return children.map((subOption) => {
            if (!subOption.children) {
                return (
                    <div key={subOption.name}>
                        <ListItem
                            button
                            key={subOption.name}>
                            <Link
                                to={subOption.url}
                                className={classes.links}>
                                <ListItemText
                                    inset
                                    primary={subOption.name}
                                />
                            </Link>
                        </ListItem>
                    </div>
                )
            }
            return (
                <div key={subOption.name}>
                    <ListItem
                        button
                        onClick={() => this.handleClick(subOption.name)}>
                        
                        <ListItemText
                            inset
                            primary={subOption.name} />
                        {state[subOption.name] ?
                            <ExpandLess /> :
                            <ExpandMore />
                        }
                    </ListItem>
                    <Collapse
                        in={state[subOption.name]}
                        timeout="auto"
                        unmountOnExit
                    >
                        {this.handler(subOption.children)}
                    </Collapse>
                </div>
            )
        })
    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.list}>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open
                    classes={{paper: classes.list}}>
                    <div>
                        <List>
                            <ListItem
                                key="menuHeading"
                                divider
                                disableGutters
                            >
                                <Link to='/'>
                                    <ListItemText
                                        className={classes.menuHeader}
                                        inset
                                        primary="Главная"
                                    />
                                </Link>
                            </ListItem>
                            {this.handler(this.menuItems.data)}
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}
export default withRouter(withStyles(styles)(MenuBar))