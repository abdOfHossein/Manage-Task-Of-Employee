import { RoleEnt } from 'src/modules/role/modules/entities/role.entity'; 
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEnt } from '../../../../../common/entities/basic.entity';
import { BackendEnt } from '../../backend/entities/backend.entity';

@Entity({ name: 'role-backend' })
export class RoleRlBackendEnt extends BasicEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => RoleEnt, (role) => role.role_backend)
  role: RoleEnt;

  @ManyToOne((type) => BackendEnt, (backend) => backend.role_backend)
  backend: BackendEnt;
}
