import { UserGroup } from 'src/app/usergroup/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGroupType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupType: string;

    @OneToMany(() => UserGroup, (userGroup) => userGroup.userGroupTypeId)
    userGroups: UserGroup[];
}
