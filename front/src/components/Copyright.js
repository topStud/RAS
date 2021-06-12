import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        position:"absolute",
        bottom: 0,
        textAlign: "center",
        width:'100%',
    },
}));

export default function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                RAS - Researcher's Auxiliary System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}