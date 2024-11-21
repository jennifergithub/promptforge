import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Page.css';
import MainLayout from './MainLayout';
import { DefaultButton, Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import Level from './Level'

const OutputSafety: React.FC = () => {
    const { language } = useParams<{ language: string }>();

    const levels = [
        {
            title: "Level 1: You are tasked with creating a simple Python program that validates a user's login:",
            code: `# A simple login simulation
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
`,
            vulnerabilityLine: 13,
            feedback: "The vulnerability in this code is on line 13. Here, the user enters a password in plaintext, which could put them at risk for having someone else reading and stealing their password. In general, passwords should never be stored or displayed in plaintext. This vulnerability can be mitigated by simply using the getpass module, which will ensure that the password is obfuscated and not displayed in plaintext.",
            fix: `from getpass import getpass

# rest of code

password = getpass("Enter password: ")
`
        },
        {
            title: "Level 2: You are tasked with creating a Python script that fetches a user’s information from a SQL database:",
            code: `
import sqlite3

def fetch_user_information(username):
    # Connect to the database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Execute the SQL query to check username
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    # Fetch one record
    user = cursor.fetchone()
    conn.close()
    if user:
        print(f“User details: {user}”)
    else:
        print("Invalid request.”)
username = input("Enter username: ")
fetch_user_information(username)
`,
            vulnerabilityLine: 8,
            feedback: "The vulnerability occurs on line 8. Here, the user is able to enter any value as the username, and this value will be executed by the SQL database. This means that a user may enter malicious input that can do anything from delete the table to reveal the information of all entries in the table. This vulnerability can be mitigated through a variety of methods, but the most common and industry-standard method is parameterization, which will ensure that the input is read as data only: ",
            fix: `query = "SELECT * FROM users WHERE username = ?" 
cursor.execute(query, username)`
        },
        {
            title: "Level 3: You are tasked with creating a Python script that will check if a file for a given username exists, and if not, create the file: ",
            code: `import os
import time

def create_user_file(username):
    file_path = f"/tmp/{username}.txt"
    # Check if the file already exists
    if not os.path.exists(file_path):
        print(f"{username}: File does not exist, creating...")
        time.sleep(1)  
        with open(file_path, 'w') as f:
            f.write(f"Welcome, {username}!\n")
    else:
        print(f"{username}: File already exists. Skipping creation.")

username = input("Enter username: “)
create_user_file(username)
`,
            vulnerabilityLine: 7,
            feedback: "Line 7, and consequently line 8, have a vulnerability. Here, the code checks to see whether a file exists, and if not, the code creates the file. If two users run the code with the same username at the same time, this can create a race condition, as the same file will be created twice, potentially overwriting or corrupting data. This also allows for the potentiality of more serious implications, including denial of service attacks or injecting malicious files. This vulnerability can be mitigated by using locks to ensure that only one user can create or write to the file at once.",
            fix: `import os
import time
from filelock import FileLock
def create_user_file(username):
    file_path = f"/tmp/{username}.txt"
    lock_path = f"{file_path}.lock"
    # Use a file-based lock to prevent race conditions
    with FileLock(lock_path):
        if not os.path.exists(file_path):
            print(f"{username}: File does not exist, creating...")
            time.sleep(1)
            with open(file_path, 'w') as f:
                f.write(f"Welcome, {username}!\n")
        else:
            print(f"{username}: File already exists. Skipping creation.")
`
        }
    ]

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
  };

  const dropdownOptions: IDropdownOption[] = Array.from({ length: 16 }, (_, i) => ({ key: `${i}`, text: `${i}` }));

    return (
        <div className="secure-prompts">
            <MainLayout />
            <h1>Output Safety</h1>
            <div className="secure-prompts-body">
                <p>You selected: <strong>{language}</strong></p>
                {/* Show different content based on the language */}
                {language === 'python' && (
                    <div>
                    {levels.map((level, index) => (
                        <Level
                            key={index}
                            title={level.title}
                            code={level.code}
                            vulnerabilityLine={level.vulnerabilityLine}
                            feedback={level.feedback}
                            fix={level.fix}
                            dropdownOptions={dropdownOptions}
                            dropdownStyles={dropdownStyles}
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

export default OutputSafety;
