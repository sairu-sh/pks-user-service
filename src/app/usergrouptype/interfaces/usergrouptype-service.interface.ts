import { IAuthenticatedUser } from 'src/interfaces';
import { UserGroupType } from '../entities';

export abstract class IUserGroupTypeService {
    abstract getAllTypes(authenticatedUser: IAuthenticatedUser): Promise<UserGroupType[]>;
}
