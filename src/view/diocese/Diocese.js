/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Link, } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/EditOutlined'

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

import MaterialTable from "material-table";

import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
// import { DIOCESE as DiocesePath } from '../../constant/breadcrumbsConfig'
import { DIOCESES, DELETE_DIOCESES } from '../../gql/dioceseGraphql'
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

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
const DIOCESE = {
    search: [
        { link: "/", title: "Trang chủ", icon: <HomeIcon /> },
        { link: "", title: "Giáo Phận", icon: <WhatshotIcon /> }
    ],
    add: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese/", title: "Giáo Phận", icon: <WhatshotIcon /> },
        { link: "", title: "Thêm Mới", icon: <GrainIcon /> }
    ],
    edit: [
        { link: "/", title: "Trang Chủ", icon: <HomeIcon /> },
        { link: "/diocese", title: "Giáo Phận", icon: <WhatshotIcon /> },
        { link: "", title: "Chỉnh sửa", icon: <GrainIcon /> }
    ]
}
const Diocese = (props) => {
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
        props.setPagePath(DIOCESE.search)
        getDioceses()
    }, [])

    useEffect(() => {
        if (data && data.dioceses) {
            setDioceses(data.dioceses)
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