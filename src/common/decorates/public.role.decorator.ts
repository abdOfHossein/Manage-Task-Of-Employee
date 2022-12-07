import { SetMetadata } from '@nestjs/common';
export const PublicRole = () => SetMetadata('allowRoleGuard', true);