![https://nestjs.com/img/logo_text.svg](https://nestjs.com/img/logo_text.svg)

Another starter for [Nest](https://github.com/nestjs/nest) as a monorepo!

## What it includes?

- Lerna!
- yarn workspaces configured
- Well-defined folder structure
- Husky! pre-push hook to force lint fixes
- GraphQL (@nestjs/graphql graphql-tools graphql apollo-server-express tools)
- MongoDB support (mongoose @typegoose/typegoose dev:@types/mongoose)
- nestjs-typegoose module (@nestjs-typegoose)
- Joi validator (@hapi/joi dev:@types/hapi__joi)
- Metadata Reflection API (reflect-metadata)
- Configuration from NestJS using dotenv (@nestjs/config)
- Winston logging (nest-winston winston)
- Passport (@nestjs/passport passport passport-local dev:@types/passport-local)
- JWT Authentication (@nestjs/jwt passport-jwt dev:@types/passport-jwt)
- Class Transformer and Class Validator (class-transformer class-validator)
- Feature ready "mongoose" module see [Features](#features) section for details
- Feature ready "users" module see [Features](#features) section for details
- Feature ready "auth" module see [Features](#features) section for details
- custom "api" module see [Features](#features) section for details

## Features

- Environment variable validations
    - NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development')
    - PORT: Joi.number().default(3000)
- Fully configured winston logger
- Well configured "mongoose" module
    - BaseSchema class
        - _id, createdAt, updatedAt
        - hooks to automatically validate on insert and update
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
    
# Folder structure

```ts
+-- scripts // development scripts
+-- apps // application packages
|   +-- <app> // typical nestjs app folder structure
|   |   +-- src // application sources
|   |   +-- dist // application compiled sources
+-- libs // library packages
|   +-- <lib>
|   |   +-- src // lib sources
|   |   +-- src // lib compiled sources
+-- modules // nest module packages
|   +-- <module> // typical nestjs module folder structure
|   |   +-- src // module sources
|   |   |   +-- exceptions // exception classes
|   |   |   +-- helpers // helper methods, etc.
|   |   |   +-- interceptors // nestjs interceptor classes
|   |   |   +-- middlewares // express middlewares
|   |   |   +-- filters // nestjs filter classes
|   |   |   +-- dtos // dto classes
|   |   |   +-- schemas // mongoose schema classes using typegoose
|   |   |   +-- services // nestjs module services
|   |   |   +-- controllers // nestjs module controllers
|   |   |   +-- resolvers // nestjs module graphql resolvers
|   |   +-- dist // module compiled sources
```

### Some tips for your packages
You can use publishConfig.directory to make distribution folder available as just like published package  
  
We have setup everything for you, a postinstall script takes care of linking process in the root package.json

### Known-issues about packages

Unfortunately, packages under **modules/*** might depend on each other  
build:modules script should have correct order to build successfully  
_Actually, currently we don't have circular dependency in modules_ 
  
packages under **libs/*** doesn't depend each other, keep it that way  
  
And, of course, packages under **apps/*** must not depend each other.
They should depend on **libs** and **modules**

# How-tos

## How to inject logger?

You need to use WinstonModule, WinstonModule is a global module, you don't need to import it, though, I like importing, then you can use DI with Logger class from @nestjs/common

```typescript
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
## How to design my services?

## For database CRUD operations
Be sure to always return DocumentType<any> on you crud methods

## For other logical methods in services
You can create specific dtos for that job to create some contract to cover your entire operation

# How to use class-transformer? is there any quirks?
YES!  
  
We have a patch for class-transformer, and it is activated in the main.ts file  
 
This patch does the followings  

- Patches **plainToClass** to set default options
    - set excludeExtraneousValues to true
    
So this means to you that you need to be a little extra carefull about your dtos, or another classes that you will use with class-transformer  

- Be sure to add **@Expose** decorator to all properties in your class
    - otherwise class-transformer won't be able to transform properties
- We are explicitly setting an options parameter to set excludeExtraneousValues to **false** on automatic document validation function **schemaValidateOrReject**
    - that way you don't need to use **@Expose** parameter on your schemas


## How to use mongoose? is there any quirks?

### Automatic Document validation support
We have set up a method to automatically validate your documents before inserting them, on pre save middleware of mongoose, we are calling our beatiful **schemaValidateOrReject** helper to validate the document with the rules defined in your schema class using **class-validator**

So, all of the **class-validator** features are available to serve you! even **@ValidateNested** on your maps, array, etc.

Be sure to extend your schemas from **BaseSchema** inside @nnest/mongoose module  
otherwise this feature won't work, as we build that on the **BaseSchema**

## Exception handling and validations

Global ValidationPipe is configured to make your life easier with validation errors, so request DTO's will be automatically validated and processed

### What about custom validations? like entity validation?

If you look at the **UsersService** how it saves a User into database, you will see there is a call to **schemaValidateOrReject** method.

This method is your helper to simulate the same automatic logic with request DTO's, you can validate any document, or another type classes with class-validator library and with this helper.

This method simply validates the given object and throws **SchemaValidationException** if any validation error occurs

Our global **SchemaValidationExceptionFilter** filter is configured to help you out here, it handles all the **SchemaValidationException** for you.

In most cases you do not need to call **schemaValidateOrReject** because we have a hook in **BaseSchema** that calls the method automatically for you on any save operation (inserts and updates), go remove the line in **UserService** and you will see it will still validate

Also, there is a **safeValidateOrReject** helper in api module too. It does the same thing only difference is throw and **ValidationException** that derives from **HttpException**, so global exception filter is handling this exception too.
