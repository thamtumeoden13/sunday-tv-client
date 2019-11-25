import React, { useRef, useState, useEffect } from 'react';
import { Link, } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import MaterialTable from "material-table";

import { DIOCESE as DiocesePath } from '../../constant/BreadcrumbsConfig'
import { DIOCESES, DELETE_DIOCESES } from '../../gql/graphqlTag'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

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
        setLoadingDetail: isLoading => {
            dispatch(setLoadingDetail(isLoading));
        },
    };
};

const Diocese = (props) => {
    const classes = useStyles();
    const tableRef = useRef();
    const [dioceses, setDioceses] = useState([])

    const [getDioceses, { loading: loadingQuery, data, error: errorQuery, refetch }] = useLazyQuery(DIOCESES);

    const [deleteDioceses, { loading: loadingMutation, error: errorMutation }] = useMutation(DELETE_DIOCESES,
        {
            onCompleted(...params) {
                getDioceses()
            },
            onError(error) {
                alert(error)
            }
        }
    );

    const addNewDiocese = () => {
        props.history.push('diocese/add')
    }

    const onDeleteData = (data) => {
        const ids = data.map((e, i) => e.id)
        deleteDioceses({ variables: { ids: ids } })
    }

    useEffect(() => {
        props.setPagePath(DiocesePath.search)
        getDioceses()
    }, [])

    useEffect(() => {
        if (data && data.dioceses) {
            setDioceses(data.dioceses)
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
                title="Danh Sách Giáo Phận"
                tableRef={tableRef}
                // isLoading={loadingQuery}
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
                    // { title: 'Mã Giáo Phận', field: 'id' },
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
export default connect(mapStateToProps, mapDispatchToProps)(Diocese);