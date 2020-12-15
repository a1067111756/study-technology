import { Controller, Get, Post, Response } from '@nestjs/common'

@Controller('/cancel')
export class CancelController {
  @Get()
  getTest(@Response() res): void {
    setTimeout(() => {
      res.json({
        code: '000000',
        message: 'get方法测试成功!'
      })
    }, 4000)
  }
}