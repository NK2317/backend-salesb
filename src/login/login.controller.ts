import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginParamsType } from './types';

// Get an API Key
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async getAPIKey(@Body() { userName, password }: LoginParamsType) {
    try {
      const userData = await this.authService.validateUser(userName, password);
      if (userData) {
        const data = await this.authService.login(userData);
        return { error: false, data };
      }
    } catch (error) {
      console.error(error);
      return { error, data: '' };
    }
  }
}
