import { Like, Repository, MoreThanOrEqual } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import * as RoleDto from './entity/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // create
  async create(createRoleDto: RoleDto.CreateDto) {
    // 查询角色是否存在
    const matchRole = await this.roleRepository.findOne({
      name: createRoleDto.name,
    });

    if (matchRole) {
      throw new CommonRequestException('10001', '创建角色失败，角色已存在');
    }

    // 创建角色
    const res = await this.roleRepository.insert(createRoleDto);
    return res.identifiers[0];
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
  async updateById(updateRoleDto: RoleDto.UpdateByIdDto) {
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
  async getPage(getPageReqDto: RoleDto.GetPageDto) {
    const { pageNo, pageSize, name, status } = getPageReqDto;

    const records = await this.roleRepository.find({
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(status !== null && { status: status }),
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
