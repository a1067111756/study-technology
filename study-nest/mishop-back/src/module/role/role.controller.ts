import { Post, Controller, Body } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 增
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  // 删
  // @Post('role/delete')
  // async delete() {}

  // // 改
  // @Post('role/update')
  // async update() {}

  // // ById
  // @Post('role/getById')
  // async getById() {}

  // // 列表
  // @Get('role/getList')
  // async getList() {}

  // // 分页
  // @Post('role/getPage')
  // async getList() {}
}
