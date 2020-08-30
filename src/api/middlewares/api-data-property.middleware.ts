import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class ApiDataPropertyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    const superJson = res.json;
    res.json = function(body: any,) {
      if (
        body instanceof Object &&
        !(body as Record<string, any>).hasOwnProperty('data')
      ) {
        body = {
          data: body,
        };
      }
      return superJson.apply(res, [body]);
    } as any;
    next();
  }
}
