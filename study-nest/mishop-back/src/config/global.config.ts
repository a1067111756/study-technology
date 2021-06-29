/* 全局注册配置文件 */
import path = require('path');
import session = require('express-session');
import cookieParser = require('cookie-parser');
import { ParamsValidatePipe } from 'src/common/pipe/params-validate.pipe';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';

const install = (app: NestExpressApplication) => {
  // 配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  // 配置cookie
  app.use(cookieParser('mishop-cookie'));

  // 配置session
  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
      rolling: true,
    }),
  );

  // 配置允许跨域
  app.enableCors();

  /* 全局拦截器注册 */
  // 注册返回结果拦截器 - 统一格式化返回结果
  app.useGlobalInterceptors(new ResponseInterceptor());

  /* 全局管道注册 */
  // 注册参数校验管道 - 校验入参合法性
  app.useGlobalPipes(new ParamsValidatePipe());
};

export default {
  install,
};
