import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ToolsService } from 'src/common/service/tools.service';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { NoAuth } from 'src/common/decorator/auth.decorator';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly authService: AuthService,
  ) {}

  /* 获取验证码 */
  @NoAuth()
  @Get('captcha')
  async getCaptcha(@Request() req) {
    // 获取svgCaptcha实例
    const svgCaptcha = await this.toolsService.createCaptcha();

    // 将svgCaptcha信息保存到cookie
    req.session.captcha = svgCaptcha.text.toUpperCase();

    // 返回svg格式验证嘛
    return {
      base64: svgCaptcha['base64'],
      uuid: 'xxxxx',
    };
  }

  /* 登录 */
  @NoAuth()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    // 验证验证码正确性
    if (loginDto.captcha.toUpperCase() !== req.session.captcha) {
      throw new CommonRequestException('00002', '验证码错误');
    }

    // 验证账号信息正确性
    return await this.authService.login(loginDto);
  }

  /* 注册 */
  @NoAuth()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  /* 获取用户信息 */
  @Get('userInfo')
  async getUserInfo() {
    return {
      code: '00000',
      data: {},
    };
  }
}
