import { Logger as NestLogger, Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {}