import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchMenu from './SearchMenu'
import '../style/App.css'
import DataTable from "./Table";
import Typography from "@material-ui/core/Typography";
import Alert from 'react-bootstrap/Alert'

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
    const [afterSearch, setAfterSearch] = useState(false)

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
                <Grid item xs={6}>
                        <SearchMenu setJournalInfo={setJournalInfo} setAfterSearch={setAfterSearch}/>
                </Grid>
                <Grid item xs>
                    {/* Nothing */}
                </Grid>
            </Grid>
            <Grid container spacing={0} id={'table-section'}>
                <Grid item xs>
                </Grid>
                <Grid item xs={8}>
                    {(journalInfo.length > 0 || !afterSearch) ? (
                        <DataTable journalInfo={journalInfo}/>
                    ) : (
                        <Alert variant="light">
                            <Alert.Heading align={'left'}>Not Found!</Alert.Heading>
                            <p align={'left'} style={{fontSize: '0.7em'}}>
                                The journals you were looking for were not found in Scopus's or
                                Web of Science's dataset. Please check your input in case you
                                believe these journals should have been found.
                            </p>
                        </Alert>
                    )}
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
    );
}

export default AppBody