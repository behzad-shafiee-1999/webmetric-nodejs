import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(user_id: string) {
    return `This action returns all user`;
  }
}
