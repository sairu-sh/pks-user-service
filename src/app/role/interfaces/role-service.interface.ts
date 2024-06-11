import { IAuthenticatedUser } from 'src/interfaces';
import { CreateRoleDto } from '../dto';
import { Role } from '../entities';

export abstract class IRoleService {
    abstract createRole(role: CreateRoleDto, authenticatedUser: IAuthenticatedUser): Promise<void>;

    abstract findById(id: string): Promise<Role>;

    abstract findByName(name: string): Promise<Role>;
}
