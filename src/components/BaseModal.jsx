import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ModalQuestion from './ModalQuestion';

function BaseModal(props) {
    const [checked, setChecked] = useState();
    const [answering, setAnswering] = useState(true);
    const [correct, setCorrect] = useState(false);

    const useStyle = makeStyles(theme => ({
        root: {
            width: '100%',
            justifyContent: 'center',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
          width: '70%',
          paddingTop: '5rem',
          height: '60%',
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

      let classes = useStyle()

      const handleCheckBox = function(value) {
        setChecked(value);      
      }

      const handleSubmit = function() {
        if (props.question.Options.indexOf(checked) === props.question.Answer-1) {
            setCorrect(true);
        }
        setAnswering(false);
      }

    return (
            <Modal
                open={props.open}
                onClose={() => {props.handleClose(true)}}
                className={classes.modal}
            >
            <div className={classes.paper}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Quiz Time for {props.page.Title}!
            </Typography>
            <ModalQuestion
                classes={classes}
                question={props.question}
                handleCheckBox={handleCheckBox}
                checked={checked}
            />
            {answering ?
            <div align="center">
                <Button disabled={!checked} variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button> 
            </div>
            :
            <>{correct ? 
                <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                    You got it right! Nice Job!
                </Typography> : 
                <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                    Close! the answer was {props.question.Options[props.question.Answer-1]}
                </Typography>
            }
            <div align="center">
            <Button variant="contained" color="secondary" onClick={() => {props.handleClose(false)}}>
                Close Quiz
            </Button>
            </div>
            </>
            }
            </div>
        </Modal>
    )

}

export default BaseModal;