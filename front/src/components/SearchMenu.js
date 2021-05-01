import React from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../style/Search.css'
import SearchField from './SearchField'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#6c6c6c'
        }
    }
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Journal name" />
                    <Tab label="Subject area" />
                    <Tab label="ISSN" />
                </Tabs>
            </Paper>
            <div id={'field-container'}>
                <SearchField option={value}/>
            </div>
        </MuiThemeProvider>
    );
}
