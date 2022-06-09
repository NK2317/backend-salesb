import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(_username: string, _password: string) {
    const user = await this.prismaService.user.findFirst({
      where: { userName: _username },
    });

    if (user) {
      if (await bcrypt.compare(_password, user.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        let userDat = { ...result, tokenExpires: '24h' };
        return console.log(`Token Init <-> ${Date()} <----> Token Exp Time  ${userDat.tokenExpires}`), userDat; 
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async login({ username, id, name }: any) {
    return {
      accessToken: this.jwtService.sign({ username, id, name }),
      userID: id,
      username,
    };
  }
}
