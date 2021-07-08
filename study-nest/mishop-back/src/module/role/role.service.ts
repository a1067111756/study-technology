import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { CreateRoleDto } from './dto/createRole.dto';
import { CommonRequestException } from 'src/common/exception/common-request.exception';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // 新建角色
  create(createRoleDto: CreateRoleDto) {
    // 查询角色是否存在
    const matchRole = this.roleRepository.findOne({ name: createRoleDto.name });
    if (matchRole) {
      throw new CommonRequestException('10001', '角色已存在');
    }

    // 插入新角色
    const newRole = this.roleRepository.create(createRoleDto);

    return {
      code: '00000',
      data: newRole,
    };
  }

  // 删
  // async delete() {}

  // // 改
  // async update() {}

  // // ById
  // async getById() {}

  // // 列表
  // async getList() {}

  // // 分页
  // async getList() {}
}
