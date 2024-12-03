import React, { useState } from 'react';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton } from '@fluentui/react';
import SecurePromptLevel from './SecurePromptLevel';
import { useLevels } from '../SecurePromptLevelsContext';

const SecurePrompts: React.FC = () => {
    const { levels, currentLevel, setCurrentLevel, currentMoney } = useLevels();
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        if (currentLevel < levels.length - 1) {
            setShowAnswer(false);
            setCurrentLevel((prev) => prev + 1);
            
        }
    };

    return (
        <div className="secure-prompts">
            <MainLayout />
            <h1>Secure Prompts</h1>
            
                <div className="secure-prompts-body">
                    {currentMoney > 0 ? (
                    <div className="secure-prompts-question">
                        <SecurePromptLevel _showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
                        <DefaultButton
                            text="Next"
                            onClick={handleNext}
                            disabled={currentLevel >= levels.length - 1}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
            ) : (
                <div className="game-over">
                    <p>Game Over! You've run out of money.</p>
                </div>
                
            )}
            </div>
                
        </div>
    );
};

export default SecurePrompts;
