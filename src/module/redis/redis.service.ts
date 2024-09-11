import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'


@Injectable()
export class RedisService
{

  constructor (
    @Inject( 'RedisClient' ) private readonly redis: Redis
  ) { }
 
  
  async set ( key: string, value: any ,ttl:string )
  {
    return await this.redis.set( key, value)
  }

  async get ( key: string )
  {
    return await this.redis.get( key )
  }
}
