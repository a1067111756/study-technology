import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRequestException } from 'src/common/exception/common-request.exception';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /* 登陆 */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 查找账号是否存在
    const matchUser = await this.userRepository.findOne({ username });
    if (!matchUser) {
      throw new CommonRequestException('00010', '账号不存在');
    }

    // 验证账号、密码是否匹配
    if (password !== matchUser.password) {
      throw new CommonRequestException('00011', '账号或密码错误');
    }

    // 返回token
    return 'token123test123';
  }

  /* 注册 */
  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    // 查找账号是否存在

    // 添加新的账号到数据库

    // 返回token
    return 'token123test123';
  }
}
