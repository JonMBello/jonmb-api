import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApikeyGuard } from '../guards/apikey.guard';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces/valid-roles';
import { ApikeyProtected } from './apikey-protected.decorator';
import { RoleProtected } from './role-protected.decorator';

export const Auth = (apikeyType: string, ...roles: ValidRoles[]) => {
  return applyDecorators(
    ApikeyProtected(apikeyType),
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard, ApikeyGuard),
  );
};
