import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton } from '@fluentui/react';

const SecurePrompts: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const [showAnswer, setShowAnswer] = useState(false);

    const handleClick = () => {
        setShowAnswer(true); // show answer
    };

  const options: IChoiceGroupOption[] = [
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
  ];

  // Make ev and option optional
  function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
    if (option) {
      console.dir(option);
      // Perform any action you need with the selected option
    }
  }

    return (
        <div className="secure-prompts">
            <MainLayout />
            <h1>Secure Prompts</h1>
            <div className="secure-prompts-body">
                <p>You selected: <strong>{language}</strong></p>
                {/* Show different content based on the language */}
                {language === 'python' && (
                    <div>
                        <h3>
                            Level 1
                        </h3>
                        <div className="question">
                            <p>You are an employee working at a big company on a confidential project not yet announced to the public. You need help writing a summary of the project and its benefits for a presentation you have coming up with your boss. How might you use Chat GPT to help WITHOUT LEAKING CONFIDENTIAL INFORMATION?
                            </p>

                            <ChoiceGroup options={options} onChange={_onChange} label="Pick one" required={true} />
                        </div>
                        <div className="answer">
                            <DefaultButton text="Submit" onClick={handleClick} />
                            {showAnswer && (
                                <p>
                                    Choice A - Includes confidential information including: financials, product details, and product features <br></br>
                                    Choice B - This includes information about private company financials <br></br>
                                    Choice C - Here you pass in information about the product and its features which leaks private company information not made public yet. <br></br>
                                    Choice D - Correct! Information here is intentionally kept vague yet still allows a good outline/template to start the summary of the product
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {language === 'java' && <p>Java challenges will appear here!</p>}
                {language === 'c' && <p>C challenges will appear here!</p>}
            </div>
            
        </div>
    );
};

export default SecurePrompts;
