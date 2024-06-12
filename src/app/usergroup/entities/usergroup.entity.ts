import { Client } from 'src/app/client/entities';
import { Role } from 'src/app/role/entities';
import { User } from 'src/app/user/entities';
import { UserGroupType } from 'src/app/usergrouptype/entities';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    // OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import { cli } from 'winston/lib/winston/config';

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: String,
    })
    name: string;

    @ManyToOne(() => UserGroup, (userGroup) => userGroup.children)
    @JoinColumn({
        name: 'parent_user_group_id',
        referencedColumnName: 'id',
    })
    parentUserGroup: UserGroup;

    @OneToMany(() => UserGroup, (userGroup) => userGroup.parentUserGroup)
    children: UserGroup[];

    @ManyToOne(() => Client, (client) => client.userGroups)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id',
    })
    client: Client;

    @ManyToMany(() => User, (user) => user.userGroups)
    @JoinTable({
        name: 'user_user_group',
        joinColumns: [{ name: 'user_group_id', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    })
    users: User[];

    @ManyToMany(() => Role, (role) => role.userGroups)
    @JoinTable()
    roles: Role[];

    @ManyToOne(() => UserGroupType, (userGroupType) => userGroupType.id)
    @JoinColumn()
    userGroupTypeId: UserGroupType;
}
