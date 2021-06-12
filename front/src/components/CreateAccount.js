import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    // values
    const [emailValue, setEmailValue] = React.useState('')
    const [passValue, setPassValue] = React.useState('')
    const [nameValue, setNameValue] = React.useState('')
    const [lNameValue, setlNameValue] = React.useState('')
    const [passVValue, setPassVValue] = React.useState('')
    // set error
    const [emailError, setEmailError] = React.useState(false)
    const [passError, setPassError] = React.useState(false)
    const [nameError, setNameError] = React.useState(false)
    const [lNameError, setlNameError] = React.useState(false)
    const [passVError, setPassVError] = React.useState(false)
    // set message error
    const [emailMes, setEmailMes] = React.useState('')
    const [passMes, setPassMes] = React.useState('')
    const [nameMes, setNameMes] = React.useState('')
    const [lNameMes, setlNameMes] = React.useState('')
    const [passVMes, setPassVMes] = React.useState('')

    const required_txt = 'This field is required'

    function emailChange(e) {
        setEmailValue(e.target.value)
    }

    function passChange(e) {
        setPassValue(e.target.value)
    }

    function nameChange(e) {
        setNameValue(e.target.value)
    }

    function lNameChange(e) {
        setlNameValue(e.target.value)
    }

    function passVChange(e) {
        setPassVValue(e.target.value)
    }

    function SignUpClicked() {
        let valid = true
        if (nameValue === '') {
            setNameMes(required_txt)
            setNameError(true)
            valid = false
        }
        if (lNameValue === '') {
            setlNameMes(required_txt)
            setlNameError(true)
            valid = false
        }
        if (passValue === '') {
            setPassMes(required_txt)
            setPassError(true)
            valid = false
        } else if (passValue !== passVValue) {
            setPassVError(true)
            setPassVMes('The passwords don\'t match')
            valid = false
            setPassVValue('')
        }
        if (passVValue === '') {
            setPassVMes(required_txt)
            setPassVError(true)
            valid = false
        }
        if (!ValidateEmail(emailValue)) {
            valid = false
            setEmailError(true)
            if (emailValue === '') {
                setEmailMes(required_txt)
            } else {
                setEmailMes("The email entered is not in the correct format")
                setEmailValue('')
            }
        }
        // sends values to server for registration
        if (valid) {

        }
    }

    function removeNameError() {
        setNameError(false)
        setNameMes('')
    }

    function removeLNameError() {
        setlNameError(false)
        setlNameMes('')
    }

    function removeEmailError() {
        setEmailError(false)
        setEmailMes('')
    }

    function removePassError() {
        setPassError(false)
        setPassMes('')
    }

    function removePassVError() {
        setPassVError(false)
        setPassVMes('')
    }

    return (
        <div className={"App"}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={nameValue}
                                    onChange={nameChange}
                                    error={nameError}
                                    helperText={nameMes}
                                    onClick={removeNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={lNameValue}
                                    onChange={lNameChange}
                                    error={lNameError}
                                    helperText={lNameMes}
                                    onClick={removeLNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={emailValue}
                                    onChange={emailChange}
                                    error={emailError}
                                    helperText={emailMes}
                                    onClick={removeEmailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={passValue}
                                    onChange={passChange}
                                    error={passError}
                                    helperText={passMes}
                                    onClick={removePassError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password_v"
                                    label="Password Verification"
                                    type="password"
                                    id="password_v"
                                    value={passVValue}
                                    onChange={passVChange}
                                    error={passVError}
                                    helperText={passVMes}
                                    onClick={removePassVError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => SignUpClicked()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/logIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
}

function ValidateEmail(email)
{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}