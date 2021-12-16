import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAndUpdateRoleDto } from './dto/createAndUpdateRole.dto';
import { CommonRequestException } from 'src/common/exception/common-request.exception';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // create
  async create(createAndUpdateRoleDto: CreateAndUpdateRoleDto) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({
      name: createAndUpdateRoleDto.name,
    });
    if (matchRole) {
      throw new CommonRequestException('10001', '角色已存在');
    }

    // 创建新角色
    const newRole = await this.roleRepository.create(createAndUpdateRoleDto);

    // 返回结果
    return {
      code: '00000',
      data: newRole,
    };
  }

  // removeByName
  async removeByName(roleName: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ name: roleName });
    if (!matchRole) {
      throw new CommonRequestException('10002', '角色不存在');
    }

    // 删除角色
    const removeRole = await this.roleRepository.remove(matchRole);

    // 返回结果
    return {
      code: '00000',
      data: removeRole,
    };
  }

  // removeById
  async removeById(roleId: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ id: roleId });
    if (!matchRole) {
      throw new CommonRequestException('10002', '角色不存在');
    }

    // 删除角色
    const removeRole = await this.roleRepository.remove(matchRole);

    // 返回结果
    return {
      code: '00000',
      data: removeRole,
    };
  }

  // updateById
  async updateById(
    roleId: string,
    createAndUpdateRoleDto: CreateAndUpdateRoleDto,
  ) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ id: roleId });
    if (!matchRole) {
      throw new CommonRequestException('10002', '角色不存在');
    }

    // 更新角色
    const updateRole = await this.roleRepository.save(createAndUpdateRoleDto);

    // 返回结果
    return {
      code: '00000',
      data: updateRole,
    };
  }

  // getById
  async getById(roleId: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ id: roleId });
    if (!matchRole) {
      throw new CommonRequestException('10002', '角色不存在');
    }

    // 返回结果
    return {
      code: '00000',
      data: matchRole,
    };
  }

  // getList
  async getList() {
    const roleList = await this.roleRepository.find();

    // 返回结果
    return {
      code: '00000',
      data: roleList,
    };
  }

  // getPage
  async getPage(pageNo: number, pageSize: number) {
    const roleList = await this.roleRepository.find({
      skip: pageSize * (pageNo - 1),
      take: pageSize,
    });

    // 返回结果
    return {
      code: '00000',
      data: roleList,
    };
  }
}
