/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

// import { CATEGORY as CategoryPath } from '../../constant/breadcrumbsConfig'
import { CATEGORIES, DELETE_CATEGORIES } from '../../gql/categoryGraphql'
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

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

export const CATEGORY = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Danh Mục", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/category", title: "Danh Mục", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}
const CategoryAddNew = (props) => {
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
        props.setPagePath(CATEGORY.search)
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
        const loading = loadingQuery || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQuery, loadingMutation])

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
                    { title: 'Tên Danh mục', field: 'name', },
                    { title: 'Tiêu đề', field: 'title' },
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