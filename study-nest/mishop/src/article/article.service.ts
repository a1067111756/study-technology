import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  articleAdd(): string {
    return '访问/article/add路由方法';
  }
}
