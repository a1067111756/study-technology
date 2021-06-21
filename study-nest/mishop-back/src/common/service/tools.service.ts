import { Injectable } from '@nestjs/common';
import SvgCaptcha = require('svg-captcha');
import CryptoJS = require('crypto-js');

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

    svgCaptcha['base64'] =
      'data:image/svg+xml;base64,' +
      Buffer.from(svgCaptcha.data).toString('base64');

    return svgCaptcha;
  }

  /* md5加密 */
  md5Encrypt(plaintext: string): string {
    return CryptoJS.MD5(plaintext).toString();
  }
}
