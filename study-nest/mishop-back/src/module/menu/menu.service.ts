import { Connection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Menu } from './entity/menu.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import * as MenuDto from './entity/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  // create
  async create(createDto: MenuDto.CreateDto) {
    return this.menuRepository.insert(createDto);
  }

  // getTree
  async getTree() {
    await this.connection.query(
      `select * from menu start with id = "-1" connect by prior id = parentId`,
    );
  }
}
