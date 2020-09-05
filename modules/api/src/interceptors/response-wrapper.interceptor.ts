import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let result: Observable<any> | Promise<Observable<any>>;
    result = next.handle();
    if(context.getType() == "http") {
      result = result.pipe(map((data) => ({ data })));
    }
    return result;
  }
}
