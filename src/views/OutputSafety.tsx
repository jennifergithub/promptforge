import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton, Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import OutputLevel from './OutputLevel'
import { useLevels } from '../OutputLevelsContext';

const OutputSafety: React.FC = () => {
    const { levels, currentLevel, setCurrentLevel, currentMoney } = useLevels();
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
                {currentMoney > 0 ? (
                    <div>
                    <OutputLevel _showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
                    <DefaultButton
                        text="Next"
                        onClick={handleNext}
                        disabled={currentLevel >= levels.length - 1}
                        style={{ marginTop: '10px' }}
                    />
            </div>
                ): (
                    <div className="game-over">
                    <p>Game Over! You've run out of money.</p>
                </div>
                )}
                    
            </div>
            
        </div>
    );
};

export default OutputSafety;
