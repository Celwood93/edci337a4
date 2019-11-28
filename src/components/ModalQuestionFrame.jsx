import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ModalQuestion from './ModalQuestion';

function ModalQuestionFrame(props) {
    const [checked, setChecked] = useState();
    const [answering, setAnswering] = useState(true);

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
        let result = props.question.Options.indexOf(checked) === (props.question.Answer-1)
        const index = props.quizResults.findIndex(element => {
            return (element.Question === props.question.Question)
        });
        props.quizResults[index].Submitted = result;
        props.setQuizResults([...props.quizResults]);
        props.setDoneAllQuestions(!(props.quizResults.filter(quizResult => quizResult.Submitted === undefined).length));
        setAnswering(false);
      }

    return (
            <div className={classes.paper}>
            <ModalQuestion
                classes={classes}
                question={props.question}
                handleCheckBox={handleCheckBox}
                checked={checked}
            />
            {answering && props.finished===undefined ?
            <div align="center">
                <Button disabled={!checked} variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Answer
                </Button> 
            </div>
            :
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                Answer Saved!
            </Typography> 
            }
            </div>
    )
}

export default ModalQuestionFrame;