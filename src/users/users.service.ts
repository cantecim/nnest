import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User, UserEntityProperties } from './models/user.entity';
import { Repository, FindConditions } from 'typeorm';
import { plainToClass, classToPlain } from 'class-transformer';
import { entityValidateOrReject } from '@nnest/typeorm/helpers/entity-validate-or-reject';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async save(user: UserEntityProperties): Promise<User> {
    const u = plainToClass(User, user);
    // No need to validate here in thanks to BaseEntity hook,
    // This line is left because to show it in documentation
    await entityValidateOrReject(u);
    return await this.userRepository.save(u);
  }

  async register(user: UserEntityProperties): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const result: User = await this.save(user);
        // plainToClass and then classToPlain, simply we are filtering excluded fields
        resolve(plainToClass(User, classToPlain(result)));
      } catch (error) {
        // in order to not hang the request we have to handle rejection
        // remember: if you create a promise be sure to fullfil or reject it finally...
        reject(error);
      }
    });
  }

  async findOne(
    fieldValue: string,
    fieldName?: 'username' | 'email',
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      [fieldName ?? 'username']: fieldValue,
    } as FindConditions<User>);
  }
}
