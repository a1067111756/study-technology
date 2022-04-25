import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/common/service/tools.service';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import * as UserDto from './entity/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly toolsService: ToolsService,
  ) {}

  // create
  async create(createUserDto: UserDto.CreateDto) {
    // 查询用户是否存在
    const matchUser = await this.userRepository.findOne({
      userName: createUserDto.userName,
    });
    if (matchUser) {
      throw new CommonRequestException('20001', '创建用户失败，该用户已存在');
    }

    // 新建用户设置默认密码
    createUserDto.password = this.toolsService.md5Encrypt('123456');

    // 创建用户
    return this.userRepository.insert(createUserDto);
  }

  // removeById
  async removeById(userId: string) {
    // 查询用户是否存在
    const matchUser = await this.userRepository.findOne({ id: userId });
    if (!matchUser) {
      throw new CommonRequestException('20002', '删除用户失败，该用户不存在');
    }

    // 删除用户
    return await this.userRepository.remove(matchUser);
  }

  // updateById
  async updateById(updateUserDto: UserDto.UpdateByIdDto) {
    // 查询用户是否存在
    const matchUser = await this.userRepository.findOne({
      id: updateUserDto.id,
    });
    if (!matchUser) {
      throw new CommonRequestException('20003', '更新用户失败，该用户不存在');
    }

    // 更新用户
    return this.userRepository.save(updateUserDto);
  }

  // getById
  async getById(roleId: string) {
    // 查询用户是否存在
    const matchUser = await this.userRepository.findOne({ id: roleId });
    if (!matchUser) {
      throw new CommonRequestException('20004', '查询用户失败，该用户不存在');
    }

    // 返回结果
    return matchUser;
  }

  // getList
  async getList() {
    // 返回结果
    return this.userRepository.find();
  }

  // getPage
  async getPage(getPageReqDto: UserDto.GetPageDto) {
    const { pageNo, pageSize, userName, status, role } = getPageReqDto;

    const records = await this.userRepository.find({
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      where: {
        ...(role && { role: role }),
        ...(userName && { userName: Like(`%${userName}%`) }),
        ...(status !== null && status !== undefined && { status: status }),
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
