import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './entity/dto/createUser.dto';
import { UpdateUserDto } from './entity/dto/updateUser.dto';
import { GetPageReqDto } from './entity/dto/getPageReq.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // removeByName
  @Post('removeByName')
  async removeByName(@Body() name) {
    return await this.userService.removeByName(name);
  }

  // removeById
  @Post('removeById')
  async removeById(@Body() id) {
    return await this.userService.removeById(id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateById(updateUserDto);
  }

  // getById
  @Post('getById')
  async getById(@Body() id: string) {
    return await this.userService.getById(id);
  }

  // getList
  @Post('getList')
  async getList() {
    return await this.userService.getList();
  }

  // getPage
  @Post('getPage')
  async getPage(@Body() getPageReqDto: GetPageReqDto) {
    return await this.userService.getPage(getPageReqDto);
  }
}
