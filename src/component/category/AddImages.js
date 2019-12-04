/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

import { API_URL } from '../../constant/config'

import { connect } from "react-redux";
import { setLoadingDetail } from "../../actions/pageInfos";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
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
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
        color: '#fff'
    },
    footer: {
        flexGrow: 1,
        background: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)'
    },
    rootAddImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: 'red'
    },
    buttonAddImages: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: 'blue',
        flexWrap: 'wrap'
    },
    button: {
    }
}));

const mapStateToProps = state => {
    return {
        PageInfos: state.PageInfosModule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoadingDetail: isLoading => {
            dispatch(setLoadingDetail(isLoading));
        },
    };
};
const CategoryEditContent = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        loading: true,
        uploading: false,
        images: []
    })

    const onChange = e => {
        const errs = []
        const files = Array.from(e.target.files)

        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            return toast.error(msg)
        }

        const formData = new FormData()
        const types = ['image/png', 'image/jpeg', 'image/gif']

        files.forEach((file, i) => {

            if (types.every(type => file.type !== type)) {
                errs.push(`'${file.type}' is not a supported format`)
            }

            // if (file.size > 150000) {
            //     errs.push(`'${file.name}' is too large, please pick a smaller file`)
            // }

            formData.append(i, file)
        })

        if (errs.length) {
            return errs.forEach(err => toast.error(err))
        }

        setState({ ...state, uploading: true })

        fetch(`${API_URL}/image-upload`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (!res.ok) {
                    throw res
                }
                return res.json()
            })
            .then(images => {
                setState({ ...state, uploading: false, images })
                if (props.onChange) {
                    const secureUrls = images.map(image => {
                        return { public_id: image.public_id, secure_url: image.secure_url }
                    })
                    console.log({ secureUrls })
                    props.onChange(props.name, secureUrls)
                }
            })
            .catch(err => {
                console.log({ err })
                err.json().then(e => {
                    toast.error(e.message)
                    setState({ ...state, uploading: false })
                })
            })
    }

    const filter = id => {
        return state.images.filter(image => image.public_id !== id)
    }

    const removeImage = id => {
        const images = filter(id)
        setState({ ...state, images: images })
        if (props.onChange) {
            const secureUrls = images.map(image => {
                return { public_id: image.public_id, secure_url: image.secure_url }
            })
            console.log({ secureUrls })
            props.onChange(props.name, secureUrls)
        }
    }

    useEffect(() => {
        props.setLoadingDetail(state.uploading)
    }, [state.uploading])

    useEffect(() => {
        if (props.dataSource.length > 0) {
            console.log("props.dataSource", props.dataSource)
            setState({ ...state, images: props.dataSource })
        }
    }, [props.dataSource])

    return (
        <Grid container component="main" spacing={4}>
            <CssBaseline />
            {state.images.length > 0
                ?
                state.images.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={card.secure_url}
                                title="Image title"
                            >
                                <CardContent className={classes.cardContent}>
                                    <Button size="small" color="primary">
                                        <DeleteIcon color="secondary" onClick={() => removeImage(card.public_id)} />
                                    </Button>
                                </CardContent>
                            </CardMedia>
                        </Card>
                    </Grid>
                ))
                :
                <Grid item xs={12}>
                    <div className={classes.rootAddImage}>
                        <div className={classes.buttonAddImages}>
                            <label htmlFor='multi'>
                                <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
                            </label>
                            <input type='file' id='multi' onChange={(e) => onChange(e)} multiple style={{ visibility: 'hidden' }} />
                        </div>
                    </div>
                </Grid>
            }
        </Grid>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditContent);