import React, { useState } from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import './Page.css';
import { DefaultButton } from '@fluentui/react';

interface SecurePromptLevelProps {
    title: string;
    question: string;
    options: IChoiceGroupOption[];
    correctAnswer: string;
    feedback: string;
}

const SecurePromptLevel: React.FC<SecurePromptLevelProps> = ({ title, question, options, correctAnswer, feedback }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = () => {
        setShowAnswer(true);
        // console.log(selectedAnswer);
        if (selectedAnswer === correctAnswer) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect!");
        }
    };

    const _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
        if (option !== undefined) {
            setSelectedAnswer(option.key);
        }
    };

    return (
        <div className="level">
            <h3>{title}</h3>
            <div className="question">
                <p>{question}</p>
                <ChoiceGroup options={options} onChange={_onChange} label="Select the best answer." required={true} />
            </div>
            <div className="answer">
                <DefaultButton text="Submit" onClick={handleSubmit} />
                {showAnswer && (
                    <div>
                        <p>{feedbackMessage}</p>
                        <p>{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurePromptLevel;