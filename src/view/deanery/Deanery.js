import React, { useRef, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DEANERIES = gql`
   query deaneries{
        deaneries{
            id
            name
            shortName
            diocese{
                id 
                name
                shortName
            }
        }
    }
`;

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


const Deanery = (props) => {
    const classes = useStyles();
    const tableRef = useRef();
    const [selectedRow, setSelectedRow] = useState(null);
    const [deaneries, setDeaneries] = useState([])

    const [getDeaneries, { loading, data, error, refetch }] = useLazyQuery(DEANERIES);
    useEffect(() => {
        getDeaneries()
    }, [])

    useEffect(() => {
        if (data && data.deaneries) {
            data.deaneries.map((e, i) => {
                e.dioceseName = e.diocese.name
                return e
            })
            setDeaneries(data.deaneries)
        }
    }, [data])

    const onSelectRow = (evt, rowData) => {
        setSelectedRow(rowData);
    }

    const addDeanery = () => {
        props.history.push('deanery/add')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <MaterialTable
                title="Danh Sách Giáo Hạt"
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
                    { title: 'Mã Giáo Hạt', field: 'id' },
                    { title: 'Tên Giáo Hạt', field: 'name', },
                    { title: 'Tên rút gọn', field: 'shortName' },
                    { title: 'Giáo phận', field: 'dioceseName' },
                    {
                        title: 'Chỉnh sửa', field: 'edit',
                        render: rowData => (
                            <Link to={`/deanery/edit/${rowData.id}`}><EditIcon /></Link>
                        )
                    },
                ]}
                data={deaneries}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => refetch(),
                    },
                    {
                        tooltip: 'Add New Deanery',
                        icon: 'add',
                        isFreeAction: true,
                        onClick: (evt, data) => addDeanery()
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
export default Deanery;