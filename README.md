# RESTful API — Starter Files

## Requirements

> Node.js v8.x with `async/await`
>
> This version of RESTful API uses **hapi v17**. For hapi v16, use a [`1.x` release]

Enclave Engineer Management RESTful API uses hapi v17 and has full `async/await` support.

**Requirements**

- Node.js **v8.x** or later
- NPM/Yarn to install the project’s dependencies

## Setup and Run

To run your own RESTful API , clone this repository, install the dependencies, start a postgreSQL instance on your own machine.

```bash
# clone repository

cd project

# install dependencies
yarn install/ npm install

# create database with pgAdmin4

#Run migration-up
$ knex migrate:latest

#Run migration-down
$ knex migrate:rollback

#Run seed files
$ knex seed:run

# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev

#Create a named migration or seed file
$ knex migrate:make <name>
$ knex seed:make <make>

# that’s it :)
```

The starter kit doesn’t contain any logging. If you don’t see any errors while starting the `app/index.js`,
[visit localhost:3000](http://localhost:3000). Have fun!

## Test

```bash
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn watch:lint                          # Search error and warning
```

## Thank You with a Hug!

It’s great to see you exploring this repository. Really! Dig through the code and hopefully you’ll take wins away ❤️
