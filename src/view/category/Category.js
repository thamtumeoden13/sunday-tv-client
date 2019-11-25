import React, { useRef, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import { CATEGORY as CategoryPath } from '../../constant/BreadcrumbsConfig'
import { CATEGORIES, DELETE_CATEGORIES } from '../../gql/categoryGraphql'

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

const CategoryAddNew = (props) => {
    const classes = useStyles();
    const tableRef = useRef();
    const [categories, setCategories] = useState([])
    const [getCategories, { loading: loadingQuery, data, error, refetch }] = useLazyQuery(CATEGORIES);
    const [deleteCategories, { loading: loadingMutation, error: errorMutation }] = useMutation(DELETE_CATEGORIES,
        {
            onCompleted(...params) {
                getCategories()
            },
            onError(error) {
                alert(error)
            }
        }
    );

    const addCategory = () => {
        props.history.push('category/add')
    }

    const onDeleteData = (data) => {
        const ids = data.map((e, i) => e.id)
        deleteCategories({ variables: { ids: ids } })
    }

    useEffect(() => {
        props.setPagePath(CategoryPath.search)
        getCategories()
    }, [])

    useEffect(() => {
        if (data && data.categories) {
            data.categories.map((e, i) => {
                e.dioceseName = e.diocese.name
                e.deaneryName = e.deanery.name
                e.parishName = e.parish.name
                return e
            })
            setCategories(data.categories)
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
                title="Danh Mục Hình Ảnh"
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
                    { title: 'Tên Danh mục', field: 'name', },
                    { title: 'Tiêu đề', field: 'title' },
                    { title: 'Nội dung', field: 'content' },
                    { title: 'Giáo phận', field: 'dioceseName' },
                    { title: 'Giáo hạt', field: 'deaneryName' },
                    { title: 'Giáo xứ', field: 'parishName' },
                    {
                        title: 'Chỉnh sửa', field: 'edit',
                        render: rowData => (
                            <Link to={`/category/edit/${rowData.id}`}><EditIcon /></Link>
                        )
                    },
                ]}
                data={categories}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => refetch(),
                    },
                    {
                        tooltip: 'Add New Category',
                        icon: 'add',
                        isFreeAction: true,
                        onClick: (evt, data) => addCategory()
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddNew);