import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { ToolsService } from 'src/common/service/tools.service';
import { CommonRequestException } from 'src/common/exception/common-request.exception';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // 通过构造函数向passport-local策略传递初始化选项
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly toolsService: ToolsService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // validate实现验证逻辑
  async validate(username: string, password: string) {
    const matchUser = await this.userRepository.findOne({ username });
    if (!matchUser) {
      throw new CommonRequestException('00010', '账号不存在');
    }

    // 验证密码是否匹配
    if (this.toolsService.md5Encrypt(password) !== matchUser.password) {
      throw new CommonRequestException('00011', '账号或密码错误');
    }

    return matchUser;
  }
}
