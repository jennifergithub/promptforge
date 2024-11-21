import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton } from '@fluentui/react';
import SecurePromptLevel from './SecurePromptLevel';

const SecurePrompts: React.FC = () => {
    const { language } = useParams<{ language: string }>();

    const levels = [
        {
            title: "Level 1",
            question: "You are an employee working at a big company on a confidential project not yet announced to the public. You need help writing a summary of the project and its benefits for a presentation you have coming up with your boss. How might you use Chat GPT to help WITHOUT LEAKING CONFIDENTIAL INFORMATION?",
            options: [
                { key: 'A', text: "Can you help me write a product summary for our new device, the UltraSync X200? It's launching next quarter, and our estimated revenue from pre-sales is $5 million. Also, here's the feature list: an AI-powered scheduler and a biometric security system." },
                { key: 'B', text: "I'm preparing a presentation for our client, NovaTech. Here are their sales projections for next year, which we're including: $12 million in Q1, $15 million in Q2. Please make this look appealing and professional." },
                { key: 'C', text: "We're working on a new product we are about to propose to our company. Here is a draft of our explanation of it and its features. Could you make this sound more polished?", disabled: true },
                { key: 'D', text: "Can you help me write a product summary for a new tech device targeting professionals? The device focuses on productivity and security and will launch next year. Keep the language engaging and high-level." },
            ],
            correctAnswer: 'D',
            feedback: "Choice A - Includes confidential information including: financials, product details, and product features \n Choice B - This includes information about private company financials \n Choice C - Here you pass in information about the product and its features which leaks private company information not made public yet. \n Choice D - Correct! Information here is intentionally kept vague yet still allows a good outline/template to start the summary of the product"
        },
        {
            title: "Level 2",
            question: "You are tasked with creating content for a public-facing newsletter about your company’s recent community projects. Some of the information provided to you includes sensitive internal details that have not been officially disclosed yet.  How might you use Chat GPT to help WITHOUT LEAKING CONFIDENTIAL INFORMATION?",
            options: [
                {key: 'A', text: "Can you draft a section for our newsletter about the company's $2 million donation to CleanWater Initiative? The donation hasn't been announced yet, but we want to highlight our commitment to environmental causes."},
                {key: 'B', text: "Our CEO is planning to personally fund a new project involving local schools. Here's the plan: $500,000 for infrastructure, $300,000 for educational tools. Can you make this sound impactful for the newsletter?"},
                {key: 'C', text: "Can you help me draft a section about our company's commitment to community initiatives, focusing on our efforts to support environmental and educational causes? Keep it general and engaging."}
            ],
            correctAnswer: 'C',
            feedback: "Choice A is incorrect. GPT will keep information you feed it so detailing a donation that hasn't been announced potentially leaks this info. ..."
        }
    ]

    return (
        <div className="secure-prompts">
            <MainLayout />
            <h1>Secure Prompts</h1>
            <div className="secure-prompts-body">
                <p>You selected: <strong>{language}</strong></p>
                {/* Show different content based on the language */}
                {language === 'python' && (
                    <div>
                        {levels.map((level, index) => (
                                <SecurePromptLevel
                                    key={index}
                                    title={level.title}
                                    question={level.question}
                                    options={level.options}
                                    correctAnswer={level.correctAnswer}
                                    feedback={level.feedback}
                                 />
                            ))}
                    </div>
                )}
                {language === 'java' && <p>Java challenges will appear here!</p>}
                {language === 'c' && <p>C challenges will appear here!</p>}
            </div>
            
        </div>
    );
};

export default SecurePrompts;
