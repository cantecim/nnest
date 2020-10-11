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
    uri: {
      key: 'DATABASE_URI',
      default: 'mongodb://localhost:27017/nnest',
    },
    debug: {
      key: 'DATABASE_DEBUG',
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
