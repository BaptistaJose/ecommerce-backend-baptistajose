import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../auth/enums/roles.enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles)