import { User } from 'src/app/user/entities';
import { UserGroup } from 'src/app/usergroup/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: String,
    })
    name: string;

    @OneToMany(() => UserGroup, userGroup => userGroup.client)
    userGroups: UserGroup[];

    @OneToMany(() => User, user => user.client)
    users: User[];
}
