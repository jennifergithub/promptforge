import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Page.css';
import { DefaultButton, Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import { useLevels } from '../LevelsContext';


interface LevelProps {
    _showAnswer: boolean;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>; // Add the setter for showAnswer
}

const Level: React.FC<LevelProps> = ({ _showAnswer, setShowAnswer }) => {
    const { levels, currentLevel } = useLevels();
    
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const current = levels[currentLevel];

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 150 },
      };

    
    const handleSubmit = () => {
        setShowAnswer(true);
        if (selectedAnswer === current.vulnerabilityLine) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect!");
        }
    };


    const handleDropdownChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IDropdownOption, index?: number): void => {
        if (index !== undefined) {
            setSelectedAnswer(index+1);
        }
    };

    return (
        <div className="level">
            <h3>{current.title}</h3>
            <SyntaxHighlighter language="python" style={coy} showLineNumbers>
                {current.code}
            </SyntaxHighlighter>
            <div className="question">
                <p>Which line contains the security vulnerability?</p>
                <Dropdown placeholder="Select line" options={Array.from({ length: current.numLines }, (_, i) => ({
                        key: `${i + 1}`,
                        text: `${i + 1}`,
                    }))} styles={dropdownStyles} onChange={handleDropdownChange} />
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
            {_showAnswer && (
                <div className="potential-fix">
                    <p>Potential fix:</p>
                    <SyntaxHighlighter language="python" style={coy}>
                        {current.fix}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
};

export default Level;