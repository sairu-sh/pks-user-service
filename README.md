## Description

Repository for PKS user service.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Api end-points

```bash
$ http://localhost:8080/api/docs
```

## Getting started with liquibase

Install liquibase cli

```
https://docs.liquibase.com/start/install/home.html
```

configure environment variables to load for liquibase`

```bash
LIQUIBASE_COMMAND_CHANGELOG_FILE=[Path to liquibase changelog file]
LIQUIBASE_COMMAND_USERNAME=[Username to connect database]
LIQUIBASE_COMMAND_PASSWORD=[Password to connect database]
LIQUIBASE_COMMAND_DRIVER=[JDBC driver class for postgres]
LIQUIBASE_COMMAND_URL=[The JDBC database connection URL] <jdbc:postgresql://db_host:db_port/db_name>
```
