import { Like, Repository, MoreThanOrEqual } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './entity/dto/createRole.dto';
import { UpdateRoleDto } from './entity/dto/updateRole.dto';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import { GetPageReqDto } from './entity/dto/getPageReq.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // create
  async create(createRoleDto: CreateRoleDto) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({
      name: createRoleDto.name,
    });

    if (matchRole) {
      throw new CommonRequestException('10001', '创建角色失败，角色已存在');
    }

    // 创建角色
    return this.roleRepository.insert(createRoleDto);
  }

  // removeByName
  async removeByName(roleName: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ name: roleName });

    if (!matchRole) {
      throw new CommonRequestException('10002', '删除角色失败，角色不存在');
    }

    // 删除角色
    return this.roleRepository.remove(matchRole);
  }

  // removeById
  async removeById(roleId: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ id: roleId });

    if (!matchRole) {
      throw new CommonRequestException('10002', '删除角色失败，角色不存在');
    }

    // 删除角色
    return this.roleRepository.remove(matchRole);
  }

  // updateById
  async updateById(updateRoleDto: UpdateRoleDto) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({
      id: updateRoleDto.id,
    });

    if (!matchRole) {
      throw new CommonRequestException('10003', '更新角色失败，角色不存在');
    }

    // 更新角色
    return this.roleRepository.save(updateRoleDto);
  }

  // getById
  async getById(roleId: string) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({ id: roleId });

    if (!matchRole) {
      throw new CommonRequestException('10004', '查询角色失败，角色不存在');
    }

    // 返回结果
    return matchRole;
  }

  // getList
  async getList() {
    // 返回结果
    return this.roleRepository.find();
  }

  // getPage
  async getPage(getPageReqDto: GetPageReqDto) {
    const { pageNo, pageSize, name, status, create_time } = getPageReqDto;

    const records = await this.roleRepository.find({
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(status && { status: Like(`%${status}%`) }),
        ...(create_time && { create_time: MoreThanOrEqual(create_time) }),
      },
      order: {
        create_time: 'ASC',
      },
    });

    // 返回结果
    return {
      records: records,
      total: records.length,
      pageNo: getPageReqDto.pageNo,
      pageSize: getPageReqDto.pageSize,
    };
  }
}
