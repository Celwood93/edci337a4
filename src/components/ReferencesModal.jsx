import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function ReferencesModal(props) {

    const useStyle = makeStyles(theme => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: '70%',
            height: '70%',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    let classes = useStyle()

    return (
        <Modal
            open={props.open}
            onClose={() => {props.handleClose(false)}}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    References
                </Typography>
                { 
                    props.data.map(ref => {
                        return (
                            <Typography key={ref} component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
                                {ref}
                            </Typography>
                        )
                    })
                }
            </div>
        </Modal>
    )
}

export default ReferencesModal;