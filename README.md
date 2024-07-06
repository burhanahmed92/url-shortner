# URL Shortening Service

This is a URL shortening service built with NestJS. It provides an API to submit a URL to be shortened and then redirects users from the shortened URL to the original URL.

## Prerequisites

- Node.js (v18 or later)
- Yarn
- PostgreSQL (v15 or later)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/burhanahmed92/url-shortner.git
cd url-shortner

yarn install
```

### Configure Environment Variables

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
PORT=3000
BASE_URL=http://localhost:3000/url
```

### Run the Application

```
yarn start:dev
```

The application will start on `http://localhost:3000`.

### API Documentation

You can access the API documentation using Swagger at `http://localhost:3000/api`.

### Using Swagger

1.  Navigate to `http://localhost:3000/docs` in your web browser.
2.  You will see the Swagger UI with the available API endpoints.
3.  You can test the endpoints directly from the Swagger UI.

### Available API Endpoints

#### Shorten URL

- **Endpoint**: `/url/shorten`
- **Method**: `POST`
- **Request Body**:

  `{
  "url": "https://example.com"
}`

- **Response**:

  `{
  "shortUrl": "http://localhost:3000/url/abc123"
}`

#### Redirect to Original URL

- **Endpoint**: `/url/:shortId`
- **Method**: `GET`
- **Response**: Redirects to the original URL.

### Running Test Cases

To run the test cases, use the following command:
`yarn test`

## Project Structure

- `src/`: Contains the source code of the application
  - `app.module.ts`: The main application module
  - `url-shortener/`: Contains the URL shortening module
    - `url-shortener.controller.ts`: The controller handling URL shortening and redirection
    - `url-shortener.service.ts`: The service handling the business logic
    - `entities/`: Contains the database entities
- `.spec.ts`: Files Contains the test cases
