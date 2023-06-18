
# Protected Text API

The Api is used to store the note,to-do,texts in encrypted form using your unique id and password.
And can access them using the id anywhere in a secure way. 

## URLs
You can access the You can access the live version of the project at [Live Url](https://protected.samresh.com.np/). Also You can access the You can access the development version of the project at [Development Url](https://protected-dev.samresh.com.np/)
## Getting Started
To get started with this project, follow the steps below:

1. Clone the repository:
git clone https://github.com/username/repository.git

2. Install dependencies:
npm install

3. Create a `.env` file at the root of your project and clone `sample.env` and fill your own values.

4. Start the project:
- For running in development mode :
  ```
  npm run start:dev
  ```

- For running in production mode:
  ```
  npm run start:prod
  ```

## Scripts
- `start`: Starts the project in production mode.
- `dev`: Starts the project in development mode with hot-reloading using Nodemon.
- `start:dev`: Starts the project in development mode with hot-reloading and debugging enabled.
- `start:prod`: Starts the project in production mode with debugging enabled.
- `lint`: Runs ESLint to lint the project files.
- `lint:fix`: Runs ESLint and automatically fixes linting issues.
- `test`: Runs Jest for running tests.
- `prepare`: Sets up Husky for Git hooks.



## API Reference
### Base URL
The base URL for all API endpoints is: `https://api.example.com`
### Api Documentation
The URL for API documentation: https://protected.samresh.com.np/api-docs
### Base URL
The base URL for all API endpoints is: `https://api.example.com`


## Contribution Guide

Thank you for considering contributing to our project! We appreciate your time and effort in helping us improve.

### Render Deployment

Our project is automatically deployed on the Render platform. When you your pull request (PR) , it will trigger an automatic deployment on Render.

### Git Hooks and Husky

We utilize Husky, a Git hook tool, to enforce certain actions and maintain a consistent workflow within our project. Git hooks are scripts that run before or after specific Git events.



- **Pre-commit Hook**: We have setup the pre-commit hook that runs code formatting scripts and linters to ensure code consistency before committing changes. 

Please ensure that your code meets the required standards and passes the necessary checks before committing or pushing changes.

---

### Environment Variables

Certain parts of our application require the presence of environment variables for proper configuration. These variables are typically stored in a `.env` file at the root of the project.

Before running the project locally, make sure to create a `.env` file and you can clone the `sample.env` and fill your value accordingly. Log realted configuration have default value, therefore do not require values frome .env.


