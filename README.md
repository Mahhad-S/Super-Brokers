# Comp-490-Super_Seniors

Created by Mahhad, Anh, Edwin, Ethan and Emi

This project aimed to provide a web-based stock trading application that allows users to simulate stock trading using real-time data from the Finnhub API.

**Requirements to run:**
- Node.js
- MongoDB

In the terminal, type: npm i -g nodemon

**To start the local server:**
- Port 3001: cd to "server" and type "npm start"
    - utilizing app.jsx
- Port 5173 (Vite server): cd to "super-brokers" and type "npm run dev"
    - utilizing main.jsx

If nodemon is installed and your server is not starting, it may be because your execution policy is set to Restricted
To fix this, open up Windows Powershell as administrator
Type in the command: Get-ExecutionPolicy
if it says anything other than Unrestricted, then you need to input the following command: Set-ExecutionPolicy Unrestrict
Powershell will then prompt you to confirm, type the letter y in powershell to continue
And you are all set! You should be able to start the local server now
