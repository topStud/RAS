/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

let journals_names = [];
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        journals_names = journals_names.concat(xhttp.response)
    }
};
xhttp.open('GET', "../journals_names", true);
xhttp.send();

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c8c8c8'
        },
        secondary: {
            main: '#ffffff'
        }
    }
});

export default function Tags(props) {
    let value = props.option
    const classes = useStyles();
    console.log(value)
    switch (value) {
        case 0:
            return (
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={journals_names}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Enter here the journal name"
                                    placeholder="journal name"
                                    color='primary'
                                />
                            )}
                        />
                    </div>
                </MuiThemeProvider>
            );
        case 1:
            return (
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={journals_names}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Enter here the subject area"
                                    placeholder="subject area"
                                    color='primary'
                                />
                            )}
                        />
                    </div>
                </MuiThemeProvider>
            );
        case 2:
            return (
                <TextField
                    id="standard-number"
                    placeholder="Enter here ths ISSN value of the journal"
                    label="ISSN"
                    type="number"
                    fullWidth={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            );
    }




}
