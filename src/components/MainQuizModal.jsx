import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import LinkButton from './LinkButton';
import ModalQuestionFrame from './ModalQuestionFrame';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

function MainQuizModal(props) { 
    const [checked, setChecked] = useState();
    const [doneAllQuestions, setDoneAllQuestions] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(false);

    const useStyle = makeStyles(theme => ({
        root: {
            width: '100%',
            justifyContent: 'center',
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
          height: '80%',
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

      let classes = useStyle();

      //Not working, cant seem to re-render the specific parts, gonna leave it for now.
      const setStyling = function(done){
        if(done === undefined){
            return {}
        } else {
            return {
                color: "#00e676",
              }
        }
      }

     const handleSubmit = function(){
        setIsSubmitted(true);
        setScore(props.quizResults.filter(element => element.Submitted).length)
     }

      const handleCheckBox = function(value) {
        setChecked(value.Question);      
      }
        return (
            <Modal
                open={props.open}
                onClose={() => {props.handleClose(true)}}
                className={classes.modal}
            >
            <div className={classes.paper}>
            {isSubmitted ? 
                <React.Fragment>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Quiz Results:
                    </Typography>
                    <Typography component="h1" variant="h4"  align="center" color="textPrimary" gutterBottom>
                        You got {score} out of 10!
                    </Typography>
                    <div align="center">
                        <Button variant="contained" color="primary" onClick={() => {props.handleFinish()}}>
                            Leave Quiz
                        </Button> 
                    </div>

                </React.Fragment>
            :

            <React.Fragment>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Full Quiz! Good Luck!
                </Typography>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    {props.questions.map(value => {
                        const labelId = `checkbox-list-label-${value.Question}`;
                        const entry = {Question: value.Question, Submitted: undefined}
                        return (
                                <Grid item key={value.Question} role={undefined} onClick={() => {handleCheckBox(entry)}}>
                                    <Checkbox
                                        edge="start"
                                        style ={setStyling(entry.Submitted)}
                                        checked={checked === entry.Question}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </Grid>
                        );
                    })}
                </Grid>
                {
                    props.questions.map((question) => {
                        if (checked === question.Question) {
                            const index = props.quizResults.findIndex(element => {
                                return (element.Question === question.Question)
                            });
                            const finished = props.quizResults[index].Submitted;

                            return(
                                <div key={question.Question} align='center'>
                                <ModalQuestionFrame
                                    question={question}
                                    quizResults={props.quizResults}
                                    setQuizResults={props.setQuizResults}
                                    finished={finished}
                                    setDoneAllQuestions={setDoneAllQuestions}
                                />
                                </div>
                            )
                        }else{
                            return (null)
                        }
                    })
                }
                <div align="left">
                    <LinkButton disabled={props.quizPauses===0} variant="contained" color="secondary" to="/" onClick={() => {props.pauseQuiz()}}>
                        Pause Quiz ({props.quizPauses} left)!
                    </LinkButton>
                </div>
                <div align="right">
                    <Button disabled={!doneAllQuestions} variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button> 
                </div>
            </React.Fragment>
             }
             </div>
            </Modal>
        )

}

export default MainQuizModal;