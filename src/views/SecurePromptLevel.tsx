import React, { useState } from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import './Page.css';
import { DefaultButton } from '@fluentui/react';
import { useLevels } from '../SecurePromptLevelsContext'
import classified from '../imgs/classified.jpg'
import newsletter from '../imgs/newsletter.png'
import marketTrends from '../imgs/market_trends.jpg'

interface LevelProps {
    _showAnswer: boolean;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Add the setter for showAnswer
}

const SecurePromptLevel: React.FC<LevelProps> = ({ _showAnswer, setShowAnswer }) => {
    const { levels, currentLevel, currentMoney, setCurrentMoney } = useLevels();
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const current = levels[currentLevel];
    const penaltyAmounts = [50000, 100000, 200000]; // Penalties for each level.

    const handleSubmit = () => {
        setShowAnswer(true);
        // console.log(selectedAnswer);
        if (selectedAnswer === current.correctAnswer) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect!");
            const penalty = penaltyAmounts[currentLevel];
            setCurrentMoney((prev) => Math.max(0, prev - penalty));
        }
    };

    const _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
        if (option !== undefined) {
            setSelectedAnswer(option.key);
        }
    };

    return (
        <div className="level">
            <h3>{current.title}</h3>
            <p>Current Money: ${currentMoney.toLocaleString()}</p> {/* Display current money */}
            <div className="img">
                {currentLevel === 0 && (
                    <img id="classified" src={classified} alt="Classified stamp" />
                )}
                {currentLevel ===1 && (
                    <img src={newsletter} alt="Newsletter icon" />
                )}
                {currentLevel ===2 && (
                    <img id="marketTrends" src={marketTrends} alt="Market trends" />
                )}
            </div>
            <div className="question">
                <p>{current.question}</p>
                <ChoiceGroup options={current.options} onChange={_onChange} label="Select the best answer." required={true} />
            </div>
            <div className="answer">
                <DefaultButton text="Submit" onClick={handleSubmit} />
                {_showAnswer && (
                    <div>
                        <p>{feedbackMessage}</p>
                        <p>{current.feedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurePromptLevel;