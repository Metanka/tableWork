import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {withRouter} from 'react-router';

function BreadcrumbsMenu(props) {
    const {history, location: {pathname}} = props;
    const pathnames = pathname.split('/').filter(x => x)

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{marginTop: '100px', marginLeft: '15px', marginBottom: '-70px'}}>
            <Link onClick={() => history.push('/')} color="inherit">Home</Link>
            {pathnames.map((name, index) => (
                <Link key={`item-${index}`} onClick={() => history.push(`/${pathnames.slice(0, index + 1).join('/')}`)} color="inherit" >{name}</Link>
            ))}
        </Breadcrumbs>
    );
}

export default withRouter(BreadcrumbsMenu)