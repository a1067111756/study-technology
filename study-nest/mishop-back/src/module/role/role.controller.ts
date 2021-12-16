import { RoleService } from './role.service';
import { Post, Controller, Body } from '@nestjs/common';
import { CreateAndUpdateRoleDto } from './dto/createAndUpdateRole.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create
  @Post('create')
  async create(@Body() createRoleDto: CreateAndUpdateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  // removeByName
  @Post('removeByName')
  async removeByName(@Body() name: string) {
    return await this.roleService.removeByName(name);
  }

  // removeById
  @Post('removeByName')
  async removeById(@Body() id: string) {
    return await this.roleService.removeById(id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() id: string, createRoleDto: CreateAndUpdateRoleDto) {
    return await this.roleService.updateById(id, createRoleDto);
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

  // getList
  @Post('getPage')
  async getPage(@Body() pageNo: number, pageSize: number) {
    return await this.roleService.getPage(pageNo, pageSize);
  }
}
