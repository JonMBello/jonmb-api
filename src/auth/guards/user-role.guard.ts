import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { DecodedData } from '../interfaces/decoded-data.interface';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: DecodedData }>();
    const decoded = req.user;
    if (!decoded) throw new BadRequestException('Not a valid jwt');
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;
    for (const role of decoded.roles) {
      if (validRoles.includes(role)) return true;
    }
    throw new ForbiddenException('Not a valid jwt');
  }
}
