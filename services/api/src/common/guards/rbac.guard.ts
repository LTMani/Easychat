import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, UserSessionPayload } from '@easychat/shared';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserSessionPayload;

    if (!user || !user.permissions) {
      throw new ForbiddenException('Access denied: User session has no permission metadata');
    }

    const hasAllRequired = requiredPermissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasAllRequired) {
      throw new ForbiddenException(`Access denied: Missing required permission(s)`);
    }

    return true;
  }
}
