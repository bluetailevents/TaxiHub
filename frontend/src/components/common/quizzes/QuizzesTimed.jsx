import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../css/QuizzesTimed.css';
import { createQuizResults } from '../../../features/quizResults/quizResultsSlice';
import { setSection, setOption, setTimer } from '../../../features/sections/sectionSlice';
import { toggleFinish } from '../../../features/actions/actionsSlice';
import ResultsModal from '../ResultsModal';
import Maps from '../tasks/Maps';
import Timer from '../animations/Timer';
import AnswerButton from '../animations/AnswerButton';
import VisualMnemonic from '../animations/VisualMnemonic';
import Modal from 'react-modal';
const useQuizCompletionEffect = (finishButton, handleFinish) => {
useEffect(() => {
if (finishButton) {

    handleFinish();
}
}, [finishButton, handleFinish]);
};

const useQuizInitializationEffect = (section, option, setCurrentQuizIndex, setQuizCompleted, setCorrectAnswers, setIncorrectAnswers, setCorrectPercentage) => {
useEffect(() => {
setCurrentQuizIndex(0);
setQuizCompleted(false);
}, [section, option, setCurrentQuizIndex, setQuizCompleted, setCorrectAnswers, setIncorrectAnswers, setCorrectPercentage]);
};

const QuizzesTimed = React.memo(function QuizzesTimed() {
const dispatch = useDispatch();
const section = useSelector((state) => state.sections.section);
const option = useSelector((state) => state.sections.option);
const timer = useSelector((state) => state.sections.timer);
const state = useSelector((state) => state.auth);
const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState([]);
const [answers, setAnswers] = useState([]);
const [quizCompleted, setQuizCompleted] = useState(false);
const [correctStreets, setCorrectStreets] = useState([]);
const [currentArea, setCurrentArea] = useState('');
const [modalIsOpen, setModalIsOpen] = useState(false);
const [quizResults, setQuizResults] = useState([]);
const [finalResults, setFinalResults] = useState(null);
const finishButton = useSelector((state) => state.actions.finishButton);
const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
const [selectedAnswer, setSelectedAnswer] = useState('');
const [mnemonicModalIsOpen, setMnemonicModalIsOpen] = useState(false);
const [mapsData, setMapsData] = useState([]);

const [mapsButtonClicked, setMapsButtonClicked] = useState(false);

const updateMapsData = () => {
    const newMapsData = [[section, option, currentArea]];
    if (JSON.stringify(mapsData) !== JSON.stringify(newMapsData)) {
        setMapsData(newMapsData);
    }
    setMapModalIsOpen(true);
    setMapsButtonClicked(true); // Add this line
}

useEffect(() => {
    if (mapsButtonClicked) {
        updateMapsData();
        setMapsButtonClicked(false); // Reset the state after updating mapsData
    }
}, [mapsButtonClicked]); // Add mapsButtonClicked as a dependency






const handleFinish = useCallback(async () => {
    console.log('quizResults', quizResults);


try {
    await dispatch(createQuizResults({ userId: state.user._id, section:section, subsection: option, quiztype:'Timed', quizzes: quizResults }));
    console.log('Quiz results saved successfully');
} catch (error) {
    console.error('Error saving quiz results:', error);
}
setQuizResults('');
dispatch(toggleFinish(false));
dispatch(setSection(''));
dispatch(setOption(''));
}, [state.user._id, section, option, quizResults, dispatch]);

const handleNextQuestion = useCallback(() => {
    if (section && option && section[option] && currentQuizIndex < Object.keys(section[option]).length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setSelectedAnswers([]);
        setSelectedAnswer('');
    } else {
        setFinalResults({ quizResults });
        setQuizCompleted(true);
        setModalIsOpen(true);

    }
    }, [currentQuizIndex, section, option, timer, quizResults]);

const handleOpenModal = () => {
    setFinalResults({ quizResults });
    setQuizCompleted(true);
    setModalIsOpen(true);
};


const handleTimeUp = useCallback(() => {
    handleNextQuestion();
}, [handleNextQuestion]);

const handleAnswerSelect = (answer) => {
    // Check if the answer is already selected
    if (answer !== selectedAnswer) {
        setSelectedAnswer(answer);
        const newSelectedAnswers = [...selectedAnswers, answer];
        setSelectedAnswers(newSelectedAnswers);

        if (newSelectedAnswers.length >= 2) {
            setQuizResults([
                ...quizResults,
                { question: currentArea, selectedAnswers: newSelectedAnswers, correctAnswers: correctStreets, timeTaken: timer },
            ]);
            setSelectedAnswers([]);
            handleNextQuestion();
        }
    }
    else {
        setSelectedAnswer('');
        const newSelectedAnswers = selectedAnswers.filter((selectedAnswer) => selectedAnswer !== answer);
        setSelectedAnswers(newSelectedAnswers);
    }
};


useQuizCompletionEffect(finishButton, handleFinish,);

useQuizInitializationEffect(section, option, setCurrentQuizIndex, setQuizCompleted);

useEffect(() => {
setCurrentQuizIndex(0);
setQuizCompleted(false);
}, [section, option]);



useEffect(() => {
if (section && section[option]) {
    const areasAndStreets = section[option];
    const allStreets = Object.values(areasAndStreets).flat();
    const wrongStreets = new Set();

    const allStreetsCopy = [...allStreets];
    const newCurrentArea = Object.keys(areasAndStreets)[currentQuizIndex];
    const newCorrectStreets = areasAndStreets[newCurrentArea];

    while (wrongStreets.size < 6) {
    const randomIndex = Math.floor(Math.random() * allStreetsCopy.length);
    const randomStreet = allStreetsCopy[randomIndex];

    if (!newCorrectStreets.includes(randomStreet)) {
        wrongStreets.add(randomStreet);
    }

    allStreetsCopy.splice(randomIndex, 1);
    }

    const allAnswers = [...newCorrectStreets, ...wrongStreets];
    allAnswers.sort(() => Math.random() - 0.5);

    setCorrectStreets(newCorrectStreets);
    setCurrentArea(newCurrentArea);
    setAnswers(allAnswers);
}
}, [currentQuizIndex, section, option]);



return (
    section && option && section[option] ? (
        <>
        <div>{section}</div>
        <div>{option}</div>
    </>
    ) : (
        <div>No section or option</div>
    )
);
}
);

export default QuizzesTimed;