import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionDto } from '@permissions/dto';
import { Permission } from '@database/entities/permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<PermissionDto>,
  ) {}

  async getPermissions(): Promise<PermissionDto[]> {
    return this.permissionsRepository.find();
  }

  async getPermission(id: number): Promise<PermissionDto> {
    return (
      await this.permissionsRepository.find({
        select: ['permission'],
        where: [{ id }],
      })
    )[0];
  }
}
