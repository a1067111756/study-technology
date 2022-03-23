import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Menu } from './entity/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import * as MenuDto from './entity/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  // create
  async create(createDto: MenuDto.CreateDto) {
    const res = await this.menuRepository.insert(createDto);
    return res.identifiers[0];
  }

  // removeById
  async removeById(id: string) {
    const matchMenu = await this.menuRepository.findOne({ id });

    if (!matchMenu) {
      throw new CommonRequestException('30002', '删除菜单失败，菜单不存在');
    }

    // 删除菜单
    return this.menuRepository.remove(matchMenu);
  }

  // updateById
  async updateById(updateByIdDto: MenuDto.UpdateByIdDto) {
    // 查询角色是否存在
    const matchMenu = await this.menuRepository.findOne({
      id: updateByIdDto.id,
    });

    if (!matchMenu) {
      throw new CommonRequestException('30003', '更新菜单失败，菜单不存在');
    }

    // 更新角色
    return this.menuRepository.save(updateByIdDto);
  }

  // getTree
  async getTree(rootId = '-1') {
    const getChildren = async (pid: string) => {
      const matchMenus = await this.menuRepository.find({ pid });
      if (matchMenus.length > 0) {
        for (const child of matchMenus) {
          child.children = await getChildren(child.id);
        }
      }
      return matchMenus;
    };

    return getChildren(rootId);
  }
}
