import React, { useRef, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import { connect } from "react-redux";
import { setPagePath } from "../../actions/pageInfos";

import MaterialTable from "material-table";

import { DIOCESE } from '../../constant/BreadcrumbsConfig'

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DIOCESES = gql`
   query dioceses{
        dioceses{
            id
            name
            shortName
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

const mapStateToProps = state => {
    return {
        PageInfos: state.PageInfosModule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setPagePath: pagePath => {
            dispatch(setPagePath(pagePath));
        },
    };
};

const Diocese = (props) => {
    const classes = useStyles();
    const tableRef = useRef();
    const [selectedRow, setSelectedRow] = useState(null);
    const [dioceses, setDioceses] = useState([])

    const [getDioceses, { loading, data, error, refetch }] = useLazyQuery(DIOCESES);

    const onSelectRow = (evt, rowData) => {
        setSelectedRow(rowData);
    }

    const addNewDiocese = () => {
        props.history.push('diocese/add')
    }

    useEffect(() => {
        props.setPagePath(DIOCESE.search)
        getDioceses()
    }, [])

    useEffect(() => {
        if (data && data.dioceses) {
            console.log("data.dioceses", data.dioceses)
            setDioceses(data.dioceses)
        }
    }, [data])

    return (
        <React.Fragment>
            <CssBaseline />
            <MaterialTable
                title="Danh Sách Giáo Phận"
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
                    { title: 'Mã Giáo Phận', field: 'id' },
                    { title: 'Tên Giáo Phận', field: 'name', },
                    { title: 'Tên rút gọn', field: 'shortName' },
                    {
                        title: 'Chỉnh sửa', field: 'edit',
                        render: rowData => (
                            <Link to={`/diocese/edit/${rowData.id}`}><EditIcon /></Link>
                        )
                    },
                ]}
                data={dioceses}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => refetch(),
                    },
                    {
                        tooltip: 'Add New Diocese',
                        icon: 'add',
                        isFreeAction: true,
                        onClick: (evt, data) => addNewDiocese()
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
export default connect(mapStateToProps, mapDispatchToProps)(Diocese);