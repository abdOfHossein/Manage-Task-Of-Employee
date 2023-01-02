import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { RoleTypeEnum } from 'src/modules/role/modules/enum/role.enum';
import { DataSource } from 'typeorm';
import { UserEnt } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      
      const user =await this.dataSource.getRepository(UserEnt).findOne({where:{id:request.user.id_User},relations:{role:true}});

      const role = await this.dataSource.getRepository(RoleEnt).findOne({
        where: {
          id: user.role.id,
        },
      });

      if (role.role_type == RoleTypeEnum.ADMIN) {
        user.role_default_status = false;
        return true;
      }
      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
