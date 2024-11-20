import React from 'react';
import './Page.css';
import { CompoundButton } from '@fluentui/react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const ChooseYourChallenge = () => {

    const navigate = useNavigate();
    
    const { setLanguage } = useLanguage(); // Access setLanguage from context

    const handleLanguageSelect = (language: string) => {
        setLanguage(language); // Update the context
        navigate(`/secure-prompts/${language}`); // Navigate to the secure prompts page
    };

    return (
        <div className="choose-your-challenge">
            <h1>
                Choose Your Challenge
            </h1>
            <div className="select-your-language">
                <CompoundButton onClick={() => handleLanguageSelect('python')}>
                    Python
                </CompoundButton>
                <CompoundButton onClick={() => handleLanguageSelect('java')}>
                    Java
                </CompoundButton>
                <CompoundButton onClick={() => handleLanguageSelect('c')}>
                    C
                </CompoundButton>
            </div>
        </div>
    )
}

export default ChooseYourChallenge;