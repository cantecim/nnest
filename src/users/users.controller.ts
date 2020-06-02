import { Controller, Logger } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly logger: Logger) {
    logger.setContext(this.constructor.name);
  }
}
