import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchMenu from './SearchMenu'
import '../style/App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function AppBody() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
                <Grid item xs={6}>
                        <SearchMenu />
                    {/*<SearchField />*/}
                </Grid>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
            </Grid>
            {/*<Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
            </Grid>*/}
        </div>
    );
}

export default AppBody