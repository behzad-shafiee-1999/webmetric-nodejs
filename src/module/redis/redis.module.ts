import { Global, Module } from '@nestjs/common'
import { Redis } from 'ioredis'
import { RedisService } from './redis.service'

@Global()
@Module({})
export class RedisModule {
  static forRootAsync(host: string, port: number, password: string) {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'RedisClient',
          useFactory: () => {
            const redisInstance = new Redis({
              host,
              port,
              password
            })
            redisInstance.on('error', e => {
              console.log(`Redis connection failed: ${e}`);
            })
            redisInstance.on('connect', () => {
              console.log(`Redis connected successfully`)
            })
            return redisInstance
          }
        },
        RedisService
      ],
      exports: [RedisService]
    }
  }
}
