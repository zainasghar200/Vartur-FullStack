# Vartur

A product management system for managing and maintaining products. This server control the CRUD operation for product

# Server Side Setup

# Installation

Following are the steps to setup this project

## npm install

First you have to install node_modules folder by using 'npm install'

## npx prisma generate

As we are using prisma in this project, so we need to run 'npx prisma generate' command. This command read your database schema which is present in 'prisma/schema.prisma' and generates a strongly-typed client library in your project's node_modules/@prisma/client directory

## npm start

To run the project we use 'npm start'

# Dependencies

## fastify

Fastify is a web framework designed for back-end web development. It is a more lightweight alternative to heavier Node.js API frameworks such as Hapi and Express

## prisma

Prisma is a next-generation object–relational mapper (ORM) that helps developers build faster and make fewer errors. It is an open-source ORM for Node.js and TypeScript that provides type-safety, automated migrations, and an intuitive data model

## @prisma/client

Use to access database using primsa. This will create prisma client for accessing database

## fastify-multer

Use to store images in static folder which is present in root directory

## fastify-multipart

Use to process the request from client which is in form-data

## @fastify/cors

Use to enable CORS so that any origin or specified origin can request to the server

## @fastify/mongodb

Use to connect and access mongodb using Prisma and Fastify

## @fastify/static

Use to specify static file or folder in root directory

## dotenv

Use to create environment variables

## http-status-codes

Use to easily use status codes in sending response to client

# Client Side Setup

# Installation

Following are the steps to setup this project

## npm install

First you have to install node_modules folder by using 'npm install'

## npm run serve

To run the project we use 'npm run serve'. This command will use .env file for environment

## npm run dev

To run the project we use 'npm run dev'. This command will use .env.production file for environment and run app in production mode
