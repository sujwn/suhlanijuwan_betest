
# suhlanijuwan_betest

This project is a RESTful Applications and microservices using [ExpressJS](https://www.npmjs.com/package/express)

Table of Contents
-----------------
- [Features](#features)

- [Prerequisites](#prerequisites)

- [Getting Started](#getting-started)

- [Project Structure](#project-structure)

  

Features
--------
- [ExpressJS](https://www.npmjs.com/package/express) 
- [JWT Authentication](https://www.npmjs.com/package/jsonwebtoken)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- Request Validation with [Express Validator](https://www.npmjs.com/package/express-validator)
- [Mongoose](https://www.npmjs.com/package/mongoose) as ODM for [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/) Caching

Prerequisites
-------------
- Git
- Docker
- Node v18.13.0 or above

_If you are not using Docker, you should also have:_
- MongoDB
- Redis

Getting Started
---------------

Clone the repository and enjoy
```bash
# Clone Project
git clone https://github.com/sujwn/suhlanijuwan_betest.git

# Change Directory
cd suhlanijuwan_betest
```

#### Using Docker
```bash
# Build & Create Docker Containers
docker-compose up -d

# Access shell to the API container
docker exec -it ms_suhlanijuwan_betest /bin/bash

# Run db seeder within the container's shell
$ npm run seeder
```

#### Using Local Environment
```bash
# Install all dependencies
npm i

# Run db seeder
npm run seeder

# Run application
npm run dev
```

The application starts at port 5000 by default

API Documentation
---------------
 ### Login `GET /api/auth/login`
```bash
Use seeded user data to login.

Request body:
{
	"userName": "admin",
	"accountNumber": "00000000000"
}

This api will returns jwt token that's necessary to access the other APIs
```

### Get All Users `GET /api/users/`
```bash
Authentication: Bearer token

Request query:
page: integer (optional)
limit: integer (optional)

This api will returns list of created users
```

### Create New User `POST /api/users/`
```bash
Authentication: Bearer token

Request body example:
{
	"userName": "test01",
	"accountNumber": "00000000001",
	"emailAddress": "test01example.com",
	"identityNumber": "1230000000001"
}

This api will returns detail of created user
```

### Update User `PATCH /api/users/:id`
```bash
Authentication: Bearer token

Request body example:
{
	"userName": "test01",
	"accountNumber": "00000000001",
	"emailAddress": "test01example.com",
	"identityNumber": "1230000000001"
}

This api will returns detail of updated user
```
### Get User by Account Number `GET /api/users/account/:accountNumber`
```bash
Authentication: Bearer token

This api will returns detail of selected user 
```
### Get User by Identity Number `GET /api/users/identity/:identityNumber`
```bash
Authentication: Bearer token

This api will returns detail of selected user 
```

### Delete User  `DEL /api/users/:id`
```bash
Authentication: Bearer token
```

 Tech Stack
---------------
![My Skills](https://skillicons.dev/icons?i=nodejs,expressjs,mongodb,redis,docker)