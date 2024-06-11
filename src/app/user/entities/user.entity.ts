import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Role } from 'src/app/role/entities';
import { UserStatus } from '../constants';
import { Client } from 'src/app/client/entities';
import { UserGroup } from 'src/app/usergroup/entities';

@Entity()
export class User extends AbstractEntity {
    // TODO: Need discussion as Jake mentioned
    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        type: String,
        default: UserStatus.ACTIVE,
    })
    status: UserStatus;

    @Column({
        nullable: true,
    })
    idp_user_id: string;

    @ManyToOne(() => Client, client => client.users)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id',
    })
    client: Client;

    @ManyToMany(() => UserGroup, userGroup => userGroup.users)
    userGroups: UserGroup[];    

}
