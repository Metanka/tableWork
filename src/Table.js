import {Button, makeStyles, TextField} from '@material-ui/core';
import React, {useEffect, useMemo, useState} from 'react'
import Styles from './Styles';
import Cookies from 'js-cookie'
import TableItems from './tableItems';
import {TableData} from './apiServise';
import {apiTable} from './api'

const useStyles = makeStyles((theme) => ({
    button: {
        height: '40px',
        margin: '5px'
    },
    form: {
        maxWidth: '80vw',
        width: '60vw',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.down('md')]: {
            width: '50vw',
          },
          [theme.breakpoints.down('sm')]: {
            maxWidth: '90vw',
          },
    },
    input: {
        margin: '5px'
    }
}));

function Table() {
    const classes = useStyles();
    const [serverData, setServerData] = useState([]);
    const [values, setValues] = useState([]);
    const [rowId, setRowId] = useState({});
    const tableData = useMemo(() => new TableData(values, serverData), [values, serverData]);
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [entered, setEntered] = React.useState('');
    const [updated, setUpdated] = React.useState('');

    useEffect(() => {
        if (!savedData()) {
            apiTable.getMenu().then(json => {
                const rowData = JSON.parse(JSON.stringify(json.value)).data
                const initialData = rowData.map(element => {
                    return {...element, entered: element.entered.slice(0, 10), updated: new Date(element.updated).toUTCString().slice(4, 22)};
                });
                setServerData(initialData)
            })
        } else {
            setServerData(savedData())
        }
    }, [])

    const savedData = () => {
        if (!Cookies.get('changedData')) {
            return
        }
        return JSON.parse(Cookies.get('changedData'))
    }

    const getLastValue = () => {
        if (!Cookies.get('lastValue')) {
            return ''
        }
        return JSON.parse(Cookies.get('lastValue'))
    }
    const lastValue = getLastValue();

    const columns = React.useMemo(
        () => [
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                ],
            },
            {
                Header: 'Date',
                columns: [
                    {
                        Header: 'Entered',
                        accessor: 'entered',
                    },
                    {
                        Header: 'Updated',
                        accessor: 'updated',
                    },
                ],
            },
        ],
        []
    )

    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handleNameInput = (e) => {
        setName(e.target.value);
    }

    const handleEnteredInput = (e) => {
        setEntered(e.target.value);
    }

    const handleUpgradeInput = (e) => {
        setUpdated(e.target.value);
    }

    const handleClickCheckbox = (value) => setValues(value);

    const prepareMainData = (formValue) => {
        setServerData(tableData.changeData(Object.keys(rowId)[0], formValue))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        prepareMainData({
            id: id,
            name: name,
            entered: entered,
            updated: updated
        })
        setId('')
        setName('')
        setEntered('')
        setUpdated('')
        Cookies.set('lastValue', `${JSON.stringify(values)}`)
        Cookies.set('id', `${Object.keys(rowId)[0]}`)
        Cookies.set('changedData', `${JSON.stringify(serverData)}`)
    }

    const fetchData = React.useCallback(({pageSize, pageIndex}) => {
        const fetchId = ++fetchIdRef.current;
        setLoading(true);
        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(serverData.slice(startRow, endRow))
                setPageCount(Math.ceil(serverData.length / pageSize))
                setLoading(false)
            }
        }, 1000)
    }, [serverData])

    return (
        <>
            <form id='change-row-form' className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.input} onChange={handleIdInput} id="outlined-id" label="Id" size="small" variant="outlined" value={id || values.id || lastValue.id || ''} />
                <TextField className={classes.input} onChange={handleNameInput} id="outlined-name" label="Name" size="small" variant="outlined" value={name || values.name || lastValue.name || ''} />
                <TextField className={classes.input} onChange={handleEnteredInput} id="outlined-entered" label="Entered" size="small" variant="outlined" value={entered || values.entered || lastValue.entered || ''} />
                <TextField className={classes.input} onChange={handleUpgradeInput} id="outlined-updated" label="Updated" size="small" variant="outlined" value={updated || values.updated || lastValue.updated || ''} />
                <Button type='submit' className={classes.button} variant="outlined" color="primary">
                    Сохранить
            </Button>
            </form>
            <div>
                <Styles>
                    <TableItems
                        columns={columns}
                        data={data}
                        fetchData={fetchData}
                        loading={loading}
                        pageCount={pageCount}
                        onClickCheckbox={handleClickCheckbox}
                        setRowId={setRowId}
                    />
                </Styles>
            </div>
        </>
    )
}

export default Table