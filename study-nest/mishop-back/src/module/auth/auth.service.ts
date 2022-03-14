import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
import { ToolsService } from 'src/common/service/tools.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly toolsService: ToolsService,
    private readonly jwtService: JwtService,
  ) {}

  /* 登陆 */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 查找账号是否存在
    const matchUser = await this.userRepository.findOne({ userName: username });
    if (!matchUser) {
      throw new CommonRequestException('00010', '账号不存在');
    }

    // 验证密码是否匹配
    if (this.toolsService.md5Encrypt(password) !== matchUser.password) {
      throw new CommonRequestException('00011', '账号或密码错误');
    }

    // 返回结果
    delete matchUser.password;
    return {
      token: this.jwtService.sign({ username, sub: matchUser.id }),
      userInfo: matchUser,
    };
  }

  /* 注册 */
  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    // 查找账号是否存在
    const matchUser = await this.userRepository.findOne({ userName: username });
    if (matchUser) {
      throw new CommonRequestException('00020', '该用户已注册');
    }

    // 检查密码强度
    if (username.length < 4 || username.length > 16) {
      throw new CommonRequestException('00021', '账号应为4~16位字符');
    }
    if (password.length < 4 || password.length > 16) {
      throw new CommonRequestException('00022', '密码应为4~16位字符');
    }

    // 添加新的账号到数据库
    await this.userRepository.insert({
      userName: username,
      password: this.toolsService.md5Encrypt(password),
    });

    // 返回结果
    return null;
  }
}
