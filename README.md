# tax-calculator

## Project Overview

This repository contains the frontend and backend code for the tax calculator project. The frontend is built with React (as agreed upon during the interview), and the backend is developed using NestJS.

## Project Structure

```plaintext
Root folder
├── api (based on NestJS)
└── web (based on React)
```

### Prerequisites
  Node.js (version 18.x or later)

### Getting Started

#### Clone the Repository
```bash
git clone https://github.com/vedmitra/tax-calculator.git
```
```bash
cd tax-calculator
```

#### Backend Setup (NestJS)
Navigate to the api directory:
```bash
cd api
```
Install dependencies:
```bash
npm install
```
Start the NestJS server:
```bash
npm run start
```
The backend server will be running on http://localhost:3000 (default port for NestJS).

#### Frontend Setup (React)
Navigate to the web directory:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
The frontend will be running on http://localhost:3001.

### What Was Completed
#### Front End
* Developed using React (agreed during interview)
* State management using Redux
* Form handling and validation using React Hook Form
* Implemented routing with React Router
* nManaged component lifecycle methods
* Created responsive UI with quality CSS

#### Backend
* Developed using NestJS
* Created RESTful APIs following best practices
* Implemented basic input validation and security measures

### What Couldn't Be Completed
#### Front End
* CI/CD pipeline setup
* Extensive code cleanup
* Additional tests for comprehensive coverage
* Code coverage

#### Backend
* CI/CD pipeline setup
* Database schema creation and integration with PostgreSQL
* Extensive error handling (some basic error handling exists)
* Authentication mechanisms
* Full code coverage (covered some important areas)
* Code cleanups and optimization

### Access the Application
* Frontend: http://localhost:3001
* Backend: http://localhost:3000
