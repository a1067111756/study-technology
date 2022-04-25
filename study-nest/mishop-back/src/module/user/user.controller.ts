import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import * as UserDto from './entity/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create
  @Post('create')
  async create(@Body() createUserDto: UserDto.CreateDto) {
    return await this.userService.create(createUserDto);
  }

  // removeById
  @Post('removeById')
  async removeById(@Body() body: UserDto.RemoveByIdDto) {
    return await this.userService.removeById(body.id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() updateUserDto: UserDto.UpdateByIdDto) {
    return await this.userService.updateById(updateUserDto);
  }

  // getById
  @Post('getById')
  async getById(@Body() body: UserDto.GetByIdDto) {
    return await this.userService.getById(body.id);
  }

  // getList
  @Post('getList')
  async getList() {
    return await this.userService.getList();
  }

  // getPage
  @Post('getPage')
  async getPage(@Body() getPageReqDto: UserDto.GetPageDto) {
    return await this.userService.getPage(getPageReqDto);
  }
}
