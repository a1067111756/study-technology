import { Controller, Post, Response } from '@nestjs/common'

@Controller('/error')
export class ErrorController {
  @Post('/timeout')
  timeOutErrorTest(@Response() res): void {
    setTimeout(_ => {
      res.json({
        code: '000000',
        message: 'post方法测试成功!'
      })
    }, 5000)
  }

  @Post('/statusCode')
  statusCodeErrorTest(@Response() res): void {
    res.status(500)
    res.end()
  }  
}