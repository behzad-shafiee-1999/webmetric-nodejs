import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) { }
  async findOne(user_id: string) {
    let user_info: any = {
      user_id,
      firstname: `behzad_${user_id}`,
      lastname: `shafiee_${user_id}`
    }

    //اگر داده در کچ هست همان را برمیگردانم
    const result = await this.redisService.get(user_id)
    if (result)
      user_info = JSON.parse(result)
    else
      await this.redisService.set(user_id, JSON.stringify(user_info), +this.configService.get("REDIS_CACH_TTL"))

    return { user_info }
  }
}
