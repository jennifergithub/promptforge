import React from 'react';
import './Page.css';
import MainLayout from './MainLayout';
import aiBotImage from '../imgs/ai_bot.png';
import interactLlmsGif from '../imgs/interact_llms.gif'

const HowTo = () => {
    return (
        <div className="how-to">
            <MainLayout />
            <h1>
                How-To
            </h1>
            <div className="img">
                <img src={aiBotImage} alt="AI bot" />
            </div>
            
            <div className="how-to-body">
                <h2>Secure Prompts</h2>
                    <p>
                        If you can't say it to a random stranger on the street, you should definitely not share it with Chat GPT or any similar LLM. Chat GPT does not store your input data securely and might even spread it through other prompts as it learns on your input information giving it to potentially malicious third parties. A good rule is if you can't post the info on social media, you definitely cannot input it into Chat GPT.  Same rules of privacy apply here and you can violate privacy laws just through interacting with Chat GPT. Things you cannot use include: passwords, financials, SSNs, proprietary data, Personal Details, etc.
                    </p>
                <h2>Output Safety</h2>
                <p>
                Large Language Models (LLMs), including the ones used for code generation, are trained on a large set of text samples. For models that can generate code, this dataset includes previously written code samples. As a result of this, if the code samples that are in the training set contain vulnerabilities, the LLM may reproduce the same vulnerabilities. Directly copying code from the LLM without validation could introduce insecure code into the final product, which is especially harmful if that code is used in enterprise software. These vulnerabilities can put both the company and its clients at risk of data theft or misuse. Because of this, it is extremely important that any code taken from a LLM is thoroughly validated before it is put into use. 
                </p>
                <p>Remember, you are responsible for any code you deploy, even if an LLM helped you write it!  </p>
                <h2>
                    Instructions
                </h2>
                <p>
                    Click on either option - Secure Prompts to learn about input sanitization, or Output Safety to learn about how to look for red flags in AI-generated code. You are allocated $1 million which is your company's current profits. However - beware! If you answer incorrectly, you lose money, with increasing amounts for increasing level of difficulty.
                </p>
            </div>

            <div className="gif">
                <img src={interactLlmsGif} alt="Interacting with LLMs GIF" />
            </div>
            
        </div>
    )
}

export default HowTo;