import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

function ModalQuestion(props){
return (
    <React.Fragment>
        <Typography component="h1" variant="h4" align="center" color="textSecondary" gutterBottom>
            Question: {props.question.Question}
        </Typography>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={6}>
                <List className={props.classes.root}>
                    {props.question.Options.map(value => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem key={value} role={undefined} dense button onClick={() => {props.handleCheckBox(value)}}>
                                <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={props.checked === value}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    </React.Fragment>
    )
}

export default ModalQuestion;