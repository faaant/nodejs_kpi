import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }

  async getUser(username: string): Promise<Permission> {
    return (
      await this.permissionsRepository.find({
        select: ['id', 'permission'],
        where: [{ username }],
      })
    )[0];
  }
}
