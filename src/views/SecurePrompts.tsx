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
                { key: 'C', text: "We're working on a new product we are about to propose to our company. Here is a draft of our explanation of it and its features. Could you make this sound more polished?" },
                { key: 'D', text: "Can you help me write a product summary for a new tech device targeting professionals? The device focuses on productivity and security and will launch next year. Keep the language engaging and high-level." },
            ],
            correctAnswer: 'D',
            feedback: "Choice A is incorrect as it includes confidential information including: financials, product details, and product features. Choice B is incorrect as this includes information about private company financials. Choice C is incorrect as here you pass in information about the product and its features which leaks private company information not made public yet. Choice D - Correct! Information here is intentionally kept vague yet still allows a good outline/template to start the summary of the product"
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
            feedback: "Choice A is incorrect. GPT will keep information you feed it so detailing a donation that hasn't been announced potentially leaks this info. Choice B is incorrect. Information passed in is too specific and gives away details meant to be kept private. Choice C is correct, as information is kept vague and guides GPT to a useful output."
        },
        {
            title: "Level 3",
            question: "You are preparing a competitive strategy document for your company. Your team has analyzed market trends and competitor weaknesses, and you need to communicate these findings. How might you use Chat GPT to help WITHOUT LEAKING CONFIDENTIAL INFORMATION?",
            options: [
                {key: 'A', text: "Our analysis shows that our competitor is struggling to retain customers aged 18-25 due to poor product usability. Can you write a strategy highlighting how we can exploit this gap for our Q2 product launch?"},
                {key: 'B', text: "Our competitor is preparing to release an AI-powered gadget next quarter targeting professionals. Their product lacks advanced biometric security, which we plan to emphasize in our marketing strategy. Can you draft this section?"},
                {key: 'C', text: "Our sales data shows we gained 15% of our competitor's customers last quarter. Can you draft a strategy document showcasing how we can replicate this success in new regions?"},
                {key: 'D', text: "Can you draft a general strategy document for improving our market positioning, with a focus on addressing usability and security concerns in consumer technology? Keep it high-level and forward-looking."}
            ],
            correctAnswer: "D",
            feedback: "Choice A is incorrect. This includes confidential data and/or unverified claims about a competing company which should not be disclosed to the AI. Choice B is incorrect. This includes confidential data and/or unverified claims about a competing company which should not be disclosed to the AI. Choice C is incorrect. This includes confidential data and/or unverified claims about a competing company which should not be disclosed to the AI. Choice D is correct. Information is kept vague and no confidential data was exposed to ChatGPT in the generation of the output."
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
