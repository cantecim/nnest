import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { ServerResponse } from 'http';

@Injectable()
export class ApiDataPropertyMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    const super_json = res.json;
    res.json = function(body: any, ...others) {
      if(body instanceof Object && !(body as Object).hasOwnProperty('data')) {
        body = {
          data: body
        };
      }
      return super_json.apply(this, [body, ...others]);
    } as any
    next();
  }
}
