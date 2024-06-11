import { IRole } from './role.interfaces';

export interface IAuthenticatedUser {
    id: string;
    roles: IRole[];
    idp_user_id: string;
    expires_at: number;
}
