import { GetUsers200ResponseOneOfInner } from 'auth0';
import { CreateUserDto } from '../dto';
import { User } from '../entities';
import { IAuthenticatedUser } from 'src/interfaces';

export abstract class IUserService {
    abstract createUser(newUser: CreateUserDto, authenticatedUser: IAuthenticatedUser): Promise<void>;

    abstract findByEmail(email: string): Promise<User>;

    abstract findById(id: string): Promise<User>;

    abstract createUserInAuth0(newUser: CreateUserDto, userId: string): Promise<GetUsers200ResponseOneOfInner>;

    abstract persistUser(newUser: CreateUserDto, authenticatedUserId: string): Promise<User>;

    abstract assignRole(userId: string, roleId: string): Promise<void>;

    abstract assignRoleInAuth0(idpUserId: string, idpRoleId: string): Promise<void>;
}
