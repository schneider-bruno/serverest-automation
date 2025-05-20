# Cypress Test Automation Project

This project contains automated end-to-end and API tests written using Cypress. Includes custom test commands, a page object model, and built-in reporting via Mocha Awesome.

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version **22** was used)
- [npm](https://www.npmjs.com/)

### 🔧 Setup

1. Clone this repository.
2. Install dependencies:

   ```bash
   npm install
   ``` 

### Running tests locally
Some command lines to facilitate test execution. Run `npm run` + one of the following:
```test:api: run all api tests 
test:ui: run all ui tests 
test:user: run all user ui tests 
test:admin: run all admin ui tests 
seed-users: create test users in DB if needed
```

When any test command is run locally, a Mocha Awesome report will be generated in the mochawesome-report/ directory. Here's a report example:
![report_example](https://github.com/user-attachments/assets/097653b9-e30b-42c7-b6e2-244399d1a17b)

### Running tests in CI
1. Navigate to the Actions tab in the GitHub repository.

2. Select the relevant workflow (e.g. UI tests, API tests).

3. Click "Run workflow" to trigger the tests.

The CI workflow will automatically install dependencies and execute the appropriate test suite.

### Notes
Test data (e.g. admin credentials) should be set using environment variables. Cypress env file was commited into the code to facilitate but that should not be done in a real life scenario.


