import * as Joi from '@hapi/joi';

export default {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
  }),
};

export interface IConfigurationEnum {
  key: string;
  default: string;
}

export interface IConfigurationObj {
  [key: string]: {
    [key: string]: IConfigurationEnum
  };
}

export const ConfigurationsEnum: IConfigurationObj = {
  app: {
    env: {
      key: 'NODE_ENV',
      default: 'development',
    },
    port: {
      key: 'PORT',
      default: '3000',
    },
    logLevel: {
      key: 'LOG_LEVEL',
      default: 'INFO',
    },
  },

  db: {
    sqliteInDev: {
      key: 'SQLITE_IN_DEV',
      default: 'false',
    },
    driver: {
      key: 'DATABASE_DRIVER',
      default: 'postgres',
    },
    host: {
      key: 'DATABASE_HOST',
      default: 'localhost',
    },
    port: {
      key: 'DATABASE_PORT',
      default: '5432'
    },
    username: {
      key: 'DATABASE_USERNAME',
      default: 'default'
    },
    password: {
      key: 'DATABASE_PASSWORD',
      default: 'secret'
    },
    name: {
      key: 'DATABASE_NAME',
      default: 'my_app'
    },
    migrationsRun: {
      key: 'DATABASE_MIGRATIONS_RUN',
      default: 'true'
    }
  },

  jwt: {
    secret: {
      key: 'JWT_SECRET',
      default: 'your-hidden-secret'
    },
    expiresIn: {
      key: 'JWT_EXPIRES_IN',
      default: '30d'
    }
  }
};
