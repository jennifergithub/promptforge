import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton, Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import Level from './Level'
import { useLevels } from '../LevelsContext';

const OutputSafety: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const { levels, currentLevel, setCurrentLevel } = useLevels();
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        if (currentLevel < levels.length - 1) {
            setShowAnswer(false);
            setCurrentLevel((prev) => prev + 1);
            
        }
    };

    return (
        <div className="output-safety">
            <MainLayout />
            <h1>Output Safety</h1>
            <div className="output-safety-body">
                <p>You selected: <strong>{language}</strong></p>
                {/* Show different content based on the language */}
                {language === 'python' && (
                    <div>
                        <Level _showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
                        <DefaultButton
                            text="Next"
                            onClick={handleNext}
                            disabled={currentLevel >= levels.length - 1}
                            style={{ marginTop: '10px' }}
                        />
                </div>
                )}
                {language === 'java' && <p>Java challenges will appear here!</p>}
                {language === 'c' && <p>C challenges will appear here!</p>}
            </div>
            
        </div>
    );
};

export default OutputSafety;
