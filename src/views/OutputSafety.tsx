import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton } from '@fluentui/react';

const OutputSafety: React.FC = () => {
    const { language } = useParams<{ language: string }>();
    const [showAnswer, setShowAnswer] = useState(false);

    const q1Code = `# A simple login simulation
def check_login(username, password):
    # returns true if username in system and password matches
    # function obfuscated for simplicity

def login(username, password):
    if check_login(username, password):
        print("Login successful!")
    else:
        print("Login failed!")

username = input("Enter username: ")
password = input("Enter password: ")

login(username, password)
`;

    const q1Fix = `from getpass import getpass

# rest of code

password = getpass("Enter password: ")
`

const handleClick = () => {
    setShowAnswer(true); // show answer
  };

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
                            Level 1: You are tasked with creating a simple Python program that validates a user's login:
                        </h3>
                        <SyntaxHighlighter language="python" style={coy} showLineNumbers showInlineLineNumbers>
                            {q1Code}
                        </SyntaxHighlighter>
                        <div className="question">
                            <p>Which line contains the security vulnerability?</p>
                        </div>
                        <div className="answer">
                            <DefaultButton text="Submit" onClick={handleClick} />
                            {showAnswer && (
                                <p>
                                    The vulnerability in this code is on line 13. Here, the user enters a password in plaintext, which could put them at risk for having someone else reading and stealing their password. In general, passwords should never be stored or displayed in plaintext. This vulnerability can be mitigated by simply using the getpass module, which will ensure that the password is obfuscated and not displayed in plaintext. 
                                </p>
                            )}
                        </div>
                        <div className="question">
                            <p>What is a potential fix?</p>
                        </div>
                        <div className="potential-fix">
                            {showAnswer && (
                                <div>
                                    <p>User getpass module:</p>
                                    <SyntaxHighlighter language="python" style={coy} showLineNumbers showInlineLineNumbers>
                                {q1Fix}
                            </SyntaxHighlighter>
                                </div>
                                
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

export default OutputSafety;
