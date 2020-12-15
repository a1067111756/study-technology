import { Controller, Get, Post, Response } from '@nestjs/common'

@Controller('/method')
export class MethodController {
  @Get()
  getTest(@Response() res): void {
    res.json({
      code: '000000',
      message: 'get方法测试成功!'
    })
  }

  @Post()
  postTest(@Response() res): void {
    res.json({
      code: '000000',
      message: 'post方法测试成功!'
    })
  }
}