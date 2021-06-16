import { Injectable } from '@nestjs/common';
import SvgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  /* 生成验证码 */
  createCaptcha() {
    const svgCaptcha = SvgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });

    return svgCaptcha;
  }
}
