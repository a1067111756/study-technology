import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { ToolsService } from 'src/common/service/tools.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly toolsService: ToolsService) {}

  /* 获取验证码 */
  @Get('captcha')
  async getCaptcha(@Request() req, @Response() res) {
    // 获取svgCaptcha实例
    const svgCaptcha = await this.toolsService.createCaptcha();

    // 将svgCaptcha信息保存到cookie
    req.session.captcha = svgCaptcha.text.toUpperCase();

    // 返回svg格式验证嘛
    res.send({
      code: '00000',
      data: svgCaptcha['base64'],
    });
  }

  /* 登录 */
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { username, password, captcha } = req.body;

    if (username !== 'admin' || password !== 'admin123') {
      return res.send({
        code: '00002',
        message: '账号或密码错误',
      });
    }

    if (req.session.captcha !== captcha) {
      return res.send({
        code: '00003',
        message: '验证码错误',
      });
    }

    // 返回svg格式验证嘛
    return res.send({
      code: '00000',
      data: 'asndasndasndkoasdplmasd',
    });
  }

  /* 注册 */
  @Post('register')
  async register(@Request() req, @Response() res) {
    // 返回svg格式验证嘛
    res.send({
      code: '00000',
      data: '',
    });
  }
}
