import { Module } from '@nestjs/common';
import { ApiDataPropertyMiddleware } from './middlewares/api-data-property.middleware';
import { ResponseWrapperInterceptor } from "./interceptors/response-wrapper.interceptor";

@Module({
  providers: [ApiDataPropertyMiddleware, ResponseWrapperInterceptor]
})
export class ApiModule {}
