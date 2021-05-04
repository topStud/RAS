import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchMenu from './SearchMenu'
import '../style/App.css'
import DataTable from "./Table";

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
    const [journalInfo, setJournalInfo] = useState([])

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
                <Grid item xs={6}>
                        <SearchMenu setJournalInfo ={setJournalInfo}/>
                </Grid>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
            </Grid>
            <Grid container spacing={0} id={'table-section'}>
                <Grid item xs>
                </Grid>
                <Grid item xs={10}>
                    <DataTable journalInfo={journalInfo}/>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
    );
}

export default AppBody