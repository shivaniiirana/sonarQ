import { Body, Controller, Get, Post, Res, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    const user = await this.usersService.register(body);
    return res.status(201).json(user);
  }

  @Get()
  async getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    const users = await this.usersService.findAll(+page, +limit);
    return { users };
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const isValid = await this.usersService.validateUser(body.email, body.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    return res.status(200).json({ message: 'Login successful' });
  }
}
