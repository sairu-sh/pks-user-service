import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleStatus } from '../interfaces';
import { UserGroup } from 'src/app/usergroup/entities';
import { Privilege } from 'src/app/privilege/entities/privilege.entity';

@Entity()
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: String,
    })
    name: string;

    @ManyToMany(() => UserGroup, userGroup => userGroup.users)
    userGroups: UserGroup[];

    @ManyToMany(() => Privilege, privilege => privilege.roles)
    @JoinTable()
    privileges: Privilege[];
}
