import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_APIKEY } from '../decorators/apikey-protected.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configservice: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKeyType: string = this.reflector.get(
      META_APIKEY,
      context.getHandler(),
    );
    if (!apiKeyType) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const headers = req.headers as Headers & { apikey: string };
    if (!headers) throw new ForbiddenException('You shall not pass');
    const apiKey = headers.apikey || '';
    if (!apiKey) throw new ForbiddenException('You shall not pass');
    if (
      this.configservice.get(`${apiKeyType.toUpperCase()}_API_KEY`) === apiKey
    )
      return true;
    throw new ForbiddenException('You shall not pass');
  }
}
