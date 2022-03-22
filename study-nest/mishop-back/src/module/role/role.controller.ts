import { RoleService } from './role.service';
import { Post, Controller, Body } from '@nestjs/common';
import * as RoleDto from './entity/role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create
  @Post('create')
  async create(@Body() createRoleDto: RoleDto.CreateDto) {
    return await this.roleService.create(createRoleDto);
  }

  // removeById
  @Post('removeById')
  async removeById(@Body() body: RoleDto.RemoveByIdDto) {
    return await this.roleService.removeById(body.id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() updateRoleDto: RoleDto.UpdateByIdDto) {
    return await this.roleService.updateById(updateRoleDto);
  }

  // getById
  @Post('getById')
  async getById(@Body() body: RoleDto.GetByIdDto) {
    return await this.roleService.getById(body.id);
  }

  // getList
  @Post('getList')
  async getList() {
    return await this.roleService.getList();
  }

  // getPage
  @Post('getPage')
  async getPage(@Body() getPageReqDto: RoleDto.GetPageDto) {
    return await this.roleService.getPage(getPageReqDto);
  }
}
