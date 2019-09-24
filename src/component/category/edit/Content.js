import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CategoryEditContent = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={4}>
                {cards.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            >
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Heading
                                        </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the content.
                                        </Typography>
                                </CardContent>
                            </CardMedia>
                            <CardActions className={classes.footer}>
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
export default CategoryEditContent;