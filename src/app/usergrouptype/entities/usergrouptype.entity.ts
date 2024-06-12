import { UserGroup } from 'src/app/usergroup/entities';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGroupType {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => UserGroup, (userGroup) => userGroup.userGroupTypeId)
    groupType: string;
}
