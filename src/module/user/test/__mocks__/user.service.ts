import { userSub } from '../subs/user.sub'

export const mcokUserService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(userSub())
})
