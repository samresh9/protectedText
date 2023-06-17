
# Protected Text API

The Api is used to store the note,to-do,texts in encrypted form using your unique id and password.
And can access them using the id anywhere in a secure way. 

## Development URL
You can access the development version of the project at [Development Url](https://protected.samresh.com.np/).
## Getting Started
To get started with this project, follow the steps below:

1. Clone the repository:
git clone https://github.com/username/repository.git

2. Install dependencies:
npm install

3. Create a `.env` file at the root of your project.

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

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_CONNECTION_URI`


## API Reference### Api Documentation
The URL for API documentation: https://protected.samresh.com.np/api-docs
### Base URL
The base URL for all API endpoints is: `https://protected.samresh.com.np`

## Endpoints
### The Temporary API for encrypting and decrypting content
#### Encrypt the content

#### `POST /crypto/encrypt`
Description: This end point is temporarily used to encrypt the given content with the secretkey.

Example Request Body:
```json
{
  "content": "this is an example",
  "secretKey": "secretKey"
}
```

Example Response:
```json
{
  "data": {
    "content": {
      "encrypted": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
      "hash": "3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918",
      "decrypted": null
    }
  }
}
```
The example response is presented as a JSON object that describes:
- The `encrypted` property represents the encrypted content.
- The `hash` property represents the hash value calculated for the content.
- The `decrypted` property is set to `null`, indicating that the decrypted content is not available in this response.
#### Decrypt the content
#### `POST /crypto/decrypt`
Description: This end point is temporarily used to decrypt the given content with the secretkey.

Example Request Body:
```json
{
  "encryptedContent": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
  "secretKey": "secretKey"
}
```

Example Response:
```json
{
  "data": {
    "content": {
      "encrypted": null,
      "hash": null,
      "decrypted": "This is an example"
    }
  }
}
```
In this example response:

- The `encrypted` property is set to `null`, indicating no encrypted content is present.
- The `hash` property is also set to `null`, indicating no hash value is available.
- The `decrypted` property contains the string value `"This is an example"`, representing the decrypted content.

### Api for Creating, Updating and Getting Notes
#### Create a new note or update an existing note
#### `POST /api/notes`
Description: This end point is used to create or update the note.

Example Request Body:
```json
{
  "id": "test",
  "encryptedContent": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
  "hash": "3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918"
}
```

Example Response if new note is created:
```json
{
  "new": true,
  "updated": false,
  "data": {
    "id": "samresh",
    "content": {
      "encrypted": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
      "decrypted": null
    }
  }
}
```
Example Response if note is updated:
```json
{
  "new": false,
  "updated": true,
  "data": {
    "id": "samresh",
    "content": {
      "encrypted": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
      "decrypted": null
    }
  }
}
```
Example Response if no change in note:
```json
{
  "new": false,
  "updated": false,
  "data": {
    "id": "samresh",
    "content": {
      "encrypted": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
      "decrypted": null
    }
  }
}
```
The example responses illustrate various scenarios for a note management API:
- When a new note is created, the response includes a "new" property set to true and an "updated" property set to false. The "data" property contains the details of the note, including the "id" and "content", with the content encrypted and the "decrypted" field set to null.
- If a note is updated, the response includes a "new" property set to false and an "updated" property set to true. The "data" property holds the details of the note, including the "id" and "content", with the updated content encrypted and the "decrypted" field set to null.
- In the case where there is no change in the note, the response includes both the "new" and "updated" properties set to false, along with the same note details in the "data" property.

#### Create a new note or update an existing note
#### `GET /api/notes/{id}`
Description: This end point is used to get the content by Id as parameter.

Example Response :
```json
{
  "data": {
    "id": "samresh",
    "content": {
      "encrypted": "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
      "decrypted": null
    }
  }
}
```
- The data property contains the note details.
- The id property holds the note's unique identifier.
- The content property includes the encrypted content of the note.
- The decrypted property is null, indicating that the decrypted content is not available.

### Possible Errors

#### Not Found `404`
Description: This error occurs when the endpoint is not found.

Error Example:
``` JSON
{
  "message": "Not Found GET /api/notes/dfasfd",
  "code": "NOT_FOUND"
}
```
#### Validation Error `400`
Description: This error occurs when the Validation of given data fails.

Error Example:
``` JSON
{
  "message": "Note unique id is required",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "type": "field",
      "msg": "Note unique id is required",
      "path": "id",
      "location": "body"
    }
  ]
}
```
#### Internal Server Error `500`
Description: This error occurs due to internal server error.
Error Example:
``` JSON
{
  "message": "<Message From Error>"
}
```
## Contributing

Contributions are always welcome!
## Contribution Guide

Thank you for considering contributing to our project! We appreciate your time and effort in helping us improve.

### Table of Contents
- [Render Deployment](#render-deployment)
- [Git Hooks and Husky](#git-hooks-and-husky)
- [Environment Variables](#environment-variables)

---

### Render Deployment

Our project is automatically deployed on the Render platform. When you your pull request (PR) , it will trigger an automatic deployment on Render.

### Git Hooks and Husky

We utilize Husky, a Git hook tool, to enforce certain actions and maintain a consistent workflow within our project. Git hooks are scripts that run before or after specific Git events.



- **Pre-commit Hook**: We have setup the pre-commit hook that runs code formatting scripts and linters to ensure code consistency before committing changes. 

Please ensure that your code meets the required standards and passes the necessary checks before committing or pushing changes.

---

### Environment Variables

Certain parts of our application require the presence of environment variables for proper configuration. These variables are typically stored in a `.env` file at the root of the project.

Before running the project locally, make sure to create a `.env` file and provide the following variables:

- `MONGO_CONNECTION_URI`: The connection URI for  MongoDB database. Replace `your-mongodb-uri` with the actual connection string.

Here's an sample of how your `.env` file should look:

```plaintext
MONGO_CONNECTION_URI= your-mongodb-uri
