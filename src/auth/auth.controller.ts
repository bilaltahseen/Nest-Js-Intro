import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
constructor(private readonly authService:AuthService){}

@UseGuards(LocalAuthGuard)
@Post('signup')
async signUp(@Body() createUserDto:CreateUserDto){
    return this.authService.create(createUserDto)
}

@Post('login')
  async login(@Request() req:any) {
    return this.authService.login(req.user)
  }

}
