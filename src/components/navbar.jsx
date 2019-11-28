import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/nav.css';
import webpageConfig from '../webpageConfig.json';
import MainQuizModal from './MainQuizModal';
import Button from '@material-ui/core/Button';
import LinkButton from'./LinkButton';


function NavBar() {
	const [navStyling, setNavStyling] = useState({color: 'White',});
	const [mainQuizStarted, setMainQuizStarted] = useState(false);
	const [showModal, setShowModal] = useState(false)
	const [modalQuestions, setModalQuestions] = useState([]);
    const [quizPauses, setQuizPauses] = useState(3);
    const [quizResults, setQuizResults] = useState([]);

	const startQuiz = () => {
		let questions = shuffle(Object.keys(webpageConfig).map((key) => webpageConfig[key].Questions).flat().filter(item => item !== undefined)).slice(0,10)
		 setModalQuestions(questions);
        questions.map(value => {
            const entry = {Question: value.Question, Submitted: undefined}
            quizResults.push(entry);
		});
		setMainQuizStarted(true);
		setShowModal(true);
		console.log("QUIZ Started");
	};

	const shuffle = function(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;
	  
		while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
	  
		return array;
	  }

	const pauseQuiz = () => {
		setShowModal(false);
	}

	const handleFinish = () => {
		setMainQuizStarted(false);
		setShowModal(false);
	} 

	const resumeQuiz = () => {
		setQuizPauses(quizPauses-1);
		setShowModal(true);
		setNavStyling({color: 'White'});
		console.log("QUIZ Resume");
	};

	const reactToMainQuiz = function() {
		if(mainQuizStarted){
			setNavStyling({color: 'White', pointerEvents: 'none'})
		}
	}

	return (
		<React.Fragment>
        {
			showModal ? 
			<React.Fragment>
			  <MainQuizModal
				open={showModal}
				questions={modalQuestions}
				handleClose={setShowModal}
				handleFinish={handleFinish}
				pauseQuiz={pauseQuiz}
				quizPauses={quizPauses}
				quizResults={quizResults}
				setQuizResults={setQuizResults}
			  />
			</React.Fragment>
			: null
		  }
		<nav className="nav-general">
			<u1 className="nav-links">
			{
				Object.keys(webpageConfig).map((key) => {
					let data = webpageConfig[key];
					let connection = "/"+key;
					if (data.KeyWord) {
						return (
							<Link key={key} style={navStyling} onClick={reactToMainQuiz} to={connection}>
								<li>{data.KeyWord}</li>
							</Link>
						)
					} else {
						return null
					}
				})
			}
			<Link style={navStyling} to="/">
				<li>Home</li>
			</Link>
			{
				mainQuizStarted ?
					<LinkButton onClick={resumeQuiz} variant="contained" color="secondary" to="/">
						Resume Quiz!
					</LinkButton> :
					<Button onClick={startQuiz} variant="contained" color="primary">
						Full Quiz!
					</Button>
			}
			</u1>
		</nav>
		</React.Fragment>
	);
}

export default NavBar;