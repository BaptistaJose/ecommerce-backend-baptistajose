import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/Users/enum/role.enum';

export const Roles = (...args: Role[]) => SetMetadata('role', args);
