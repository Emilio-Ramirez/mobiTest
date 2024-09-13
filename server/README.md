# Task Management API

This is a RESTful API for a task management application built with NestJS and Prisma.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

## Features

- Create, read, update, and delete tasks
- List all tasks
- Get a specific task by ID
- Mark tasks as completed
- API documentation with Swagger

## Technologies Used

- NestJS
- Prisma ORM
- PostgreSQL
- Swagger for API documentation
- Class Validator for DTO validation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL database

## Installation

1. Clone the repository:

```

git clone git@github.com:Emilio-Ramirez/mobiTest.git
cd mobiTest/server

```

2. Install the dependencies:

```

npm install

```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

```

DATABASE_URL="postgres://vkubqpcu:hvoCLkcZWDSwSmTgpkqbpBZyr5yZIcKe@raja.db.elephantsql.com/vkubqpcu"

```

Replace `username`, `password`, and `taskdb` with your PostgreSQL credentials and desired database name.

2. Generate Prisma client:

```

npx prisma generate

```

3. Push the database schema:

```

npx primsa db push
```

Note: We're using `db push` instead of migrations because our database doesn't support shadow databases. This command will apply the schema changes directly to your database.

## Running the Application

1. Start the development server:

```

npm run start:dev

```

2. The API will be available at `http://localhost:3000`

## API Documentation

After starting the server, you can access the Swagger API documentation at:

```

<http://localhost:3000/api>

```

This provides an interactive interface to explore and test the API endpoints.

## API Endpoints

- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a specific task
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

## Testing

To run the unit tests:

```

npm run test

```

To run the e2e tests:

```

npm run test:e2e

```

## Deployment

1. Build the application:

```

npm run build

```

2. Start the production server:

```

npm run start:prod

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
