import { Module } from '@nestjs/common';
import { ApiDataPropertyMiddleware } from './middlewares/api-data-property.middleware';

@Module({
  providers: [ApiDataPropertyMiddleware]
})
export class ApiModule {}
