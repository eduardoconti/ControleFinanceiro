import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entity/users.entity';
import { PasswordManagerService } from 'src/users/service/password-mannager.service';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordManager: PasswordManagerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<Users> {
    const user = await this.usersService.returnUserByLogin(login);

    if (user && (await this.passwordManager.compareHash(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: Users) {
    const payload = { login: user.login, id: user.id, perfil: user.perfil };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
