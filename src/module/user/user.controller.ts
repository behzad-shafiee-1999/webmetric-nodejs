import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('data')
  @ApiQuery({ name: "user_id", type: String, required: true })
  findAll(@Query("user_id") user_id: string) {
    return this.userService.findAll(user_id);
  }

}
