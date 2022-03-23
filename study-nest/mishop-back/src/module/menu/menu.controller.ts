import { MenuService } from './menu.service';
import { Post, Controller, Body } from '@nestjs/common';
import * as MenuDto from './entity/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // create
  @Post('create')
  async create(@Body() createDto: MenuDto.CreateDto) {
    return await this.menuService.create(createDto);
  }

  // remove
  @Post('removeById')
  async removeById(@Body() body: MenuDto.RemoveByIdDto) {
    return await this.menuService.removeById(body.id);
  }

  // updateById
  @Post('updateById')
  async updateById(@Body() updateByIdDto: MenuDto.UpdateByIdDto) {
    return await this.menuService.updateById(updateByIdDto);
  }

  // getTree
  @Post('getTree')
  async getTree(@Body() body: MenuDto.GetTreeDto) {
    return await this.menuService.getTree(body.id);
  }
}
