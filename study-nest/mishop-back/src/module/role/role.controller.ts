import { RoleService } from './role.service';
import { Post, Controller, Body } from '@nestjs/common';
import { CreateRoleDto } from './entity/dto/createRole.dto';
import { UpdateRoleDto } from './entity/dto/updateRole.dto';
import { GetPageReqDto } from './entity/dto/getPageReq.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create
  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const res = await this.roleService.create(createRoleDto);
    return res;
  }

  // removeByName
  @Post('removeByName')
  async removeByName(@Body() name: string) {
    return await this.roleService.removeByName(name);
  }

  // removeById
  @Post('removeById')
  async removeById(@Body() id: string) {
    return await this.roleService.removeById(id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.updateById(updateRoleDto);
  }

  // getById
  @Post('getById')
  async getById(@Body() id: string) {
    return await this.roleService.getById(id);
  }

  // getList
  @Post('getList')
  async getList() {
    return await this.roleService.getList();
  }

  // getPage
  @Post('getPage')
  async getPage(@Body() getPageReqDto: GetPageReqDto) {
    return await this.roleService.getPage(getPageReqDto);
  }
}
