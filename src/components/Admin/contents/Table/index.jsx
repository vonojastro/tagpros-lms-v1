import React from 'react'
import he from "he";
import { useTable, usePagination, useFilters, useGlobalFilter, useSortBy, useExpanded } from 'react-table'
import './index.css'
import Tagpi from 'components/common/Tagpi';
import ColumnFilter from './Filters/ColumnFilter';
// import { useMemo } from 'react';

export default function Table({setToggleSortFilter, toggleSortFilter, loading, error, columns, data, title,filterColumn = 'status', filterValue, onReload,  renderRowSubComponent, disableSearch, sortableRows, disclaimer, emptyMessage, getRowProps= () => ({})}) {
    // let dataMemo = useMemo(()=>data, [])
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        visibleColumns,
        setGlobalFilter,
        setFilter,
        // setSortBy,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns,
            // data: dataMemo,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    )
    React.useEffect(() => {
        // console.log(globalFilter);
    }, [globalFilter]);

    // React.useEffect(() => {
    //     //check if filter is set to 'ALL'/empty
    //     if((!!filterValue && filterValue.length > 0) ){
    //         setFilter(filterColumn, filterValue);
    //     }
    //     else setFilter(filterColumn, undefined);
    //     if(sortAmount === 'none')setSortBy([]);
    //     if(sortAmount === 'asc')setSortBy([{id: 'PRICE_AMOUNT', desc: false}]);
    //     if(sortAmount === 'desc')setSortBy([{id: 'PRICE_AMOUNT', desc: true}]);
        
    // }, [setFilter, filterValue, filterColumn, sortAmount, setSortBy, filterValueMultiple]);

    React.useEffect(() => {
        //check if filter is set to 'ALL'/empty
        if(!!filterValue && (typeof filterValue === 'string' || filterValue instanceof String)){
            if((!!filterValue && filterValue.length > 0) ){
                console.log('tru filtervalue: ', filterValue)
                setFilter(filterColumn, filterValue);
            }
            else {
                console.log('tru filtervalue: ', filterValue)
                setFilter(filterColumn, undefined)};
        }
    }, [setFilter, filterValue, filterColumn]);

    // Render the UI for your table
    return (
        <div>
            <div className="right-page-header">
                <div className="d-flex">
                    <div className="mr-auto">
                        <h4 className="card-title m-t-10">{title}</h4>
                       
                    </div>
                    


{ 
!disableSearch && <div className="align-self-end">
                        <i className="mdi mdi-magnify font-14"></i>
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            style={{ width: "90%" }}
                            value={globalFilter || ""}
                            onChange={e => setGlobalFilter(e.target.value)}
                        />
                    </div>
 }

                    <button 
                    // className="btn btn-info" 
                    className="btn search-button" 
                    onClick = {onReload} data-toggle="tooltip" title="Refresh Table">
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
                <p style={{fontSize: 11 }}>{disclaimer}</p>
            </div>
                <div className="row">
                    
                    <div className="col-12">
                        {loading && <Tagpi type="loading" dataName={title} showSpinner={true} />}
                        {/* <div className="text-center data-loading" style = {{display: loading ? 'block': 'none'}}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="loading-text">Loading {title} ...</div>
                        </div> */}
                        <div className="text-center" style = {{display: (!loading && ((!!data && data.length < 1) || !!error)) ? 'block': 'none'}}>
                        {(!!data && data.length < 1 && !error) && <Tagpi type="noData" customMessage={!emptyMessage ? null : emptyMessage} dataType={title}/>}
                            {!!error && <Tagpi type="505" dataType="Configurations" reload={onReload}/>}
                        </div>
                      
                        <div className="table-responsive table-height-400px" style = {{display: (!loading && !error && (!!data && data.length > 0)) ? 'block': 'none'}}>
                            <table className="table table-striped" {...getTableProps()}>
                                <thead>
                                    <tr>
                                        {headerGroups[1].headers.map(column => (
                                            // <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <th {...column.getHeaderProps(sortableRows ? column.getSortByToggleProps() : {})} 
                                                // onClick={()=>setToggle(true)}
                                                className='tesst'
                                                >
                                                
                                                {column.render('Header')}
                                                {
                                                    column.columnFilter !== undefined && column.columnFilter
                                                    ? 
                                                    <ColumnFilter column={column} toggleSortFilter={toggleSortFilter} setToggleSortFilter={setToggleSortFilter} />
                                                    : ''
                                                }
                                                {
                                                    sortableRows && 
                                                    ( 
                                                        column.isSorted
                                                        ? 
                                                        column.isSortedDesc
                                                            ? <i className={`fas fa-sort-down ml-1`} />
                                                            : <i className={`fas fa-sort-up ml-1`} />
                                                        : <i className={`fas fa-sort ml-1`} />
                                                    )
                                                }
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <React.Fragment {...row.getRowProps()}>
                                             
                                                <tr {...row.getRowProps(getRowProps(row))}>
                                                    {row.cells.map(cell => {
                                                        return <td {...cell.getCellProps()}>{cell.render(he.decode('Cell'))}</td>
                                                    })}
                                                </tr>
                                                {row.isExpanded ? (
                                                    <tr>
                                                        <td style={{backgroundColor: 'rgba(0, 123, 255, 0.44)'}}></td>
                                                        <td colSpan={visibleColumns.length-1}>
                                                        {renderRowSubComponent({ row })}
                                                        </td>
                                                    </tr>
                                                ) : null}
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12" style = {{display: (!loading && !error && (!!data && data.length > 0)) ? 'block': 'none'}}>
                            {/* <div className="pagination"> */}
                            <div className="d-flex justify-content-between ">
                                <div className="p-2">
                                    <select
                                        value={pageSize}
                                        onChange={e => {
                                            setPageSize(Number(e.target.value))
                                        }}
                                    >
                                        {[10, 25, 50, 100].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                Show {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-2">
                                    <span>
                                        Page{' '}
                                        <strong>
                                            {pageIndex + 1} of {pageOptions.length}
                                        </strong>{' '}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <button className="btn btn-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                        {'<<'}
                                    </button>{' '}
                                    <button className="btn btn-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                        {'<'}
                                    </button>{' '}
                                    <button className="btn btn-link" onClick={() => nextPage()} disabled={!canNextPage}>
                                        {'>'}
                                    </button>{' '}
                                    <button className="btn btn-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                        {'>>'}
                                    </button>{' '}

                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

