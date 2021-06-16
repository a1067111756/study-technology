import { Controller, Get } from '@nestjs/common';
import { ToolsService } from 'src/common/service/tools.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly toolsService: ToolsService) {}

  /* 获取验证码 */
  @Get('captcha')
  getCaptcha() {
    return this.toolsService.createCaptcha();
  }
}
