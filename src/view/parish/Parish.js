import React, { useRef, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { PARISH as ParishPath } from '../../constant/breadcrumbsConfig'
import { PARISHES, DELETE_PARISHES } from '../../gql/parishGraphql'

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

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
        setLoadingDetail: isLoading => {
            dispatch(setLoadingDetail(isLoading));
        },
    };
};

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
    const [parishes, setParishes] = useState([])
    const [getParishes, { loading: loadingQuery, data, error, refetch }] = useLazyQuery(PARISHES);
    const [deleteParishes, { loading: loadingMutation, error: errorMutation }] = useMutation(DELETE_PARISHES,
        {
            onCompleted(...params) {
                getParishes()
            },
            onError(error) {
                alert(error)
            }
        }
    );

    const addDeanery = () => {
        props.history.push('parish/add')
    }

    const onDeleteData = (data) => {
        const ids = data.map((e, i) => e.id)
        deleteParishes({ variables: { ids: ids } })
    }

    useEffect(() => {
        props.setPagePath(ParishPath.search)
        getParishes()
    }, [])

    useEffect(() => {
        if (data && data.parishes) {
            data.parishes.map((e, i) => {
                e.dioceseName = e.diocese.name
                e.deaneryName = e.deanery.name
                return e
            })
            setParishes(data.parishes)
        }
    }, [data])

    useEffect(() => {
        props.setLoadingDetail(loadingQuery)
    }, [loadingQuery])

    useEffect(() => {
        props.setLoadingDetail(loadingMutation)
    }, [loadingMutation])


    return (
        <React.Fragment>
            <CssBaseline />
            <MaterialTable
                title="Danh Sách Giáo Xứ"
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
                    // { title: 'Mã Giáo Xứ', field: 'id' },
                    { title: 'Tên Giáo Xứ', field: 'name', },
                    { title: 'Tên rút gọn', field: 'shortName' },
                    { title: 'Giáo phận', field: 'dioceseName' },
                    { title: 'Giáo Hạt', field: 'deaneryName' },
                    {
                        title: 'Chỉnh sửa', field: 'edit',
                        render: rowData => (
                            <Link to={`/parish/edit/${rowData.id}`}><EditIcon /></Link>
                        )
                    },
                ]}
                data={parishes}
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
                        onClick: (evt, data) => onDeleteData(data)
                    },
                ]}
                options={
                    {
                        search: true,
                        selection: true,
                        sorting: true,
                    }
                }
            />
        </React.Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Deanery);