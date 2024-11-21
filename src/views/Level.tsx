import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Page.css';
import { DefaultButton, Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';

interface LevelProps {
    title: string;
    code: string;
    vulnerabilityLine: number;
    feedback: string;
    fix: string;
    dropdownOptions: IDropdownOption[];
    dropdownStyles: Partial<IDropdownStyles>;
}

const Level: React.FC<LevelProps> = ({ title, code, vulnerabilityLine, feedback, fix, dropdownOptions, dropdownStyles }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = () => {
        setShowAnswer(true);
        if (selectedAnswer === vulnerabilityLine) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect!");
        }
    };

    const handleDropdownChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IDropdownOption, index?: number): void => {
        if (index !== undefined) {
            setSelectedAnswer(index);
        }
    };

    return (
        <div className="level">
            <h3>{title}</h3>
            <SyntaxHighlighter language="python" style={coy} showLineNumbers>
                {code}
            </SyntaxHighlighter>
            <div className="question">
                <p>Which line contains the security vulnerability?</p>
                <Dropdown placeholder="Select line" options={dropdownOptions} styles={dropdownStyles} onChange={handleDropdownChange} />
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
            {showAnswer && (
                <div className="potential-fix">
                    <p>Potential fix:</p>
                    <SyntaxHighlighter language="python" style={coy}>
                        {fix}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
};

export default Level;