# Questionnaire Project To-Do List

## Base Level
- [x] **Questionnaire Catalog Page:**
  - [x] Display a paginated list of available questionnaires.
  - [x] Each questionnaire card should include:
    - [x] Questionnaire name.
    - [x] Description.
    - [x] Amount of questions.
    - [x] Amount of completions.
    - [x] Actions: edit, run, delete (with "edit" action linking to a page similar to the creation page).

## Middle Level
- [x] **Questionnaire Catalog Page:**
  - [x] Add ability to sort questionnaires by:
    - [x] Name.
    - [x] Amount of questions.
    - [x] Amount of completions.
- [x] **Questionnaire Builder Page:**
  - [x] Add drag-and-drop functionality to allow users to re-order questions/answers.
- [x] **Interactive Questionnaire Page:**
  - [x] Save intermediate completion state so that when the user refreshes the page, they can continue from where they left off.

## Advanced Level
- [x] **Questionnaire Catalog Page:**
  - [x] Add infinite scroll pagination (automatically load more questionnaires as the user scrolls).
- [x] **Questionnaire Statistics Page:**
  - [x] Display general statistics for the questionnaire including:
    - [x] Average completion time.
    - [x] Amount of completions per day/week/month (using line/bar charts).
    - [x] Pie chart for each question (displaying the count of selections per question answer).
- [x] **Questionnaire Builder Page:**
  - [x] Add an "image" question type to allow users to upload images for this question during questionnaire completion.



Here's a basic `README.md` for running a Vite + React app:

```markdown
# Vite React App

This is a Vite-powered React app template.

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (package manager)

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/m1liaron/questionnaire-builder
cd frontend
```

### 2. Install dependencies


Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

```
cd .. 
cd server
npm install
```


### 3. Start the development server

Once the dependencies are installed, you can start the development server with:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Your app will be running on [http://localhost:5173](http://localhost:5173).

### 4. Open the app in your browser

Visit the URL provided by the terminal (usually `http://localhost:5173`) to see your Vite React app in action!

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev` or `yarn dev`

Starts the development server.

### `npm run build` or `yarn build`

Builds the app for production.

### `npm run preview` or `yarn preview`

Preview the production build.

## Learn More

To learn more about Vite, React, and how to customize your app, check out the following resources:

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)