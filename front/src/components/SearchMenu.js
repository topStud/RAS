import React, {useState} from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../style/Search.css';
import SearchField from './SearchField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import ConfirmationDialogRaw from './AddFromDialog'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        flexGrow: 1,
        marginTop: '8%',
    },
    dialog: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#6c6c6c'
        },
        secondary: {
            main: '#34454d'
        }
    }
});

export default function CenteredTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [params, setParams] = useState([])
    const ref = React.createRef()
    console.log(ref)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (values) => {
        setOpen(false);
        values.push.apply(ref.current.state.tags)
        ref.current.setTags(values)
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
                <div id={'search-field-child'}>
                    <SearchField option={value} handleParams={setParams} ref={ref}/>
                </div>
                <div id={'button-child'}>
                    <Button variant="contained" color="secondary" onClick={()=>onClickFunc(value, params, props)}>
                        Search
                    </Button>
                </div>
            </div>
            <div>
                <button id={"addFrom"} onClick={() => handleClickListItem()}>Add from..</button>
                <Backdrop className={classes.backdrop} open={open}>
                    <div className={classes.dialog}>
                        <ConfirmationDialogRaw
                            classes={{
                                paper: classes.paper,
                            }}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        />
                    </div>
                </Backdrop>
            </div>
        </MuiThemeProvider>
    );
}

function onClickFunc(option, params, props) {
    switch (option) {
        case 0:
            get_data_for_table('data_by_name_list/', params, props)
            break;
        case 1:
            get_data_for_table('data_by_subjectArea/', params, props)
            break;
        case 2:
            get_data_for_table('data_by_issn/', params, props)
            break;
        default:
            break;
    }
}

function get_data_for_table(url, params, props) {
    fetch(url + JSON.stringify(params)).then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    }).then(data => {
        props.setJournalInfo(data);
        props.setAfterSearch(true);
    }).catch(function (error) {
        console.log(error);
        props.setAfterSearch(true);
    });
}