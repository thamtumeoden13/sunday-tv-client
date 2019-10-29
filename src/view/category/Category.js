import React, { useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


const CategoryAddNew = (props) => {
    const classes = useStyles();
    const tableRef = useRef();
    const [selectedRow, setSelectedRow] = useState(null);

    const onSelectRow = (evt, rowData) => {
        setSelectedRow(rowData);
    }

    const addNewCategory = () => {
        props.history.push('category/add')
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <MaterialTable
                title="Refresh Data Preview"
                tableRef={tableRef}
                columns={[
                    {
                        title: 'Avatar',
                        field: 'avatar',
                        render: rowData => (
                            <img style={{ height: 36, borderRadius: '50%' }}
                                src={rowData.avatar}
                                alt=''
                            />
                        ),
                    },
                    { title: 'Mã Danh mục', field: 'id' },
                    { title: 'Tên Danh mục', field: 'first_name', },
                    { title: 'Tiêu đề', field: 'last_name' },
                    {
                        title: 'Chỉnh sửa', field: 'edit',
                        render: rowData => (
                            <Link to={`/category/edit/${rowData.id}`}><EditIcon /></Link>
                            // <Link to={`/category/add`}><EditIcon /></Link>
                        )
                    },
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url = 'https://reqres.in/api/users?'
                        url += 'per_page=' + query.pageSize
                        url += '&page=' + (query.page + 1)
                        fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result.data,
                                    page: result.page - 1,
                                    totalCount: result.total,
                                })
                            })
                    })
                }
                actions={[
                    // {
                    //     icon: 'refresh',
                    //     tooltip: 'Refresh Data',
                    //     isFreeAction: true,
                    //     onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    // },
                    {
                        tooltip: 'Add New Category',
                        icon: 'add',
                        isFreeAction: true,
                        onClick: (evt, data) => addNewCategory()
                    },
                    {
                        tooltip: 'Remove All Selected Categories',
                        icon: 'delete',
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    },
                ]}
                onRowClick={((evt, row) => onSelectRow(evt, row))}
                options={
                    {
                        search: true,
                        selection: true,
                        sorting: true,
                        rowStyle: (rowData, index) => ({
                            backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id)
                                ? '#00bcd4'
                                : (index % 2 === 1 ? '#cfeaff' : '#b4e8ff')
                        }),
                        headerStyle: { backgroundColor: '#9da1a2', color: "#000", fontSize: "24", fontWeight: "bold" }
                    }
                }
            />
        </React.Fragment>
    );
}
export default withRouter(CategoryAddNew);