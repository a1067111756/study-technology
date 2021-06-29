import { SetMetadata } from '@nestjs/common';

// 跳过全局auth认证
export const NoAuth = () => SetMetadata('no-auth', true);
