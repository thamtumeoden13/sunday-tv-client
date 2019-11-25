import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Notifications, { notify } from 'react-notify-toast'
import clsx from 'clsx';
// import { loadCSS } from 'fg-loadcss';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CategoryEditContent = () => {
    const classes = useStyles();
    const [hasImage, setHasImage] = useState(false)
    const [src, setSrc] = useState("")

    const onChange = (e) => {
        const errs = []
        const files = Array.from(e.target.files)
        console.log(e.target.files[0])
        setHasImage(true)
        setSrc(e.target.files[0])
    }

    return (
        <Grid container component="main" spacing={4}>
            <CssBaseline />
            {hasImage
                ?
                cards.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                // image="https://source.unsplash.com/random"
                                image="https://res.cloudinary.com/dypbi98sc/image/upload/v1573553406/teo1vs3mlfahjswebmzw.png"
                                title="Image title"
                            >
                                <CardContent className={classes.cardContent}>
                                    <Button size="small" color="primary">
                                        <DeleteIcon color="secondary" />
                                    </Button>
                                </CardContent>
                            </CardMedia>
                        </Card>
                    </Grid>
                ))
                :
                <Grid item xs={12}>
                    <div className={classes.rootAddImage}>
                        <Notifications />
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
export default CategoryEditContent;