import React, { useState } from 'react';
import webpageConfig from '../webpageConfig.json';
import BaseModal from './BaseModal';
import ReferencesModal from './ReferencesModal';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function WebpageTemplate(props) {
    const [showModal, setShowModal] = useState(false);
    const [showRefModal, setShowRefModal] = useState(false);
    const [question, setQuestion] = useState(false);
    const data = webpageConfig[props.name];

    const useStyles = makeStyles(theme => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));
    
      const classes = useStyles();

    return (
        <React.Fragment>
        {
          showModal ? 
          <React.Fragment>
            <BaseModal
            page={data}
            question={question}
            open={showModal}
            handleClose={setShowModal}
            />
          </React.Fragment>
          : null
        }
        {
          showRefModal ? 
          <React.Fragment>
            <ReferencesModal
            data={webpageConfig.Sources}
            open={showRefModal}
            handleClose={setShowRefModal}
            />
          </React.Fragment>
          : null
        }
            <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {data.Title}
            </Typography>
            <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item>{data.Questions.length > 0 ?
                  <Button variant="contained" color="primary" onClick={() => {
                    setQuestion(data.Questions[Math.round(Math.random()*(data.Questions.length-1))])
                    setShowModal(true)
                    }}>
                    Quiz Me!
                  </Button>:null}
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={()=> {setShowRefModal(true)}}>
                    Show All Sources
                  </Button>
                </Grid>
              </Grid>
              </div>
              </Container>
              </div>
              <Container maxWidth="lg">
            <Grid container spacing={6}>
                <Grid item >
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {data.Body}
                    </Typography>
                </Grid>
                <Grid container spacing={6} direction={'row'}>
                {
                    data.Images.map(imagePath => (<Grid key={imagePath} item xs={12} sm={6} md={6}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={require("./"+imagePath)}
                            />
                        </Card>
                    </Grid>
                    ))
                }
                </Grid>
            </Grid>
        </Container>
        </React.Fragment>
    );
}

export default WebpageTemplate;