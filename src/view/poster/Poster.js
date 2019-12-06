/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { connect } from "react-redux";
import { setPagePath, setLoadingDetail } from "../../actions/pageInfos";

// import { POSTER as PosterPath } from '../../constant/breadcrumbsConfig'

import { POSTERS, DELETE_CATEGORIES } from '../../gql/posterGraphql'

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    actionGroup: {
        display: "flex",
        justifyContent: 'space-between'
    },
    actionSearch: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    actionIcons: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        boxShadow: 'none',
        background: 'none',
        color: '#3f51b5'
    },
    search: {
        margin: theme.spacing(1),
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
const PosterScreen = (props) => {
    const classes = useStyles();

    const [posters, setPosters] = useState([])
    const [getPosters, { loading: loadingQuery, data: dataPosters, error, refetch }] = useLazyQuery(POSTERS);
    useEffect(() => {
        // props.setPagePath(PosterPath.search)
        getPosters()
    }, [])

    useEffect(() => {
        if (dataPosters && dataPosters.posters) {
            dataPosters.posters.map((e, i) => {
                e.categoryName = e.category.name
                return e
            })
            setPosters(dataPosters.posters)
        }
    }, [dataPosters])

    useEffect(() => {
        props.setLoadingDetail(loadingQuery)
    }, [loadingQuery])

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={4}>
                <Grid item xs={12} className={classes.actionGroup}>
                    <Grid item xs={6} className={classes.actionSearch}>
                        <TextField
                            className={classes.search}
                            id="input-with-icon-textfield"
                            label="Search"
                            fullWidth
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.actionIcons}>
                        <Fab
                            variant="extended"
                            size="small"
                            aria-label="add"
                            className={classes.fab}
                        >
                            <FilterListIcon className={classes.extendedIcon} />
                            ADD FILTER
                        </Fab>
                        <Fab
                            variant="extended"
                            size="small"
                            aria-label="add"
                            className={classes.fab}
                        >
                            <AddIcon className={classes.extendedIcon} />
                            CREATE
                        </Fab>
                        <Fab
                            variant="extended"
                            size="small"
                            aria-label="add"
                            className={classes.fab}
                        >
                            <GetAppIcon className={classes.extendedIcon} />
                            EXPORT
                        </Fab>
                    </Grid>
                </Grid>
                {posters.map(poster => (
                    <Grid item key={poster.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                // image="https://source.unsplash.com/random"
                                image={poster.image}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Heading
                                        </Typography>
                                <Typography>
                                    This is a media card. You can use this section to describe the content.
                                        </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View
                                        </Button>
                                <Button size="small" color="primary">
                                    Edit
                                        </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(PosterScreen);