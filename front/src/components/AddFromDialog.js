import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TabFavHist from './TabFavHist'


export default function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;
    const [value, setValue] = React.useState([]);

    // React.useEffect(() => {
    //     if (!open) {
    //         setValue(value);
    //     }
    // }, [value, open]);

    const handleCancel = () => {
        onClose([]);
    };

    const handleAdd = () => {
        onClose(value);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle style={{textAlign:"center"}}>Add to search</DialogTitle>
            <DialogContent dividers>
                <TabFavHist addJournals={setValue}/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};


