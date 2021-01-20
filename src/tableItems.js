import {Button} from '@material-ui/core'
import React from 'react'
import Cookies from 'js-cookie'
import {useTable, usePagination, useBlockLayout, useResizeColumns, useRowSelect, useSortBy} from 'react-table'

function TableItems({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    onClickCheckbox,
    setRowId,
    setCheckedValue
}) {
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 110,
            maxWidth: 300,
        }), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        resetResizing,
        state: {pageIndex, pageSize, selectedRowIds},
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {pageIndex: 0},
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        useSortBy,
        usePagination,
        useResizeColumns,
        useBlockLayout,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox id={row.id} {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    )

    const writeData = () => {
        selectedFlatRows.map(d => {
            onClickCheckbox(d.original);
            setRowId(selectedRowIds)
            return d.original
        })
    }

    React.useEffect(() => {
        fetchData({pageIndex, pageSize})
    }, [fetchData, pageIndex, pageSize])

    const handleRadio = (e) => {
        Cookies.set('radioId', `${JSON.stringify(e.target.id)}`)
        selectedFlatRows.map(d => onClickCheckbox(d.original)
        )
    }

    const IndeterminateCheckbox = React.forwardRef(
        ({indeterminate, ...rest}, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (<>
                <input onClick={handleRadio} id={rest.id} type="radio" name='row' ref={resolvedRef} {...rest} />
            </>
            )
        }
    )

    return (
        <div >
            <Button onClick={resetResizing} variant="outlined" size="medium" color="primary" style={{margin: '0 0 30px 10px'}}>Сброс изменений размеров</Button>
            <div className='container' style={{}}>
                <div className='box' >
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map(column => (
                                        <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                            {column.render('Header')}
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                    }`}
                                            />
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </div>))}
                                </div>))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <div {...row.getRowProps()} className="tr">
                                        {row.cells.map(cell => {
                                            return <div className="td" {...cell.getCellProps()}>{cell.render('Cell')}</div>
                                        })}
                                    </div>
                                )
                            })}
                            <tr>
                                {loading ? (
                                    // Use our custom loading state to show a loading indicator
                                    <td colSpan={"10000"}>Loading...</td>
                                ) : (
                                        <td colSpan="10000">
                                            Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                                        </td>
                                    )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '50px'}}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            <pre style={{opacity: 0}}>
                <code>
                    {(() => writeData())()}
                </code>
            </pre>
        </div>
    )
}

export default TableItems;