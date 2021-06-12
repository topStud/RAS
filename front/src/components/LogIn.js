import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../style/App.css'
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const [emailValue, setEmailValue] = React.useState('')
    const [passValue, setPassValue] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [passError, setPassError] = React.useState(false)
    const [emailMes, setEmailMes] = React.useState('')
    const [passMes, setPassMes] = React.useState('')
    const classes = useStyles();


    function logInClicked() {
        if (!ValidateEmail(emailValue) || passValue === '') {
            if (emailValue === '') {
                setEmailError(true)
                setEmailMes('This field is required')
            } else if (!ValidateEmail(emailValue)) {
                setEmailError(true)
                setEmailMes('The email entered is not in the correct format')
            }
            if (passValue === '') {
                setPassError(true)
                setPassMes('This field is required')
            }
        } else {
            // removes the error annotation
            setEmailError(false)
            setPassError(false)
            setEmailMes('')
            setPassMes('')

            let url = '/userInfo?email=' + emailValue + '&pass=' + passValue

            // sends values to server for a check.
            fetch(url).then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            }).then(data => {
              // data = user id
                window.open("/uid="+data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    function emailChange(e) {
        setEmailValue(e.target.value)
    }

    function passChange(e) {
        setPassValue(e.target.value)
    }

    function removeErrorEmail() {
        setEmailError(false)
        setEmailMes('')
    }

    function removeErrorPass() {
        setPassError(false)
        setPassMes('')
    }

    return (
        <div className={"App"}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color={'primary'}>
                        Log in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={emailError}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={emailMes}
                            value={emailValue}
                            onChange={emailChange}
                            onClick={removeErrorEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            error={passError}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={passMes}
                            value={passValue}
                            onChange={passChange}
                            onClick={removeErrorPass}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => logInClicked()}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/createAccount' variant="body2">
                                    {"Don't have an account? Sign Up"}
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