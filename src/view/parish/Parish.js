/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import MaterialTable from "material-table";

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

// import { PARISH as ParishPath } from '../../constant/breadcrumbsConfig'
import { PARISHES, DELETE_PARISHES } from '../../gql/parishGraphql'
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

export const PARISH = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Xứ", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/parish", title: "Giáo Xứ", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/parish", title: "Giáo Xứ", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}

const Deanery = (props) => {
    const tableRef = useRef();
    const [parishes, setParishes] = useState([])
    const [getParishes, { loading: loadingQuery, data, error: errorQuery, refetch }] = useLazyQuery(PARISHES);
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
        props.setPagePath(PARISH.search)
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
        const loading = loadingQuery || loadingMutation
        props.setLoadingDetail(loading)
    }, [loadingQuery, loadingMutation])

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