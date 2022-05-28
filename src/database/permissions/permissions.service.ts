import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@permissions/permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }

  getPermission(id: number): Promise<Permission> {
    return this.permissionsRepository.find({
      select: ['permission'],
      where: [{ id }],
    })[0];
  }
}
