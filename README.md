![https://nestjs.com/img/logo_text.svg](https://nestjs.com/img/logo_text.svg)

Another starter for [Nest](https://github.com/nestjs/nest)

## What it includes?

- GraphQL (@nestjs/graphql graphql-tools graphql apollo-server-express tools)
- TypeORM with PostgreSQL and SQLite drivers (typeorm pg sqlite3)
- TypeORM module from NestJS (@nestjs/typeorm)
- Joi validator (@hapi/joi dev:@types/hapi__joi)
- Metadata Reflection API (reflect-metadata)
- Configuration from NestJS using dotenv (@nestjs/config)
- Winston logging (nest-winston winston)
- Passport (@nestjs/passport passport passport-local dev:@types/passport-local)
- JWT Authentication (@nestjs/jwt passport-jwt dev:@types/passport-jwt)
- Class Transformer and Class Validator (class-transformer class-validator)
- Feature ready "typeorm" module see [Features]((#features)) section for details
- Feature ready "users" module see [Features]((#features)) section for details
- Feature ready "auth" module see [Features]((#features)) section for details
- custom "api" module see [Features]((#features)) section for details

## Features

- Environment variable validations
    - NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development')
    - PORT: Joi.number().default(3000)
- Fully configured winston logger
- Well configured "typeorm" module
    - BaseEntity class
        - id, createdAt, updatedAt, hooks to automatically validate on insert and update
    - BaseRepository class
        - nothing here, there might be some good features in the feature
- Well configured "auth" module
    - passport integration
    - passport-local and passport-jwt strategy
    - JwtAuthGuard and LocalAuthGuard
    - import PassportModule with register method call for default strategy
    - auth/login endpoint with email and password fields
    - bcrypt password hashing
- Well configured "users" module
    - Basic user entity
    - ... todo
- "api" module
    - Data property wrapper middleware for json responses
- module-aliases to modules, ts-config/path configured
    - dont forget to add your module into _moduleAliases in package.json
- Full support for GraphQL
    - login, registration, auth guards, etc... are already set

# How-tos

## How to inject logger?

You need to use WinstonModule, WinstonModule is a global module, you don't need to import it, though, I like importing, then you can use DI with Logger class from @nestjs/common

```jsx
import { Logger } from '@nestjs/common';

@Injectable()
export class SomeService {
  constructor(
    private readonly logger: Logger,
  ) {
    logger.setContext(this.constructor.name);
  }
}
```

## How to use typeorm CLI

There is a **typeorm** script in packages.json, so you can use

```bash
npm run typeorm
# to pass arguments use it like this
npm run typeorm migration:generate -- --name NewMigration
```

Also we have other script to help you with **migration** and **schema** commands

```bash
# typeorm migration:generate -n ...
npm run migration:generate [name] [-- [options]]
# typeorm migration:show ...
npm run migration:show [-- [options]]
# typeorm migration:run ...
npm run migration:run [-- [options]]
# typeorm migration:revert ...
npm run migration:revert [-- [options]]

# typeorm schema:log ...
npm run schema:log [-- [options]]
# typeorm schema:sync ...
npm run schema:sync [-- [options]]
```

You can use **schema:log** command to see do you need a new migration file, then you can generate one with **migration:generate** command.

Creating and managing migrations responsibility is on you, generated migration files will be in src/migrations folder.

> TypeORM CLI or helper scripts will be used on the production driver, so some commands will need the database created. This means driver overriding to SQLite in development will not take in place when using these commands

### How you supposed to own migration life-cycle

Basically, you will need to create migration files with helper commands we provide for every entity changes, and then apply them.

This way, typeorm will know the differences and will create a correct migration file. If you won't apply every single migration file, the newly generated migration file might contain multiple entity changes that you might not want to contain in a single file.

The one more thing is, you will need to create an initial migration. We have a predefined user entity, so do your modifications, create your initial entities, etc... when you are ready to create your initial migration just like any other one

## Exception handling and validations

Global ValidationPipe is configured to make your life easier with validation errors, so request DTO's will be automatically validated and processed

### What about custom validations? like entity validation?

If you look at the **UsersService** how it saves a User into database, you will see there is a call to **entityValidateOrReject** method.

This method is your helper to simulate the same automatic logic with request DTO's, you can validate any entity, or another type classes with class-validator library and with this helper.

This method simply validates the given object and throws **EntityValidationException** if any validation error occurs

Our global **EntityValidationExceptionFilter** filter is configured to help you out here, it handles all the **EntityValidationException** for you.

Also, there is a **safeValidateOrReject** helper in api module too. It does the same thing only difference is throw and **ValidationException** that derives from **HttpException**, so global exception filter is handling this exception too.
