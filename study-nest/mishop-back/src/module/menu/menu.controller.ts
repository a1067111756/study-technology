import { MenuService } from './menu.service';
import { Post, Controller, Body } from '@nestjs/common';
import * as MenuDto from './entity/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // create
  @Post('create')
  async create(@Body() createRoleDto: MenuDto.CreateDto) {
    return await this.menuService.create(createRoleDto);
  }

  // getTree
  @Post('getTree')
  async getTree() {
    return await this.menuService.getTree();
  }
}
