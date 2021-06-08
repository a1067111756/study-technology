import { Controller, Get } from '@nestjs/common';

@Controller('article') // 一级路由
export class ArticleController {
  @Get() // 不加地址表示一级路由的默认匹配
  article(): string {
    return '访问/article路由方法';
  }

  @Get('add') // 二级路由 // 注意级路由间不需要加 '/'
  articleAdd(): string {
    return '访问/article/add路由方法';
  }
}
